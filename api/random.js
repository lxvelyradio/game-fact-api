export default function handler(req, res) {
  // --- KOLEKSI FAKTA GAME & EASTER EGG ---
  const listTeks = [
    "Awan dan semak-semak di Super Mario Bros (NES) sebenarnya menggunakan gambar sprite yang sama, hanya beda warna.",
    "Creeper di Minecraft tercipta karena kesalahan coding (glitch) saat Notch mencoba membuat model babi, tapi badannya malah vertikal.",
    "Karakter 'Ermac' di Mortal Kombat berawal dari rumor 'Error Macro' di menu audit mesin arcade game tersebut.",
    "PlayStation 1 sebenarnya lahir karena Nintendo membatalkan kerjasama dengan Sony untuk membuat add-on CD bagi SNES.",
    "Ukuran dada Lara Croft di Tomb Raider pertama menjadi besar karena desainer tidak sengaja menaikkan nilai variabelnya sebesar 150%.",
    "Game 'Devil May Cry' awalnya adalah prototipe untuk Resident Evil 4, tapi dianggap terlalu penuh aksi.",
    "Bahasa yang diucapkan Sims (Simlish) adalah campuran bahasa Ukraina, Prancis, Latin, Finlandia, Tagalog, dan omong kosong.",
    "Pac-Man terinspirasi saat pembuatnya melihat pizza yang sudah diambil satu potong.",
    "Di Metal Gear Solid (PS1), Psycho Mantis bisa membaca Memory Card kamu dan mengomentari game Konami lain yang pernah kamu mainkan.",
    "Combo di game fighting ditemukan secara tidak sengaja di Street Fighter II sebagai bug animasi, tapi kemudian dijadikan fitur utama.",
    "Game 'Grand Theft Auto' (GTA) berawal dari game balapan bernama 'Race 'n' Chase', di mana glitch membuat polisi menjadi terlalu agresif menabrak pemain.",
    "Kaset cartridge Nintendo (NES/SNES) terasa pahit jika dijilat untuk mencegah anak-anak menelannya.",
    "Skor tertinggi yang mungkin didapat di Pac-Man adalah 3.333.360. Setelah itu game akan error (kill screen).",
    "Burung di Duck Hunt (NES) sebenarnya dikontrol oleh pemain kedua menggunakan controller biasa.",
    "Kode Konami (Up, Up, Down, Down, Left, Right, Left, Right, B, A) pertama kali muncul di game Gradius, bukan Contra.",
    "Sonic the Hedgehog awalnya punya pacar manusia bernama Madonna, tapi dihapus karena dianggap terlalu aneh untuk anak-anak.",
    "Di Assassin's Creed pertama, semua karakter utama yang kamu bunuh berdasarkan orang asli yang meninggal di tahun dan lokasi yang sama.",
    "Game 'GoldenEye 007' (N64) multiplayer dibuat oleh pengembang di bulan-bulan terakhir secara diam-diam tanpa izin atasan.",
    "Wajah Max Payne di game pertamanya adalah wajah Sam Lake, penulis cerita game tersebut, karena budget mereka minim untuk menyewa aktor.",
    "Nama asli Mario bukanlah Mario, melainkan 'Jumpman' saat pertama muncul di Donkey Kong.",
    "Di Skyrim, raksasa yang memukulmu hingga terbang ke angkasa awalnya adalah bug, tapi Bethesda membiarkannya karena lucu.",
    "Suara zombie 'Ghast' di Minecraft sebenarnya adalah suara kucing peliharaan pengembang yang sedang tidur terganggu (mendengkur).",
    "Game E.T. untuk Atari 2600 dianggap sangat buruk hingga ribuan kasetnya dikubur di gurun New Mexico (dan sudah ditemukan kembali tahun 2014).",
    "Satu game 'World of Warcraft' memiliki lebih banyak teks cerita daripada gabungan seluruh seri Lord of the Rings.",
    "Peta di The Elder Scrolls II: Daggerfall luasnya hampir dua kali lipat luas negara Inggris Raya.",
    "Spy di Team Fortress 2 awalnya adalah glitch di mana pemain terlihat seperti tim lawan.",
    "Kratos di God of War awalnya didesain dengan tato berwarna biru, tapi diubah jadi merah agar tidak mirip karakter Barbar di Diablo II.",
    "Tembakan Plasma Pistol yang di-charge di Halo: Combat Evolved tidak sengaja dibuat terlalu kuat, tapi dibiarkan karena mengubah strategi permainan.",
    "Mew di Pokemon Red/Blue dimasukkan diam-diam oleh programmer Shigeki Morimoto di sisa ruang kosong cartridge tanpa sepengetahuan Nintendo.",
    "Game 'Final Fantasy' dinamakan demikian karena Square (developer) hampir bangkrut, dan mereka mengira itu akan menjadi game terakhir mereka.",
    "Master Chief (Halo) dan Cortana pernah menjadi pengisi suara pemandu GPS Waze.",
    "Di Silent Hill 2, mayat di depan TV di apartemen sebenarnya menggunakan model wajah James Sunderland (karakter utama) itu sendiri.",
    "Fisika payudara di Dead or Alive 2 'Jiggle Physics' awalnya adalah bug komputasi, tapi tim marketing memintanya dipertahankan.",
    "Game 'Yakuza' (Ryu Ga Gotoku) awalnya ditolak oleh SEGA karena dianggap tidak akan laku di luar Jepang.",
    "PUBG berawal dari mod untuk game ARMA 2 dan ARMA 3 sebelum menjadi game sendiri.",
    "Dota (Defense of the Ancients) berawal dari custom map di Warcraft III.",
    "Counter-Strike berawal dari mod Half-Life yang dibuat oleh dua orang fan.",
    "Rockstar Games membayar orang untuk memberikan review negatif palsu pada GTA 1 agar game-nya terlihat kontroversial dan 'edgy'.",
    "Pikachu tercetak di mata uang resmi negara Niue (Selandia Baru).",
    "Di Borderlands 2, ada area tersembunyi bertema Minecraft di mana kamu bisa menghancurkan blok dan melawan Creeper.",
    "Game 'Among Us' rilis tahun 2018 tapi baru meledak populer di tahun 2020 saat pandemi.",
    "Nintendo didirikan pada tahun 1889 sebagai perusahaan kartu permainan (Hanafuda), jauh sebelum video game ada.",
    "Di Batman: Arkham Asylum, ada ruang rahasia yang berisi cetak biru untuk game sekuelnya (Arkham City), yang tidak ditemukan pemain selama bertahun-tahun.",
    "Suara 'Headshot' dan 'Double Kill' di Unreal Tournament dan Dota diisi oleh komposer musik game tersebut.",
    "Game dinosaurus di Google Chrome (saat offline) akan tamat setelah dimainkan selama 17 juta tahun (durasi T-Rex hidup di bumi).",
    "Ryu dan Ken di Street Fighter punya guru bernama Gouken, yang lahir dari salah baca teks 'Sheng Long' (artinya Dragon Punch) di instruksi game.",
    "Di Left 4 Dead, suara teriakan zombie 'Witch' sebenarnya adalah suara tangisan wanita yang diedit dan diputar terbalik.",
    "Sony PlayStation 2 (PS2) adalah konsol terlaris sepanjang masa dengan penjualan lebih dari 155 juta unit.",
    "Game 'Portal' terinspirasi dari game indie mahasiswa bernama 'Narbacular Drop'.",
    "Zilean di League of Legends dinamai berdasarkan direktur desain Tom 'Zileas' Cadwell.",
    "Lara Croft memegang Rekor Dunia Guinness sebagai karakter video game wanita paling dikenal.",
    "Gerakan tangan aneh karakter di GoldenEye 007 N64 terjadi karena animator lupa menganimasikan jarinya memegang senjata.",
    "Di GTA V, jika kamu mengikuti karakter hantu di Gunung Gordo, di internet in-game ada situs yang menjelaskan misteri pembunuhannya.",
    "Capcom membuat Resident Evil 7 kembali ke horor karena mereka merasa RE6 terlalu mirip film aksi Hollywood."
  ];
  // ----------------------------------------

  const randomTeks = listTeks[Math.floor(Math.random() * listTeks.length)];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    sukses: true,
    tipe: "Fakta Game & Easter Egg",
    fakta: randomTeks
  });
}
