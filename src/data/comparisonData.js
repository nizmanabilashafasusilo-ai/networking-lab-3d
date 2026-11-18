export const comparisonData = [
  {
    id: "modem-vs-router",
    title: "Modem vs Router",
    subtitle: "Mengubah Sinyal Internet vs Mendistribusikan Lalu Lintas Data",
    summary: "Banyak orang mengira modem dan router adalah perangkat yang sama karena sering digabungkan menjadi satu perangkat (ONT Combo) oleh penyedia ISP. Namun, secara fungsi jaringan, keduanya memiliki peran yang sangat berbeda dan saling melengkapi.",
    deviceA: {
      id: "modem",
      name: "Modem",
      role: "Penerjemah Sinyal ISP",
      layer: "Layer 1 & Layer 2",
      icon: "Radio"
    },
    deviceB: {
      id: "router",
      name: "Router",
      role: "Pengarah Lalu Lintas Jaringan",
      layer: "Layer 3 (Network Layer)",
      icon: "Share2"
    },
    metrics: [
      {
        criterion: "Tujuan Utama",
        devA: "Mengubah sinyal analog/optik ISP menjadi sinyal biner digital komputer (dan sebaliknya).",
        devB: "Mengarahkan paket data ke tujuan yang tepat dan membagi koneksi ke banyak perangkat.",
        badge: "Fungsi Dasar"
      },
      {
        criterion: "Input & Output Sinyal",
        devA: "Input: Kabel Fiber Optik (PON), Coaxial, atau Saluran Telepon. Output: 1 Port Ethernet.",
        devB: "Input: Port WAN (dari Modem). Output: Beberapa port LAN (RJ45) dan pemancar Wi-Fi.",
        badge: "Konektivitas Fisik"
      },
      {
        criterion: "Alamat yang Digunakan",
        devA: "Bekerja pada tingkat modulasi sinyal fisik & frekuensi, tidak mengelola tabel IP klien.",
        devB: "Bekerja berdasarkan IP Address (Internet Protocol) untuk perutean data.",
        badge: "Pengalamatan"
      },
      {
        criterion: "Jumlah Klien Terhubung",
        devA: "Umumnya hanya menyediakan satu sambungan publik ke 1 perangkat (Router atau 1 PC).",
        devB: "Dapat menghubungkan puluhan hingga ratusan perangkat sekaligus secara bersamaan (LAN/WLAN).",
        badge: "Kapasitas Klien"
      },
      {
        criterion: "Fitur Tambahan (Keamanan)",
        devA: "Sangat minim / tidak ada manajemen lalu lintas data lokal.",
        devB: "DHCP Server, NAT, Firewall, Port Forwarding, Bandwidth Limiter (QoS), VPN.",
        badge: "Fitur & Keamanan"
      }
    ],
    analogy: "Ibaratkan Modem sebagai Kantor Pos Pusat yang menerima kiriman paket dari luar pulau (Internet) dan membukanya, sedangkan Router adalah Kurir Ekspedisi yang membaca alamat setiap rumah (IP Address) di kompleks Anda untuk mengantarkan paket ke kamar yang tepat.",
    takeaway: "Jika hanya ada Modem tanpa Router, hanya satu komputer yang bisa terhubung ke internet secara kabel. Jika hanya ada Router tanpa Modem, Anda bisa membuat jaringan lokal antarkomputer, tetapi tidak bisa berselancar ke internet."
  },
  {
    id: "hub-vs-switch",
    title: "Hub vs Switch",
    subtitle: "Penyebar Buta (Broadcast) vs Pengirim Cerdas (Unicast)",
    summary: "Pertarungan klasik evolusi jaringan lokal. Hub adalah teknologi usang yang menyebarkan data ke semua komputer, sedangkan Switch adalah standar modern yang mengirimkan data hanya ke komputer tujuan.",
    deviceA: {
      id: "hub",
      name: "Hub",
      role: "Multiport Repeater (Legacy)",
      layer: "Layer 1 (Physical Layer)",
      icon: "Layers"
    },
    deviceB: {
      id: "switch",
      name: "Switch",
      role: "Multiport Bridge Cerdas",
      layer: "Layer 2 (Data Link Layer)",
      icon: "Server"
    },
    metrics: [
      {
        criterion: "Metode Pengiriman Data",
        devA: "Broadcast (Membabi buta menyalin dan mengirim data ke seluruh port tanpa kecuali).",
        devB: "Unicast (Mengirim data secara spesifik hanya ke port tujuan berdasarkan MAC Address).",
        badge: "Logika Transmisi"
      },
      {
        criterion: "Kecerdasan Perangkat",
        devA: "Perangkat pasif tanpa memori internal atau kemampuan membaca alamat jaringan.",
        devB: "Memiliki prosesor dan tabel CAM (Content Addressable Memory) pencatat MAC Address.",
        badge: "Kecerdasan Silikon"
      },
      {
        criterion: "Collision Domain (Tabrakan)",
        devA: "Satu Collision Domain untuk seluruh perangkat. Jika 2 PC kirim data bersamaan, terjadi tabrakan (Collision).",
        devB: "Tiap port memiliki Collision Domain terpisah, sehingga tidak akan terjadi benturan data antarport.",
        badge: "Manajemen Tabrakan"
      },
      {
        criterion: "Mode Transmisi",
        devA: "Half-Duplex (Hanya bisa mengirim ATAU menerima secara bergantian).",
        devB: "Full-Duplex (Dapat mengirim DAN menerima data secara simultan bersamaan).",
        badge: "Mode Transmisi"
      },
      {
        criterion: "Efisiensi Bandwidth",
        devA: "Total bandwidth (misal 100 Mbps) dibagi rata ke seluruh port yang aktif.",
        devB: "Tiap port mendapatkan kapasitas bandwidth penuh (Dedicated Bandwidth, misal 1 Gbps tiap port).",
        badge: "Throughput"
      },
      {
        criterion: "Keamanan Data",
        devA: "Rentan penyadapan (Sniffing) karena semua PC dapat melihat data PC lain.",
        devB: "Aman dari sniffing biasa karena data hanya lewat pada kabel PC pengirim dan penerima.",
        badge: "Keamanan"
      }
    ],
    analogy: "Hub seperti seorang guru yang berteriak menggunakan pengeras suara (Megafon) di lapangan upacara sehingga semua orang terpaksa mendengar, sedangkan Switch seperti guru yang berbisik langsung secara privat ke telinga satu siswa yang bersangkutan.",
    takeaway: "Hub sudah sepenuhnya ditinggalkan di era jaringan modern karena lambat, boros bandwidth, dan tidak aman. Seluruh jaringan sekolah dan kantor saat ini wajib menggunakan Switch."
  },
  {
    id: "router-vs-switch",
    title: "Router vs Switch",
    subtitle: "Penghubung Antar-Jaringan Berbeda vs Penghubung Perangkat di Jaringan Sama",
    summary: "Dua pilar utama jaringan korporat dan laboratorium komputer. Switch menciptakan jaringan lokal (LAN), sementara Router menghubungkan jaringan-jaringan lokal tersebut menjadi internetwork yang lebih luas.",
    deviceA: {
      id: "router",
      name: "Router",
      role: "Penghubung Antar-Network Berbeda",
      layer: "Layer 3 (Network Layer)",
      icon: "Share2"
    },
    deviceB: {
      id: "switch",
      name: "Switch",
      role: "Penghubung Perangkat dalam Satu LAN",
      layer: "Layer 2 (Data Link Layer)",
      icon: "Cpu"
    },
    metrics: [
      {
        criterion: "Tingkat Operasi (OSI Layer)",
        devA: "Bekerja di Layer 3 (Network Layer) menggunakan paket data dan IP Address.",
        devB: "Bekerja di Layer 2 (Data Link Layer) menggunakan frame data dan MAC Address.",
        badge: "Lapisan OSI"
      },
      {
        criterion: "Tabel Referensi",
        devA: "Routing Table (Daftar rute network tujuan, gateway, subnet mask, dan metric rute).",
        devB: "MAC Address Table / CAM Table (Pemetaan nomor port fisik ke MAC Address perangkat).",
        badge: "Basis Data Internal"
      },
      {
        criterion: "Broadcast Domain",
        devA: "Memecah Broadcast Domain. Pesan broadcast dari LAN satu tidak diteruskan ke LAN lain.",
        devB: "Meneruskan pesan broadcast ke seluruh port dalam VLAN yang sama.",
        badge: "Broadcast Control"
      },
      {
        criterion: "Jumlah Port Standar",
        devA: "Sedikit port (biasanya 2 hingga 8 port berkecepatan tinggi).",
        devB: "Banyak port (biasanya 8, 16, 24, hingga 48 port untuk distribusi masal).",
        badge: "Kepadatan Port"
      },
      {
        criterion: "Kecepatan Pengalihan (Switching)",
        devA: "Sedikit lebih lambat karena harus memeriksa header paket IP, routing logic, dan firewall.",
        devB: "Sangat cepat (Wire-Speed) karena dikerjakan langsung oleh chip hardware ASIC khusus.",
        badge: "Latensi Transmisi"
      }
    ],
    analogy: "Switch seperti sistem koridor dan pintu di dalam satu gedung sekolah yang menghubungkan ruang kelas 1, 2, dan 3. Router seperti gerbang pos satpam luar sekolah yang menghubungkan seluruh kompleks sekolah dengan jalan tol kota.",
    takeaway: "Di Lab Komputer SMK, Anda membutuhkan Switch untuk mencolokkan seluruh 36 PC siswa, dan membutuhkan 1 Router untuk menghubungkan Switch tersebut ke internet dan membagikan alamat IP."
  },
  {
    id: "access-point-vs-router",
    title: "Access Point vs Router",
    subtitle: "Pintu Masuk Nirkabel (Wi-Fi) vs Manajer Lalu Lintas & Gateway",
    summary: "Sering membuat bingung siswa karena di rumah biasanya terdapat 'Wireless Router' yang menggabungkan keduanya. Pada jaringan skala sekolah atau bisnis, Access Point selalu dipisahkan dari Router pusat.",
    deviceA: {
      id: "access_point",
      name: "Access Point (AP)",
      role: "Pemancar Jaringan Nirkabel (Wi-Fi)",
      layer: "Layer 2 & Layer 1 (RF)",
      icon: "Wifi"
    },
    deviceB: {
      id: "router",
      name: "Router",
      role: "Pengelola IP, Routing, & Gateway",
      layer: "Layer 3 (Network Layer)",
      icon: "Share2"
    },
    metrics: [
      {
        criterion: "Fungsi Primer",
        devA: "Menyediakan koneksi nirkabel (Wi-Fi) bagi perangkat mobile untuk masuk ke jaringan kabel.",
        devB: "Membagi IP, mengatur rute, menghubungkan subnet berbeda, dan mengelola NAT/Firewall.",
        badge: "Tugas Utama"
      },
      {
        criterion: "Pemberian IP (DHCP Server)",
        devA: "Tidak membagikan IP (hanya meneruskan permohonan DHCP dari klien ke router utama).",
        devB: "Berfungsi sebagai server DHCP utama yang membagikan rentang IP secara otomatis.",
        badge: "Alokasi IP"
      },
      {
        criterion: "Koneksi ke Internet",
        devA: "Tidak dapat terhubung langsung ke internet secara mandiri; harus terhubung ke Router/Switch.",
        devB: "Dapat terhubung langsung ke modem/ISP via port WAN untuk membuka gerbang internet.",
        badge: "Akses Internet"
      },
      {
        criterion: "Skalabilitas di Gedung Bertingkat",
        devA: "Sangat mudah diperbanyak. Bisa pasang 20 Access Point di tiap lantai dengan 1 router pusat yang sama.",
        devB: "Cukup 1 atau 2 unit router berkemampuan tinggi untuk melayani seluruh gedung.",
        badge: "Pemasangan Masal"
      },
      {
        criterion: "Fitur Roaming",
        devA: "Mendukung Fast Roaming (802.11r/k/v) saat pengguna berjalan berpindah ruangan tanpa DC.",
        devB: "Tidak berfokus pada transisi sinyal radio klien.",
        badge: "Mobilitas Klien"
      }
    ],
    analogy: "Access Point seperti Mikrofon Nirkabel yang menangkap suara dari udara lalu menyalurkannya lewat kabel ke sistem sound mixer. Router seperti Sistem Sound Mixer & Pengatur Volume yang menentukan alur suara mana yang keluar ke speaker mana.",
    takeaway: "Router Wi-Fi rumahan adalah gabungan Router + Switch mini + Access Point dalam 1 kotak. Namun di gedung sekolah bertingkat, digunakan 1 Router utama di ruang server dan belasan Access Point yang dipasang di setiap plafon kelas."
  }
];
