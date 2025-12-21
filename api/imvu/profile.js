import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  try {
    const profileUrl = `https://www.imvu.com/next/profile/${username}/`;

    const response = await axios.get(profileUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Avatar (OpenGraph fallback paling aman)
    const avatar =
      $('meta[property="og:image"]').attr("content") || null;

    // Username (OG title atau heading)
    const displayName =
      $('meta[property="og:title"]').attr("content") ||
      username;

    // Gender & Country (kalau ada)
    let gender = null;
    let country = null;

    $("li").each((_, el) => {
      const text = $(el).text().toLowerCase();
      if (text.includes("gender")) {
        gender = $(el).find("span").last().text().trim();
      }
      if (text.includes("country")) {
        country = $(el).find("span").last().text().trim();
      }
    });

    res.status(200).json({
      username: displayName,
      avatar,
      gender,
      country,
      profileUrl
    });
  } catch (err) {
    res.status(500).json({
      error: "IMVU profile fetch failed",
      message: err.message
    });
  }
}
