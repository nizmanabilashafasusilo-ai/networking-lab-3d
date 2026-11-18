export const devicesData = [
  {
    id: "lan",
    name: "LAN (Local Area Network)",
    alias: "Jaringan Komputer Area Lokal",
    category: "Konsep & Topologi",
    isConcept: true,
    layerOSI: "Layer 1 - Layer 7 (Konsep Arsitektur)",
    shortDesc: "Jaringan komputer yang menghubungkan beberapa perangkat dalam cakupan area geografis terbatas seperti laboratorium komputer, sekolah, atau kantor.",
    overview: "LAN (Local Area Network) bukanlah perangkat fisik tunggal, melainkan sebuah sistem arsitektur jaringan komputer yang menghubungkan dua atau lebih perangkat (seperti komputer workstation, laptop, printer, server, switch, dan router) dalam area geografis yang terbatas. Di SMK jurusan PPLG, pemahaman LAN sangat penting karena seluruh proses kolaborasi kode (Git lokal), pengujian server web lokal (localhost / intranet), hingga pertukaran file proyek gim berjalan di atas infrastruktur LAN.",
    functions: [
      "Menghubungkan komputer dan perangkat periferal dalam area terbatas (lab/sekolah/kantor).",
      "Memungkinkan penggunaan sumber daya bersama (Resource Sharing) seperti printer jaringan dan penyimpanan bersama (NAS).",
      "Memfasilitasi komunikasi dan transfer data berkecepatan tinggi antarkomputer lokal tanpa membebani kuota internet.",
      "Menyediakan lingkungan pengujian (staging) aplikasi dan server lokal untuk pengembangan software & game."
    ],
    howItWorks: "Pada jaringan LAN, perangkat dihubungkan melalui media transmisi (kabel UTP atau Wi-Fi/WLAN). Komputer mengirimkan data dalam bentuk bingkai (frame) atau paket data. Switch lokal membaca alamat fisik (MAC Address) untuk meneruskan data langsung ke komputer tujuan dalam satu segmen jaringan. Jika data ditujukan ke luar jaringan (misalnya ke internet), data diteruskan ke Router yang bertindak sebagai Default Gateway.",
    keyFeatures: [
      "Cakupan geografis terbatas (biasanya dalam radius 10 meter hingga 1 kilometer).",
      "Kecepatan transfer data sangat tinggi (100 Mbps hingga 10 Gbps).",
      "Tingkat kesalahan transmisi (error rate) dan latency sangat rendah.",
      "Umumnya menggunakan teknologi kabel Ethernet (IEEE 802.3) atau Wi-Fi (IEEE 802.11).",
      "Dikelola secara mandiri oleh administrator jaringan lokal sekolah atau organisasi."
    ],
    realWorldExample: "Laboratorium Komputer PPLG di sekolah Anda: 36 PC siswa terhubung melalui kabel UTP ke beberapa Switch di dinding, yang kemudian terpusat ke Server Lab guru untuk membagikan modul ajar dan mengumpulkan tugas pemrograman.",
    comparisonHighlight: "Berbeda dengan MAN (Metropolitan) dan WAN (Wide Area Network) yang mencakup antarkota atau benua, LAN hanya mencakup ruangan atau gedung tunggal dengan kecepatan jauh lebih tinggi dan biaya operasional lebih rendah.",
    hotspots: [
      { id: "workstations", title: "Workstation / PC Klien", desc: "Komputer pengguna yang menghasilkan dan menerima data pekerjaan (siswa lab).", position: [-2.2, 0.4, 1.2] },
      { id: "core_switch", title: "Switch Konsentrator", desc: "Penghubung sentral yang mendistribusikan frame data ke setiap workstation secara cerdas.", position: [0, 0.5, 0] },
      { id: "gateway_router", title: "Router Gateway", desc: "Pintu gerbang yang menghubungkan LAN internal dengan jaringan luar (Internet).", position: [2.2, 0.7, -1.2] },
      { id: "local_server", title: "Server Data Lokal", desc: "Komputer server penyimpan repository proyek kode, database, dan file materi lab.", position: [1.8, 0.8, 1.2] },
      { id: "cabling", title: "Jalur Kabel UTP", desc: "Media transmisi berkecepatan tinggi yang merajut seluruh perangkat LAN.", position: [-1.0, 0.1, 0.6] }
    ]
  },
  {
    id: "modem",
    name: "Modem",
    alias: "Modulator Demodulator",
    category: "Perangkat Aktif",
    isConcept: false,
    layerOSI: "Layer 1 (Physical) & Layer 2 (Data Link)",
    shortDesc: "Perangkat yang mengubah sinyal analog dari penyedia layanan internet (ISP) menjadi sinyal digital yang dipahami komputer, dan sebaliknya.",
    overview: "Modem (singkatan dari Modulator Demodulator) adalah perangkat yang bertugas menjembatani jaringan penyedia layanan internet (ISP) dengan jaringan pengguna. Sinyal yang dikirimkan melalui kabel telepon, kabel koaksial, atau serat optik (melalui media ONT/modem optik) memiliki modulasi sinyal yang berbeda dari sinyal biner murni komputer. Modem mengubah sinyal tersebut agar komputer dapat berselancar di internet.",
    functions: [
      "Mengubah sinyal analog/gelombang pembawa dari ISP menjadi sinyal digital (Demodulasi).",
      "Mengubah sinyal digital dari komputer menjadi sinyal yang dapat ditransmisikan melalui saluran ISP (Modulasi).",
      "Membuka gerbang koneksi awal ke internet melalui saluran kabel optik/telepon/koaksial.",
      "Melakukan negosiasi kecepatan dan protokol dengan gardu ISP."
    ],
    howItWorks: "Ketika Anda meminta halaman web, komputer mengirim sinyal digital 0 dan 1. Modem memodulasi sinyal ini ke dalam frekuensi gelombang pembawa sesuai media kabel ISP. Saat sinyal balasan dari internet tiba di rumah Anda, modem mendemodulasi sinyal gelombang tersebut kembali menjadi deretan biner 0 dan 1 yang dimengerti oleh sistem operasi komputer Anda.",
    keyFeatures: [
      "Port Input ISP (kabel serat optik PON/DSL/Coax) dari luar rumah/gedung.",
      "Port Output Ethernet (WAN/LAN) untuk diteruskan ke Router atau langsung ke PC.",
      "Lampu indikator LED status: Power, PON/LOS, Internet, LAN.",
      "Banyak modem modern berwujud modem-router terintegrasi (Optical Network Terminal / ONT)."
    ],
    realWorldExample: "Kotak modem Indihome / FirstMedia / Biznet di ruang server sekolah atau di rumah Anda yang terhubung dengan kabel optik kuning tipis dari tiang internet jalan raya.",
    comparisonHighlight: "Modem mengubah jenis sinyal (media internet eksternal ke digital), sedangkan Router membagi dan mengarahkan paket data ke banyak perangkat di dalam rumah/lab.",
    hotspots: [
      { id: "isp_port", title: "Port Input ISP (Fiber/DSL)", desc: "Port tempat masuknya kabel sinyal transmisi dari penyedia layanan internet.", position: [-1.4, 0.1, -0.6] },
      { id: "lan_port", title: "Port Output Ethernet", desc: "Port RJ45 untuk menyalurkan sinyal digital yang sudah di-demodulasi ke Router/PC.", position: [1.2, 0.1, -0.6] },
      { id: "led_indicators", title: "Lampu Indikator LED", desc: "Menunjukkan status Power, Sinyal Optik (PON), dan Koneksi Internet aktif.", position: [0, 0.35, 0.7] },
      { id: "antennas", title: "Antena Nirkabel", desc: "Memancarkan sinyal Wi-Fi jika modem merupakan tipe ONT Combo (Modem + Wi-Fi).", position: [-0.9, 1.4, -0.5] },
      { id: "power_reset", title: "Tombol Power & Reset", desc: "Sakelar daya dan tombol kecil untuk mereset konfigurasi pabrik.", position: [1.3, 0.1, 0.5] }
    ]
  },
  {
    id: "router",
    name: "Router",
    alias: "Pengarah Lalu Lintas Jaringan (Layer 3)",
    category: "Perangkat Aktif",
    isConcept: false,
    layerOSI: "Layer 3 (Network Layer)",
    shortDesc: "Perangkat cerdas yang menghubungkan dua atau lebih jaringan berbeda (seperti LAN ke Internet) dan menentukan rute terbaik pengiriman paket data menggunakan IP Address.",
    overview: "Router adalah 'otak pengatur lalu lintas' dalam dunia jaringan komputer. Jika Switch hanya mengenal perangkat di dalam satu ruangan (LAN yang sama), Router bertugas menghubungkan jaringan lokal tersebut ke dunia luar (Internet atau subnet lain). Router membaca alamat IP (Internet Protocol) dan menggunakan tabel routing untuk memilih jalur transmisi tercepat dan paling efisien bagi setiap paket data.",
    functions: [
      "Menghubungkan beberapa jaringan yang berbeda segmen IP (misalnya jaringan Lab A dengan Lab B atau LAN ke Internet).",
      "Menentukan rute perjalanan terbaik (Routing Path) bagi paket data.",
      "Menjalankan fungsi DHCP Server untuk membagikan alamat IP secara otomatis ke perangkat klien.",
      "Melakukan Network Address Translation (NAT) sehingga puluhan PC dapat berbagi satu IP publik.",
      "Menyediakan fitur keamanan awal seperti Firewall dan pemfilteran port."
    ],
    howItWorks: "Saat komputer Anda mengirim permintaan data ke server YouTube (misal IP 142.250.x.x), paket data menuju Router sebagai Default Gateway. Router memeriksa header paket IP, mencocokkannya dengan Tabel Routing (Routing Table), mengemas ulang paket dengan alamat IP publik melalui NAT, lalu meneruskannya ke gateway ISP terdekat.",
    keyFeatures: [
      "Memiliki minimal 1 Port WAN (berwarna biru/berlabel WAN) dan beberapa Port LAN.",
      "Memiliki prosesor (CPU), RAM, dan sistem operasi khusus (seperti MikroTik RouterOS, Cisco IOS, OpenWrt).",
      "Mendukung protokol routing dinamis (OSPF, RIP, BGP) dan statis.",
      "Sering dilengkapi antena multi-band (2.4 GHz dan 5 GHz) untuk transmisi Wi-Fi."
    ],
    realWorldExample: "Router MikroTik RB750 atau Cisco di Lab Komputer SMK yang mengatur pembagian kuota bandwidth internet untuk setiap siswa agar tidak ada yang mengalami lag saat praktik coding.",
    comparisonHighlight: "Router beroperasi di Layer 3 (berdasarkan IP Address) untuk menghubungkan jaringan berbeda, sedangkan Switch bekerja di Layer 2 (berdasarkan MAC Address) di jaringan lokal yang sama.",
    hotspots: [
      { id: "wan_port", title: "Port WAN (Biru)", desc: "Port khusus untuk menghubungkan router ke modem atau sumber internet eksternal.", position: [-1.2, 0.2, -0.6] },
      { id: "lan_ports", title: "Array Port LAN (Kuning)", desc: "Port RJ45 untuk mendistribusikan koneksi ke switch lokal atau komputer.", position: [0.3, 0.2, -0.6] },
      { id: "antennas", title: "Antena Beamforming MIMO", desc: "Mengarahkan sinyal Wi-Fi berkecepatan tinggi ke perangkat pengguna.", position: [1.2, 1.5, -0.4] },
      { id: "status_panel", title: "Panel Status LED Digital", desc: "Menampilkan aktivitas data real-time, status internet, dan frekuensi Wi-Fi.", position: [0, 0.32, 0.6] },
      { id: "cooling_grill", title: "Ventilasi Pendingin CPU", desc: "Menjaga suhu chipset routing tetap stabil selama beban kerja komputasi tinggi.", position: [0, 0.35, 0] }
    ]
  },
  {
    id: "switch",
    name: "Switch",
    alias: "Network Switch / Multiport Bridge",
    category: "Perangkat Aktif",
    isConcept: false,
    layerOSI: "Layer 2 (Data Link Layer) - Ada juga Switch Layer 3",
    shortDesc: "Perangkat jaringan cerdas yang menghubungkan banyak komputer dalam satu LAN dan meneruskan frame data hanya ke port perangkat tujuan berdasarkan MAC Address.",
    overview: "Switch adalah tulang punggung distribusi kabel di hampir semua jaringan lokal modern. Dibandingkan pendahulunya (Hub) yang buta tujuan, Switch memiliki kecerdasan untuk mencatat alamat fisik (MAC Address) dari setiap perangkat yang tercolok ke port-portnya ke dalam tabel CAM (Content Addressable Memory). Dengan begitu, komunikasi antar-PC berlangsung secara privat tanpa mengganggu PC lainnya.",
    functions: [
      "Menghubungkan puluhan komputer, printer, dan server ke dalam satu jaringan lokal kabel.",
      "Meneruskan data secara tepat sasaran (Unicast) berdasarkan tabel MAC Address.",
      "Mencegah tabrakan data (Data Collision) dengan membagi jaringan ke dalam collision domain independen pada setiap port.",
      "Mendukung komunikasi Full-Duplex (mengirim dan menerima data secara bersamaan tanpa saling menghambat).",
      "Pada Switch Managed: Mendukung segmentasi virtual (VLAN), QoS, dan keamanan port."
    ],
    howItWorks: "Ketika PC A mengirim file ke PC B, Switch memeriksa alamat MAC tujuan di header frame Ethernet. Switch melihat tabel MAC-nya untuk mengetahui di port nomor berapa PC B berada. Data langsung dialirkan ke port PC B saja, tanpa disebarkan ke PC C, D, atau E. Hal ini menghemat bandwidth dan meningkatkan kerahasiaan data.",
    keyFeatures: [
      "Tersedia dalam varian jumlah port banyak: 8, 16, 24, hingga 48 port RJ45.",
      "Dilengkapi lampu LED indikator link/activity di atas setiap port.",
      "Memiliki port uplink berkecepatan lebih tinggi (misalnya Gigabit atau 10G SFP/SFP+ Fiber).",
      "Bentuk standar 19 inci rackmount yang pas dipasang di rak server (Server Rack Cabinet)."
    ],
    realWorldExample: "Switch rackmount 24-port di laboratorium SMK PPLG yang menghubungkan seluruh 24 meja komputer siswa ke server pusat sekolah dengan kabel UTP.",
    comparisonHighlight: "Berbeda dengan Hub yang menyebarkan data ke semua port secara membabi-buta (Broadcast), Switch hanya mengirim data ke port perangkat yang berhak menerimanya (Unicast).",
    hotspots: [
      { id: "rj45_ports", title: "Port RJ45 Gigabit (1-24)", desc: "Soket tempat mencolokkan konektor kabel UTP dari komputer-komputer klien.", position: [-0.6, 0.25, 0.52] },
      { id: "uplink_sfp", title: "Port Uplink SFP Fiber", desc: "Port optik berkecepatan tinggi untuk menghubungkan switch ke router inti atau switch lain.", position: [1.6, 0.25, 0.52] },
      { id: "led_indicators", title: "LED Activity / Link", desc: "Berkedip hijau/oranye untuk menandakan transmisi data dan kecepatan link (100/1000 Mbps).", position: [-0.6, 0.45, 0.52] },
      { id: "rack_ears", title: "Rack Ears (Sayap Pemasangan)", desc: "Braket logam di sisi kiri dan kanan untuk mengunci switch ke lemari rak server 19 inci.", position: [-2.1, 0.25, 0] },
      { id: "console_port", title: "Port Console Management", desc: "Port khusus administrator jaringan untuk mengonfigurasi CLI Switch (VLAN, STP).", position: [1.2, 0.25, 0.52] }
    ]
  },
  {
    id: "hub",
    name: "Hub",
    alias: "Multiport Repeater (Teknologi Warisan / Legacy)",
    category: "Perangkat Aktif (Legacy)",
    isConcept: false,
    layerOSI: "Layer 1 (Physical Layer)",
    shortDesc: "Perangkat jaringan sederhana yang menerima data pada satu port dan menyalinnya ke seluruh port lain tanpa memeriksa alamat penerima.",
    overview: "Hub adalah perangkat konsentrator generasi awal sebelum Switch diciptakan. Hub bekerja secara 'buta' di Lapisan Fisik (Layer 1 OSI). Hub tidak memiliki memori, tidak memiliki tabel MAC address, dan tidak dapat membedakan komputer tujuan. Ketika ada satu sinyal listrik masuk dari sebuah komputer, Hub hanya menguatkan sinyal tersebut dan memancarkannya kembali ke seluruh komputer lain yang terhubung.",
    functions: [
      "Menghubungkan beberapa perangkat dalam satu segmen jaringan fisik sederhana.",
      "Menguatkan sinyal listrik yang masuk dan meregenerasikannya ke seluruh port yang aktif.",
      "Sebagai perangkat pembelajaran untuk memahami konsep dasar collision domain dan broadcast jaringan."
    ],
    howItWorks: "Jika PC 1 mengirim data ke PC 2, Hub tidak tahu di mana PC 2 berada. Hub langsung menyalin data tersebut dan mengirimkannya ke PC 2, PC 3, PC 4, dan semua perangkat lain. Setiap komputer harus memeriksa data tersebut secara mandiri dan membuangnya jika bukan untuk dirinya. Akibatnya, jika dua komputer mengirim data bersamaan, terjadi tabrakan data (Collision).",
    keyFeatures: [
      "Hanya memiliki satu Collision Domain tunggal untuk seluruh port.",
      "Hanya beroperasi dalam mode Half-Duplex (hanya bisa mengirim ATAU menerima secara bergantian, tidak bisa bersamaan).",
      "Memiliki lampu indikator khusus 'Collision LED' yang akan berkedip merah/oranye saat data bertabrakan.",
      "Kecepatan transfer data rendah (biasanya 10 Mbps atau 100 Mbps) yang dibagi ke semua port aktif."
    ],
    realWorldExample: "Jaringan komputer era tahun 1990-an hingga awal 2000-an. Saat ini Hub sudah ditinggalkan dan digantikan sepenuhnya oleh Switch karena Switch jauh lebih efisien, cepat, dan aman.",
    comparisonHighlight: "Hub membagi bandwidth dan menyebarkan data ke semua port (rentan tabrakan & penyadapan data), sedangkan Switch memberikan bandwidth penuh ke setiap port dan menyalurkan data secara privat ke port tujuan.",
    hotspots: [
      { id: "broadcast_ports", title: "Array Port Broadcast", desc: "Port Ethernet yang menerima dan memuntahkan data ke seluruh port lainnya.", position: [0, 0.2, 0.55] },
      { id: "collision_led", title: "Lampu Collision Indicator", desc: "Lampu yang menyala ketika terjadi benturan sinyal akibat dua PC mengirim data bersamaan.", position: [-1.1, 0.35, 0.55] },
      { id: "power_port", title: "Port Adaptor Daya DC", desc: "Soket daya eksternal untuk menghidupkan sirkuit penguat sinyal Hub.", position: [1.2, 0.2, -0.55] },
      { id: "uplink_button", title: "Tombol Uplink / Crossover", desc: "Tombol pengubah jalur transmisi untuk menghubungkan dua Hub menggunakan kabel straight.", position: [0.9, 0.3, 0.55] }
    ]
  },
  {
    id: "access_point",
    name: "Access Point (AP)",
    alias: "Wireless Access Point (WAP)",
    category: "Perangkat Aktif",
    isConcept: false,
    layerOSI: "Layer 2 (Data Link) & Layer 1 (Physical / Gelombang Radio RF)",
    shortDesc: "Perangkat pemancar nirkabel yang memungkinkan laptop, smartphone, dan perangkat Wi-Fi lainnya terhubung ke jaringan kabel lokal (LAN).",
    overview: "Access Point (AP) bertindak sebagai jembatan (bridge) antara dunia kabel dan dunia nirkabel. Jika Switch membutuhkan kabel fisik UTP untuk setiap komputer, Access Point menggunakan gelombang radio frekuensi tinggi (2.4 GHz, 5 GHz, hingga 6 GHz pada Wi-Fi 6E/7) untuk mentransmisikan data di udara. Access Point banyak dipasang di langit-langit ruangan kelas, aula, atau koridor sekolah untuk menyediakan jangkauan Wi-Fi yang luas dan stabil bagi ratusan perangkat mobile.",
    functions: [
      "Memancarkan sinyal Wi-Fi (SSID) agar perangkat nirkabel dapat bergabung ke jaringan lokal.",
      "Mengonversi frame kabel Ethernet (802.3) menjadi frame nirkabel (802.11) dan sebaliknya.",
      "Mendukung Power over Ethernet (PoE) sehingga daya listrik dan data dialirkan melalui satu kabel UTP.",
      "Mendukung fitur Roaming (pengguna dapat berpindah antartitik AP tanpa terputus koneksinya)."
    ],
    howItWorks: "Access Point terhubung ke Switch utama melalui kabel UTP. AP memancarkan sinyal radio berbentuk gelombang frekuensi. Ketika smartphone siswa memasukkan kata sandi Wi-Fi, AP memverifikasi keamanan (WPA2/WPA3), lalu meneruskan permohonan IP ke DHCP server router. Setelah terhubung, data ditransmisikan melalui gelombang elektromagnetik berkecepatan tinggi.",
    keyFeatures: [
      "Bentuk piringan atau kubah elegan (saucer/dome) yang dirancang untuk dipasang di plafon.",
      "Cincin lampu LED status minimalis yang menunjukkan kondisi konektivitas.",
      "Antena omni-directional internal berkekuatan tinggi dengan jangkauan 360 derajat.",
      "Dilengkapi port gigabit PoE (Power over Ethernet) di bagian belakang."
    ],
    realWorldExample: "Perangkat putih bundar seperti Ubiquiti UniFi, Cisco Meraki, atau Ruijie Reyee yang menempel di plafon ruang lab atau lorong sekolah SMK Anda.",
    comparisonHighlight: "Access Point murni hanya memancarkan sinyal Wi-Fi ke jaringan kabel yang sudah ada (tidak melakukan pembagian IP/routing), sedangkan Router bertugas membagi IP dan mengarahkan lalu lintas data.",
    hotspots: [
      { id: "led_ring", title: "Cincin Status LED", desc: "Indikator warna estetis (biru: aktif normal, putih: booting, merah: kabel terputus).", position: [0, 0.45, 0] },
      { id: "omni_antennas", title: "Larik Antena Omni Internal", desc: "Antena frekuensi ganda (2.4 GHz & 5 GHz) yang memancarkan sinyal merata ke seluruh ruangan.", position: [0.7, 0.25, 0.7] },
      { id: "poe_port", title: "Port PoE (Power over Ethernet)", desc: "Port RJ45 yang menerima pasokan daya listrik sekaligus aliran data jaringan secara bersamaan.", position: [0, -0.3, -0.6] },
      { id: "ceiling_mount", title: "Braket Pengunci Plafon", desc: "Mekanisme pengunci untuk memasang AP dengan aman di langit-langit gedung.", position: [0, -0.35, 0] }
    ]
  },
  {
    id: "nic",
    name: "Network Interface Card (NIC)",
    alias: "LAN Card / Network Adapter",
    category: "Komponen Perangkat Keras",
    isConcept: false,
    layerOSI: "Layer 2 (Data Link) & Layer 1 (Physical)",
    shortDesc: "Papan sirkuit elektronik pada komputer yang memungkinkan perangkat terhubung ke jaringan kabel atau nirkabel, serta memuat alamat unik MAC Address.",
    overview: "Network Interface Card (NIC), atau sering disebut LAN Card, adalah gerbang komunikasi fisik komputer dengan jaringan luar. Tanpa NIC, sebuah komputer tidak akan pernah bisa mengirim atau menerima data jaringan. NIC dapat berupa kartu ekspansi PCIe yang ditancapkan ke motherboard, chip terintegrasi (onboard) di motherboard, maupun dongle USB Ethernet. Yang paling fundamental, setiap NIC di dunia memiliki alamat fisik unik 48-bit yang disebut MAC Address (Media Access Control) yang ditanam sejak dari pabrik.",
    functions: [
      "Mengubah data paralel internal komputer menjadi format serial untuk ditransmisikan melalui kabel jaringan.",
      "Menyediakan soket fisik RJ45 (atau antena Wi-Fi) sebagai titik tancap media transmisi.",
      "Menyimpan alamat fisik permanen komputer (MAC Address) yang tidak dapat diduplikasi di dunia.",
      "Melakukan enkapsulasi data ke dalam frame Ethernet dan memeriksa validitas data menggunakan FCS (Frame Check Sequence)."
    ],
    howItWorks: "Ketika program aplikasi atau game Anda mengirim data, sistem operasi meneruskan data ke driver NIC. Kontroller NIC memecah data menjadi frame Ethernet, menyematkan MAC Address asal dan tujuan, menghitung kode pengecekan error (CRC), lalu memicu transceiver fisik untuk memancarkan sinyal voltase listrik melalui pin kabel UTP.",
    keyFeatures: [
      "Konektor bus ekspansi PCIe (biasanya PCIe x1 atau x4 berlapis emas) untuk ditancap ke motherboard.",
      "Port logam RJ45 dengan perisai pelindung induksi elektromagnetik (EMI Shielding).",
      "Chipset kontroler Ethernet utama (misal Realtek, Intel Gigabit, atau Broadcom).",
      "Dua lampu LED mini di samping port RJ45 (LED Link hijau dan LED Activity kuning)."
    ],
    realWorldExample: "Kartu LAN Card di dalam casing PC desktop Lab Komputer yang memiliki colokan kabel LAN di bagian belakang casing.",
    comparisonHighlight: "NIC adalah kartu adapter di dalam komputer penerima/pengirim data, sedangkan Switch dan Router adalah perangkat independen pengatur lalu lintas data di luar komputer.",
    hotspots: [
      { id: "pcie_pins", title: "Konektor Bus PCIe Emas", desc: "Jalur komunikasi data berkecepatan ultra tinggi langsung ke prosesor dan RAM motherboard.", position: [0, -0.9, -0.1] },
      { id: "rj45_socket", title: "Soket Logam RJ45", desc: "Colokan penerima jack kabel UTP dengan pelindung dari interferensi gelombang liar.", position: [1.8, 0.1, 0.4] },
      { id: "controller_chip", title: "Chipset Kontroler MAC & PHY", desc: "Otak silikon pemroses protokol frame Ethernet dan enkapsulasi biner data.", position: [-0.4, 0.1, 0.1] },
      { id: "metal_bracket", title: "Bracket Logam Casing", desc: "Penopang kokoh yang dikencangkan dengan baut ke rangka casing komputer desktop.", position: [1.85, -0.3, 0] },
      { id: "activity_leds", title: "Lampu Indikator Link/Speed", desc: "LED kecil penunjuk kecepatan link aktif (10/100/1000 Mbps).", position: [1.85, 0.35, 0.4] }
    ]
  },
  {
    id: "kabel_utp",
    name: "Kabel UTP",
    alias: "Unshielded Twisted Pair (Cat5e / Cat6 / Cat6a)",
    category: "Media Transmisi Fisik",
    isConcept: false,
    layerOSI: "Layer 1 (Physical Layer)",
    shortDesc: "Media transmisi berupa kabel berisi 4 pasang kawat tembaga yang saling terpilin tanpa pelindung foil khusus, paling populer digunakan untuk jaringan LAN.",
    overview: "Kabel UTP (Unshielded Twisted Pair) adalah media transmisi kabel yang paling banyak digunakan di dunia untuk menghubungkan perangkat dalam jaringan LAN. Di dalamnya terdapat 8 inti kawat tembaga yang dikelompokkan menjadi 4 pasang. Masing-masing pasangan dipilin (dibuat spiral). Teknik pemilinan ini bukan sekadar estetika, melainkan rekayasa fisika penting untuk membatalkan interferensi elektromagnetik dan gangguan crosstalk antarjalur kawat tembaga.",
    functions: [
      "Menyalurkan sinyal listrik data dari komputer ke switch, router, atau perangkat jaringan lainnya.",
      "Menyediakan media transfer data kabel hingga kecepatan 1 Gbps (Cat5e/Cat6) bahkan 10 Gbps (Cat6a).",
      "Menyalurkan daya listrik rendah untuk perangkat lain melalui teknologi PoE (Power over Ethernet)."
    ],
    howItWorks: "Kabel UTP mentransmisikan data melalui pulsa tegangan listrik mikro pada kawat tembaga. Pada standar 100BASE-TX, 2 pasang digunakan untuk transmit (TX) dan receive (RX). Sedangkan pada Gigabit Ethernet (1000BASE-T), keempat pasang kawat bekerja secara simultan (Full Duplex) sehingga menghasilkan laju transfer hingga 1.000 Mbps.",
    keyFeatures: [
      "Terdiri dari 4 pasang kabel berwarna standar: Oranye-Putih/Oranye, Hijau-Putih/Hijau, Biru-Putih/Biru, Cokelat-Putih/Cokelat.",
      "Berdiameter ringkas, lentur, dan mudah dipasang di pipa dinding atau plafon ruangan.",
      "Batas panjang maksimal transmisi tanpa repeater adalah 100 meter.",
      "Dua standar susunan warna krimping: T568A dan T568B (Straight-Through vs Crossover)."
    ],
    realWorldExample: "Kabel biru atau abu-abu yang menjulur dari CPU komputer sekolah Anda menuju stopkontak port LAN di bawah meja atau ke switch di dinding.",
    comparisonHighlight: "Berbeda dengan STP (Shielded Twisted Pair) yang memiliki lapisan aluminium foil pelindung untuk pabrik berat, UTP tidak memiliki pelindung aluminium foil sehingga lebih fleksibel dan ekonomis untuk kantor/lab.",
    hotspots: [
      { id: "twisted_pairs", title: "4 Pasang Kawat Terpilin", desc: "Kawat tembaga berpasangan dengan kode warna resmi (Oranye, Hijau, Biru, Cokelat).", position: [0.6, 0.4, 0.2] },
      { id: "copper_core", title: "Inti Konduktor Tembaga", desc: "Tembaga murni berkonduktivitas tinggi penghantar arus data biner.", position: [1.4, 0.6, 0.3] },
      { id: "pvc_jacket", title: "Jaket Pelindung Luar PVC", desc: "Lapisan polimer tahan panas dan gesekan pelindung bagian dalam kabel.", position: [-0.9, 0, 0] },
      { id: "rip_cord", title: "Benang Pengupas (Rip Cord)", desc: "Benang nilon kuat untuk membelah jaket PVC secara presisi tanpa melukai isolator kabel.", position: [-0.1, 0.2, 0.3] }
    ]
  },
  {
    id: "rj45",
    name: "Konektor RJ45",
    alias: "Registered Jack 45 (8P8C)",
    category: "Konektor & Terminasi",
    isConcept: false,
    layerOSI: "Layer 1 (Physical Layer)",
    shortDesc: "Kepala konektor modular plastik transparan dengan 8 pin kuningan berlapis emas yang dipasang di ujung kabel UTP untuk mencolokkan ke port jaringan.",
    overview: "Konektor RJ45 (Registered Jack 45) dengan form-factor 8P8C (8 Position 8 Contact) adalah konektor standar internasional untuk kabel Ethernet UTP/STP. Kepala konektor ini terbuat dari plastik polikarbonat bening transparan dengan 8 bilah pin kuningan yang dilapisi emas tipis di ujungnya. Konektor ini dipasangkan ke ujung kabel UTP menggunakan alat khusus yang disebut Tang Krimping (Crimping Tool) agar pin tembaga menembus isolator kawat kabel.",
    functions: [
      "Menghubungkan ujung fisik 8 kawat kabel UTP dengan soket port Ethernet pada komputer, switch, atau router.",
      "Menjaga urutan 8 kawat warna tetap rapi dan terisolasi satu sama lain sesuai standar T568A atau T568B.",
      "Mengunci kabel ke dalam soket port menggunakan klip pengunci fleksibel (locking latch) agar tidak mudah terlepas akibat tarikan."
    ],
    howItWorks: "Setelah 8 kawat kabel UTP diluruskan dan disusun warnanya, kawat dimasukkan ke 8 saluran pemandu di dalam RJ45. Saat ditekan dengan tang krimping, gigi-gigi pin emas ditekan ke bawah menembus kulit kawat tembaga, menciptakan sambungan listrik yang presisi dan tahan korosi.",
    keyFeatures: [
      "Bodi plastik polikarbonat tembus pandang untuk mempermudah pengecekan urutan warna kabel.",
      "8 pin kontak tembaga berbalut emas 50-mikron untuk konduktivitas tinggi dan anti-karat.",
      "Klip pengunci fleksibel (latch clip) yang berbunyi 'klik' saat menancap pas di soket port.",
      "Rongga penjepit jaket kabel (strain relief) yang menahan kabel agar tidak mudah tertarik putus."
    ],
    realWorldExample: "Kepala colokan bening transparan di ujung kabel LAN yang siswa PPLG pelajari cara memasangnya (krimping kabel) saat praktik bengkel jaringan dasar.",
    comparisonHighlight: "Jangan tertukar dengan RJ11! RJ11 berukuran lebih kecil dengan 4 atau 6 pin yang digunakan untuk kabel telepon rumah kuno, sedangkan RJ45 memiliki 8 pin untuk transmisi jaringan komputer.",
    hotspots: [
      { id: "gold_pins", title: "8 Pin Kontak Berlapis Emas", desc: "Bilah tembaga bergigi mikro yang menghantarkan sinyal listrik langsung ke soket port.", position: [1.2, 0.45, 0] },
      { id: "locking_clip", title: "Klip Pengunci (Latch Clip)", desc: "Pengait lentur yang mengunci konektor di dalam port hingga berbunyi 'klik' aman.", position: [0.1, 0.9, 0] },
      { id: "clear_body", title: "Bodi Polikarbonat Bening", desc: "Rumah plastik tahan benturan yang memungkinkan teknisi memeriksa kerapian urutan warna kabel.", position: [-0.2, 0.1, 0] },
      { id: "strain_relief", title: "Klem Penjepit Jaket Kabel", desc: "Bagian plastik yang dijepit ke jaket luar kabel UTP untuk menahan gaya tarikan fisik.", position: [-1.1, 0, 0] }
    ]
  },
  {
    id: "server",
    name: "Server",
    alias: "Dedicated Server / Rackmount Compute Node",
    category: "Komputer Pusat Layanan",
    isConcept: false,
    layerOSI: "Layer 7 (Application) hingga Layer 1 (Physical)",
    shortDesc: "Komputer berspesifikasi tinggi dan berkemampuan kerja non-stop 24/7 yang bertugas melayani permintaan data, hosting aplikasi, dan manajemen jaringan klien.",
    overview: "Server adalah komputer berkekuatan komputasi tinggi yang dirancang khusus untuk melayani permintaan dari komputer lain (klien) di dalam jaringan. Dalam dunia PPLG (Pengembangan Perangkat Lunak dan Gim), server adalah tempat menyimpan basis data (Database Server), menjalankan backend REST API aplikasi (Web Server), menyimpan repositori source code (Git Server), hingga melayani koneksi multipemain game online (Game Dedicated Server). Server dirancang untuk beroperasi terus-menerus tanpa henti selama bertahun-tahun dengan keandalan (redundansi) perangkat keras yang sangat tinggi.",
    functions: [
      "Menyediakan layanan sentral (Web, Database, DNS, DHCP, File Sharing, Game Server) untuk ribuan klien.",
      "Mengelola autentikasi dan hak akses keamanan pengguna dalam satu domain jaringan.",
      "Menyimpan cadangan data (backup) proyek perangkat lunak sekolah secara terpusat.",
      "Melayani komputasi berat yang tidak sanggup dilakukan oleh komputer klien biasa."
    ],
    howItWorks: "Server menjalankan program daemon/service yang terus mendengarkan (listening) port jaringan tertentu (misal port 80/443 untuk Web Server atau port 3306 untuk MySQL). Ketika siswa membuka aplikasi dari browser komputer klien, permintaan (request) dikirim ke server. Server memproses query logika, mengambil data dari disk, lalu mengirimkan jawaban (response) kembali ke klien dalam hitungan milidetik.",
    keyFeatures: [
      "Bentuk casing rak standar 1U atau 2U (Rackmount) dengan gagang pengunci kuat.",
      "Komponen redundan (Dual Redundant Power Supply, ECC RAM tahan error, dan Hot-swap Drive Bays).",
      "Sistem pendingin mutakhir dengan kipas berkecepatan tinggi yang tahan berputar 24/7.",
      "Port kartu jaringan berkecepatan tinggi (Dual/Quad Gigabit Ethernet atau 10Gbps SFP+)."
    ],
    realWorldExample: "Komputer server sekolah tempat hosting Ujian Berbasis Komputer (ANBK / CBT) atau server Discord/Steam tempat server multiplayer game online berjalan.",
    comparisonHighlight: "PC Klien dirancang untuk interaksi langsung satu pengguna (ada monitor, mouse, keyboard), sedangkan Server dirancang tanpa layar (headless) untuk melayani ratusan hingga jutaan pengguna secara bersamaan dari jarak jauh.",
    hotspots: [
      { id: "hot_swap_drives", title: "Drive Bay Hot-Swap (SSD/HDD)", desc: "Slot penyimpanan data yang dapat dicabut-pasang langsung tanpa perlu mematikan mesin server.", position: [-0.6, 0.2, 1.25] },
      { id: "redundant_psu", title: "Dual Power Supply Redundan", desc: "Dua sumber daya listrik independen; jika satu listrik padam, server tetap hidup tanpa mati.", position: [1.2, 0.2, -1.25] },
      { id: "cooling_grille", title: "Grille Ventilasi Aliran Udara", desc: "Desain sarang lebah untuk membuang panas prosesor multi-core melalui kipas server bertekanan tinggi.", position: [0.7, 0.2, 1.25] },
      { id: "rack_handles", title: "Gagang Pengunci Rackmount 2U", desc: "Pegangan kokoh berstandar 19 inci untuk menarik unit server keluar dari kabinet rak data center.", position: [-1.9, 0.2, 1.2] },
      { id: "server_nics", title: "Multiport LAN Gigabit / 10G", desc: "Larik port jaringan berkecepatan tinggi dengan fitur Link Aggregation untuk mencegah bottleneck.", position: [-0.8, 0.2, -1.25] }
    ]
  }
];
