import axios from "axios";

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({
      error: "username query is required"
    });
  }

  try {
    // 1. Cari user ID
    const userRes = await axios.post(
      "https://users.roblox.com/v1/usernames/users",
      {
        usernames: [username],
        excludeBannedUsers: true
      }
    );

    const user = userRes.data.data[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;

    // 2. Ambil avatar
    const avatarRes = await axios.get(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`
    );

    // 3. Ambil social stats
    const friends = await axios.get(
      `https://friends.roblox.com/v1/users/${userId}/friends/count`
    );
    const followers = await axios.get(
      `https://friends.roblox.com/v1/users/${userId}/followers/count`
    );
    const following = await axios.get(
      `https://friends.roblox.com/v1/users/${userId}/followings/count`
    );

    res.status(200).json({
      username,
      userId,
      avatar: avatarRes.data.data[0].imageUrl,
      friends: friends.data.count,
      followers: followers.data.count,
      following: following.data.count
    });

  } catch (err) {
    res.status(500).json({
      error: "Roblox API error",
      detail: err.message
    });
  }
}
