import axios from "axios";

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  try {
    const profileUrl = `https://www.imvu.com/next/profile/${username}/`;

    const { data: html } = await axios.get(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const ogImage = html.match(
      /property="og:image" content="([^"]+)"/
    );
    const ogTitle = html.match(
      /property="og:title" content="([^"]+)"/
    );

    res.status(200).json({
      username: ogTitle ? ogTitle[1] : username,
      avatar: ogImage ? ogImage[1] : null,
      profileUrl
    });
  } catch (err) {
    res.status(500).json({
      error: "IMVU profile fetch failed"
    });
  }
}
