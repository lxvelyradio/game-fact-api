import axios from "axios";

const OWNER = "WheresTheFunYoshida";

const ALL_FRIENDS = [
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
];

const FRIEND_LIMIT = 8;
const FRIENDS = ALL_FRIENDS.slice(0, FRIEND_LIMIT);

async function fetchProfile(username) {
  const res = await axios.get(
    `https://game-fact-api.vercel.app/api/roblox/profile?username=${username}`
  );
  return res.data;
}

export default async function handler(req, res) {
  try {
    const owner = await fetchProfile(OWNER);
    const friends = await Promise.all(
      FRIENDS.map(fetchProfile)
    );

    res.status(200).json({ owner, friends });
  } catch (err) {
    res.status(500).json({ error: "Roblox roster fetch failed" });
  }
}
