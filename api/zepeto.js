export default async function handler(req, res) {
  // --- GANTI KODE INI ---
  const zepetoCode = "Y8DTVN"; // Contoh: "D7K8L1"
  // ----------------------

  try {
    // 1. Tembak ke Website Profil Zepeto
    const url = `https://web.zepeto.me/share/user/profile/${zepetoCode}`;
    
    const response = await fetch(url, {
      headers: {
        // Kita harus pura-pura jadi Browser biar gak diblokir
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error("Gagal akses profil Zepeto");
    }

    const html = await response.text();

    // 2. Cari data tersembunyi (Zepeto pakai Next.js, datanya ada di script JSON)
    // Kita cari teks di antara tag <script id="__NEXT_DATA__" ...>
    const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/;
    const match = html.match(regex);

    if (!match || !match[1]) {
      throw new Error("Data profil tidak ditemukan di HTML");
    }

    // 3. Parsing JSON yang ditemukan
    const rawData = JSON.parse(match[1]);
    
    // Navigasi masuk ke dalam struktur data Zepeto (ini hasil bongkar struktur web mereka)
    // Jalurnya biasanya: props -> pageProps -> profile
    const profileData = rawData.props.pageProps.profile;
    const stats = rawData.props.pageProps.profile.userProfile;

    // 4. Siapkan data yang mau ditampilkan
    const hasil = {
      nama: profileData.name,
      zepetoId: profileData.code,
      followers: stats.followerCount,
      following: stats.followingCount,
      // URL Foto Avatar (biasanya panjang banget)
      avatar: profileData.profilePic
    };

    // 5. Kirim ke Glance
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache 1 jam biar gak sering-sering request
    res.status(200).json(hasil);

  } catch (error) {
    res.status(500).json({
      error: error.message,
      tips: "Coba cek apakah Kode Zepeto benar atau Zepeto lagi update webnya."
    });
  }
}
