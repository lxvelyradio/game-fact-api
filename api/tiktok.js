export default async function handler(req, res) {
  // Ganti username TikTok (tanpa @)
  const username = "lovelyradio"; 

  try {
    // Kita pakai API publik dari TikWM
    const response = await fetch(`https://www.tikwm.com/api/user/info?unique_id=${username}`);
    const json = await response.json();
    const user = json.data.user;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      nama: user.uniqueid,
      nick: user.nickname,
      followers: user.followerCount,
      likes: user.heartCount,
      avatar: user.avatarThumb // Link foto profil
    });

  } catch (error) {
    res.status(500).json({ error: "Gagal ambil data TikTok" });
  }
}
