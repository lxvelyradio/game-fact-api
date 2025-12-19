export default async function handler(req, res) {
  // --- MASUKKAN KODE ZEPETO (HARUS HURUF BESAR) ---
  const zepetoCode = "Y8DTVN"; 
  // -----------------------------------------------

  try {
    // 1. Gunakan URL Share Profile yang standar
    const url = `https://web.zepeto.me/share/user/profile/${zepetoCode}`;

    // 2. Request dengan Header menyamar sebagai Android
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
      }
    });

    if (!response.ok) {
      throw new Error(`Gagal akses: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();

    // 3. Regex yang LEBIH KUAT (Menangani atribut tambahan di tag script)
    // Mencari tag script __NEXT_DATA__ meskipun ada tulisan lain di dalamnya
    const regex = /<script id="__NEXT_DATA__" type="application\/json"[^>]*>(.*?)<\/script>/;
    const match = html.match(regex);

    // --- DEBUGGING BLOCK ---
    // Kalau data tidak ketemu, kita cek judul halamannya apa
    if (!match || !match[1]) {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const pageTitle = titleMatch ? titleMatch[1] : "Tidak ada judul";
      
      throw new Error(`Script data tidak ditemukan. Judul Halaman: "${pageTitle}". Kemungkinan diblokir Cloudflare atau ID salah.`);
    }
    // -----------------------

    // 4. Parsing JSON
    const rawData = JSON.parse(match[1]);
    
    // 5. Navigasi Data (Struktur ini harus sesuai dengan web Zepeto saat ini)
    // Biasanya ada di props -> pageProps -> profile -> userProfile
    const profileData = rawData?.props?.pageProps?.profile;
    const userProfile = profileData?.userProfile;

    if (!userProfile) {
        throw new Error("Struktur JSON Zepeto berubah, data userProfile kosong.");
    }

    const hasil = {
      nama: profileData.name || "User",
      zepetoId: profileData.code,
      followers: userProfile.followerCount || 0,
      following: userProfile.followingCount || 0,
      avatar: profileData.profilePic || ""
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); 
    res.status(200).json(hasil);

  } catch (error) {
    res.status(500).json({
      error: "Gagal mengambil data",
      detail: error.message,
      tips: "Pastikan ID Zepeto benar (Case Sensitive/Huruf Besar) dan Vercel tidak sedang diblokir sementara."
    });
  }
}
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
