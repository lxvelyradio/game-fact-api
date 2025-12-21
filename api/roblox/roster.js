import axios from "axios";

const OWNER = "WheresTheFunYoshida";

const FRIENDS = [
  "username026010",
  "LocaBelle",
  "Yorbaeinsummer",
  "Monellz",
  "anaphalis00",
  "calmdwn232",
  "ailerawrr",
  "iitsera",
  "Seobae6",
  "RichSlzr1",
  "belbelle17",
  "HXODST",
  "chomfrr",
  "RaphaelllllX",
].slice(0, 8);

async function fetchProfile(username) {
  try {
    const res = await axios.get(
      `https://game-fact-api.vercel.app/api/roblox/profile?username=${username}`,
      { timeout: 8000 }
    );
    return res.data;
  } catch (err) {
    console.warn(`Failed to fetch ${username}`);
    return null; // 👈 penting
  }
}

export default async function handler(req, res) {
  try {
    const owner = await fetchProfile(OWNER);

    const friendsRaw = await Promise.all(
      FRIENDS.map(fetchProfile)
    );

    const friends = friendsRaw.filter(Boolean); // buang yg gagal

    res.status(200).json({ owner, friends });
  } catch (err) {
    res.status(500).json({
      error: "Roblox roster fetch failed",
      detail: err.message,
    });
  }
}
