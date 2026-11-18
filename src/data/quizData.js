export const quizQuestions = [
  // 1. Multiple Choice
  {
    id: 1,
    type: "multiple-choice",
    question: "Perangkat jaringan mana yang bekerja di Layer 2 (Data Link) dan meneruskan data secara spesifik hanya ke port tujuan berdasarkan MAC Address?",
    options: [
      "Switch",
      "Hub",
      "Router",
      "Repeater"
    ],
    correctAnswer: 0,
    explanation: "Switch bekerja di Layer 2 OSI. Switch memiliki tabel MAC Address (CAM Table) yang mencatat alamat fisik setiap perangkat terhubung, sehingga data hanya dialirkan ke port penerima yang sah (unicast)."
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Mengapa LAN (Local Area Network) dikategorikan sebagai konsep topologi dan bukan sebagai model perangkat fisik tunggal?",
    options: [
      "Karena LAN adalah sistem arsitektur yang menghubungkan banyak perangkat (PC, Switch, Router, Server) dalam wilayah terbatas.",
      "Karena LAN hanya berupa kabel tanpa memerlukan perangkat keras komputer.",
      "Karena LAN dibuat khusus oleh perusahaan perangkat lunak tertentu saja.",
      "Karena LAN tidak memiliki batas jarak geografis."
    ],
    correctAnswer: 0,
    explanation: "LAN adalah konsep sistem jaringan komputer yang mencakup area geografis terbatas (seperti ruangan lab, rumah, atau kantor). LAN terbentuk dari perpaduan perangkat klien, media kabel/nirkabel, konsentrator (switch), dan gateway (router)."
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Pada kabel UTP kategori Cat5e / Cat6, teknik memilin (twisted) kawat tembaga secara berpasangan bertujuan untuk...",
    options: [
      "Mereduksi interferensi elektromagnetik dan gangguan crosstalk antarjalur kawat.",
      "Membuat kabel menjadi lebih tebal dan kaku agar tahan air.",
      "Meningkatkan konsumsi daya listrik dari stopkontak.",
      "Menghemat panjang tembaga di dalam jaket kabel PVC."
    ],
    correctAnswer: 0,
    explanation: "Teknik pemilinan (twisting) pada kabel UTP memanfaatkan prinsip pembatalan medan elektromagnetik (cancellation effect), sehingga sinyal data yang merambat tidak terdistorsi oleh crosstalk dari kawat di sebelahnya maupun radiasi gelombang liar."
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Perangkat yang bertugas menghubungkan dua jaringan yang berbeda segmen IP (seperti LAN lab sekolah ke Internet) dan menentukan jalur pengiriman tercepat menggunakan tabel routing adalah...",
    options: [
      "Router",
      "Access Point",
      "Hub",
      "Modem Murni"
    ],
    correctAnswer: 0,
    explanation: "Router beroperasi di Layer 3 (Network Layer) OSI. Tugas utamanya adalah membaca header IP Address dan menentukan rute terbaik (routing path) untuk meneruskan paket data antarjaringan yang berbeda."
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "Pada konektor RJ45 standar untuk kabel Ethernet, berapa jumlah pin kontak tembaga berbalut emas yang terdapat pada kepala konektor?",
    options: [
      "8 Pin",
      "4 Pin",
      "6 Pin",
      "12 Pin"
    ],
    correctAnswer: 0,
    explanation: "Konektor RJ45 menggunakan konfigurasi modular 8P8C (8 Position, 8 Contact) yang memiliki 8 buah pin kontak tembaga untuk menancap ke 8 urutan kawat kabel UTP."
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Apa fungsi utama dari Network Interface Card (NIC) yang terpasang pada motherboard komputer?",
    options: [
      "Mengubah data internal komputer menjadi sinyal jaringan dan menyediakan identitas fisik unik (MAC Address).",
      "Menyimpan sistem operasi dan file game secara permanen.",
      "Mendinginkan prosesor saat menjalankan aplikasi berat.",
      "Menyuplai tegangan listrik utama ke seluruh komponen komputer."
    ],
    correctAnswer: 0,
    explanation: "NIC (Network Interface Card) bertindak sebagai penerjemah antara arsitektur bus internal komputer dengan saluran fisik jaringan, sekaligus memuat alamat fisik permanen yaitu MAC Address 48-bit."
  },

  // 2. True or False
  {
    id: 7,
    type: "true-false",
    question: "Hub lebih aman dan lebih cepat daripada Switch karena Hub selalu menduplikasi data ke seluruh port secara serentak.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 1, // Salah
    explanation: "Pernyataan SALAH. Hub justru jauh lebih lambat karena membagi total bandwidth ke semua port dan sering terjadi tabrakan data (collision). Hub juga tidak aman karena data dapat disadap (sniffing) oleh komputer mana pun di jaringan."
  },
  {
    id: 8,
    type: "true-false",
    question: "Modem dan Router sebenarnya memiliki fungsi yang berbeda: Modem menerjemahkan sinyal dari penyedia layanan internet (ISP), sedangkan Router mengatur lalu lintas data antarkomputer.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 0, // Benar
    explanation: "Pernyataan BENAR. Modem memodulasi & mendemodulasi sinyal komunikasi ISP (analog/optik ke digital), sedangkan Router bertugas merutekan paket data lokal dan publik melalui IP Address."
  },
  {
    id: 9,
    type: "true-false",
    question: "Sebuah Access Point murni memiliki fungsi DHCP server dan NAT secara default untuk membagi alamat IP ke komputer layaknya Router.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 1, // Salah
    explanation: "Pernyataan SALAH. Access Point murni (Stand-alone AP) bekerja di Layer 2 hanya sebagai jembatan nirkabel (wireless bridge). AP meneruskan permintaan DHCP dari klien ke Router utama yang bertindak sebagai DHCP server."
  },
  {
    id: 10,
    type: "true-false",
    question: "Server dirancang khusus dengan komponen redundan (seperti Dual Power Supply dan Hot-swap Drives) agar mampu beroperasi 24 jam sehari tanpa henti melayani permintaan data klien.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 0, // Benar
    explanation: "Pernyataan BENAR. Keandalan (High Availability) adalah ciri utama server. Komponen redundan memastikan jika satu komponen (seperti satu power supply) rusak, komponen cadangan langsung mengambil alih tanpa mematikan sistem."
  },
  {
    id: 11,
    type: "true-false",
    question: "Kabel UTP memiliki jarak transmisi efektif maksimal tanpa penguat sinyal (repeater) sepanjang 500 meter.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 1, // Salah
    explanation: "Pernyataan SALAH. Jarak transmisi maksimal kabel Ethernet UTP standar (Cat5e/Cat6) menurut spesifikasi TIA/EIA adalah 100 meter (90 meter kabel horizontal + 10 meter kabel patchcord). Lebih dari itu sinyal akan mengalami atenuasi parah."
  },

  // 3. 3D Guess / Visual Recognition
  {
    id: 12,
    type: "3d-guess",
    deviceId: "switch",
    question: "Perhatikan model 3D perangkat rackmount 19 inci dengan deretan 24 port RJ45 dan lampu LED indikator link/activity di bawah ini. Apakah nama perangkat ini?",
    options: [
      "Switch",
      "Hub 4 Port",
      "Modem Dial-Up",
      "Network Interface Card"
    ],
    correctAnswer: 0,
    explanation: "Ini adalah Switch rackmount 24-port. Ciri fisiknya memiliki deretan port RJ45 yang padat dengan LED aktivitas di atas masing-masing port dan lubang braket rack-ear untuk dipasang di lemari server."
  },
  {
    id: 13,
    type: "3d-guess",
    deviceId: "access_point",
    question: "Perhatikan model 3D perangkat berbentuk piringan kubah (saucer) berwarna putih dengan cincin LED dan port PoE di bawah ini. Apakah nama perangkat ini?",
    options: [
      "Access Point (AP)",
      "Switch Unmanaged",
      "Kabel UTP",
      "Server Database"
    ],
    correctAnswer: 0,
    explanation: "Ini adalah Access Point (AP) plafon. Desainnya ramping aerodinamis untuk dipasang di langit-langit gedung, memancarkan sinyal Wi-Fi omni-directional 360 derajat, dan ditenagai melalui PoE (Power over Ethernet)."
  },
  {
    id: 14,
    type: "3d-guess",
    deviceId: "nic",
    question: "Perhatikan model 3D papan sirkuit hijau (PCB) dengan deretan pin konektor bus PCIe emas, chip kontroler, dan bracket port RJ45 di bawah ini. Apakah nama perangkat ini?",
    options: [
      "Network Interface Card (NIC)",
      "Konektor RJ45",
      "Modem Router Combo",
      "Rack Server 2U"
    ],
    correctAnswer: 0,
    explanation: "Ini adalah Network Interface Card (NIC / LAN Card) tipe PCIe. Pin emas di bagian bawah ditancapkan ke slot motherboard PC desktop untuk memberikan konektivitas jaringan."
  },
  {
    id: 15,
    type: "3d-guess",
    deviceId: "rj45",
    question: "Perhatikan model 3D kepala konektor bening dengan 8 bilah pin kontak tembaga dan kait klip pengunci lentur di bawah ini. Apakah nama komponen ini?",
    options: [
      "Konektor RJ45",
      "Konektor RJ11 Telepon",
      "SFP Optical Module",
      "USB Type-C Adapter"
    ],
    correctAnswer: 0,
    explanation: "Ini adalah Konektor RJ45 (Registered Jack 45). Bodi transparan memudahkan teknisi melihat susunan 8 warna kabel UTP, dan klip penguncinya memastikan konektor menancap erat pada port Ethernet."
  },
  {
    id: 16,
    type: "3d-guess",
    deviceId: "router",
    question: "Perhatikan model 3D perangkat jaringan dengan 4 antena multi-band, port WAN warna biru, dan port-port LAN warna kuning di bawah ini. Apakah nama perangkat ini?",
    options: [
      "Router",
      "Hub Tradisional",
      "Kabel UTP Roll",
      "NIC Card"
    ],
    correctAnswer: 0,
    explanation: "Ini adalah Router nirkabel modern. Port biru WAN khusus menerima input dari modem internet luar, dan antena multi-band mengarahkan jangkauan Wi-Fi ke berbagai sudut ruangan."
  },

  // 4. Match / Pair Type
  {
    id: 17,
    type: "matching",
    question: "Cocokkan pasangan perangkat jaringan berikut dengan peran utamanya yang paling tepat!",
    pairs: [
      { item: "Modem", match: "Mengubah sinyal analog/optik ISP menjadi digital" },
      { item: "Router", match: "Menentukan jalur rute paket data dengan IP Address" },
      { item: "Switch", match: "Meneruskan data lokal berdasarkan MAC Address" },
      { item: "Server", match: "Melayani request komputasi & data klien 24/7" }
    ],
    explanation: "Modem berfokus pada konversi sinyal fisik ISP. Router merutekan data antarjaringan berbasis IP. Switch mendistribusikan frame data lokal berbasis MAC. Server memproses dan melayani kebutuhan aplikasi/database klien."
  },
  {
    id: 18,
    type: "multiple-choice",
    question: "Dalam pembelajaran pemrograman web dan gim (PPLG), seorang siswa menguji REST API di alamat 'http://192.168.1.50:3000' dari laptop temannya di lab komputer. Jaringan apa yang memfasilitasi komunikasi tersebut?",
    options: [
      "LAN (Local Area Network)",
      "WAN (Wide Area Network)",
      "MAN (Metropolitan Area Network)",
      "SAN (Storage Area Network)"
    ],
    correctAnswer: 0,
    explanation: "Komunikasi menggunakan alamat IP privat (192.168.x.x) antarkomputer dalam satu laboratorium tanpa keluar ke internet difasilitasi oleh Local Area Network (LAN)."
  },
  {
    id: 19,
    type: "multiple-choice",
    question: "Lampu indikator apa yang secara khusus terdapat pada Hub generasi lama yang menandakan adanya tabrakan paket data?",
    options: [
      "Collision LED",
      "Fiber Laser LED",
      "Bluetooth Pairing LED",
      "Turbo Boost LED"
    ],
    correctAnswer: 0,
    explanation: "Lampu Collision LED pada Hub akan menyala berkedip ketika dua atau lebih perangkat mencoba mengirim sinyal listrik di saat yang bersamaan pada satu collision domain bersama."
  },
  {
    id: 20,
    type: "true-false",
    question: "Fitur PoE (Power over Ethernet) memungkinkan perangkat seperti Access Point dan Kamera CCTV IP menyala tanpa kabel colokan listrik terpisah, melainkan langsung mendapat suplai daya dari kabel UTP yang terhubung ke Switch PoE.",
    options: [
      "Benar",
      "Salah"
    ],
    correctAnswer: 0, // Benar
    explanation: "Pernyataan BENAR. Teknologi PoE (IEEE 802.3af/at/bt) melewatkan arus listrik voltase rendah bersamaan dengan data melalui kawat tembaga kabel UTP, sehingga perangkat di plafon tidak memerlukan stopkontak listrik tambahan."
  }
];
