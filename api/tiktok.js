export default async function handler(req, res) {
  // Ganti username TikTok kamu di sini (tanpa @)
  const username = "lovelyradio"; 

  try {
    const response = await fetch(`https://www.tikwm.com/api/user/info?unique_id=${username}`);
    const json = await response.json();

    // Cek apakah data ditemukan
    if (!json.data) {
        throw new Error("User tidak ditemukan");
    }

    const user = json.data.user;
    const stats = json.data.stats;

    res.setHeader('Access-Control-Allow-Origin', '*');
    // Cache 1 jam
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    res.status(200).json({
      username: user.uniqueId,    // "lovelyradio"
      nickname: user.nickname,    // "Yoshida"
      bio: user.signature,        // "Segala game urg mainin."
      followers: stats.followerCount, // 3337
      following: stats.followingCount, // 457
      likes: stats.heartCount,    // 57571
      videos: stats.videoCount,   // 3
      avatar: user.avatarLarger   // Foto kualitas tinggi
    });

  } catch (error) {
    res.status(500).json({ error: "Gagal ambil data TikTok" });
  }
}
