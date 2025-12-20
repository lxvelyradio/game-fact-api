export default function handler(req, res) {
  // Waktu sekarang (UTC)
  const now = new Date();
  
  // Waktu Reset Sky (00:00 PST = 07:00/08:00 UTC)
  // Geyser & Grandma muncul setiap 2 jam DARI waktu reset.
  // Pola Menit:
  // - Geyser: Menit 05 (Durasi 10 menit)
  // - Grandma: Menit 35 (Durasi 10 menit)
  // - Turtle: Menit 50 (Durasi 10 menit)
  
  // Kita ambil menit saat ini dan jam saat ini (dalam satuan 2 jam-an)
  const minutes = now.getUTCMinutes();
  const hours = now.getUTCHours();
  
  // Cek apakah jam sekarang Ganjil atau Genap (Relative to UTC)
  // Sky Reset biasanya jam 00:00 PST.
  // Geyser itu di jam-jam "Genap" dari Reset.
  // Anggaplah siklus 2 jam.
  
  const isEvenHour = hours % 2 === 0; 
  
  // Kita bikin daftar event dalam siklus 2 jam (120 menit)
  // Format: [Nama Event, Menit Mulai, Menit Selesai, Lokasi]
  // Kita konversi semuanya ke menit absolut dari awal jam Genap (0 - 119)
  
  const events = [
    { name: "Geyser", start: 5, end: 15, loc: "Sanctuary" },      // 00:05
    { name: "Grandma", start: 35, end: 45, loc: "Forest" },       // 00:35
    { name: "Turtle", start: 50, end: 60, loc: "Sanctuary" },     // 00:50
    // Shard Merah/Hitam jadwalnya acak/harian, susah diprediksi script simpel
  ];

  // Hitung posisi kita sekarang di siklus 120 menit
  // Kalau jam genap: menit tetap (misal 00:10 -> 10)
  // Kalau jam ganjil: menit + 60 (misal 01:10 -> 70)
  const currentCycleMinute = (isEvenHour ? 0 : 60) + minutes;

  let status = "Chilling...";
  let nextEvent = "";
  let timeToNext = 0;

  // Cek Event Terdekat
  // 1. Cek apakah ada event yang SEDANG BERJALAN
  const activeEvent = events.find(e => currentCycleMinute >= e.start && currentCycleMinute < e.end);

  if (activeEvent) {
    status = `ACTIVE: ${activeEvent.name}`;
    timeToNext = activeEvent.end - currentCycleMinute; // Sisa waktu event
    nextEvent = `Ends in ${timeToNext}m`;
  } else {
    // 2. Kalau gak ada, cari event BERIKUTNYA di siklus ini
    const upcoming = events.find(e => e.start > currentCycleMinute);
    
    if (upcoming) {
      status = `Next: ${upcoming.name}`;
      timeToNext = upcoming.start - currentCycleMinute;
      nextEvent = `in ${timeToNext} min`;
    } else {
      // 3. Kalau udah lewat semua di siklus ini (misal menit 115), berarti balik ke Geyser (menit 5 siklus depan)
      // Siklus depan = 120 + 5 = 125
      status = "Next: Geyser";
      timeToNext = 125 - currentCycleMinute;
      nextEvent = `in ${timeToNext} min`;
    }
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate'); // Cache 1 menit aja biar akurat
  
  res.status(200).json({
    status: status,
    timer: nextEvent,
    location: activeEvent ? activeEvent.loc : "-"
  });
}
