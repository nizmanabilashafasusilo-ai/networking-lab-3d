import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Network, 
  Zap, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Wifi, 
  Cable, 
  Radio, 
  HelpCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import DeviceScene from '../models/DeviceScene';
import { devicesData } from '../../data/devicesData';
import { soundManager } from '../../utils/audio';

export default function HomeView({ setActiveTab, setSelectedDeviceId }) {
  const handleStartLearning = () => {
    soundManager.playClick();
    setActiveTab('explorer');
  };

  const handleOpenDevice = (id) => {
    soundManager.playClick();
    if (setSelectedDeviceId) setSelectedDeviceId(id);
    setActiveTab('explorer');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-6 md:pt-12 overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101d38] border-2 border-cyan-400/50 text-cyan-300 text-xs font-bold tracking-wider uppercase shadow-md shadow-cyan-500/10">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                Laboratorium Virtual SMK PPLG
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md">
                  NETWORKING <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">LAB</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                  Jelajahi Dunia Jaringan Komputer dalam 3D
                </h2>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Media pembelajaran interaktif materi Jaringan Dasar untuk siswa kelas X SMK jurusan <span className="text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">Pengembangan Perangkat Lunak dan Gim (PPLG)</span>. Amati struktur hardware, putar 360°, pelajari cara kerja transmisi data, dan uji pemahamanmu secara langsung.
              </p>

              {/* Action Buttons with High Contrast */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleStartLearning}
                  className="px-7 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-xl shadow-cyan-400/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-white/50"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('simulator');
                  }}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#13203c] text-cyan-300 border-2 border-cyan-400/70 hover:bg-[#1a2d54] hover:border-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-lg shadow-black/40"
                >
                  <Network className="w-4 h-4 text-cyan-400" />
                  <span>Simulasi Jaringan</span>
                </button>
              </div>

              {/* Key Features Badges with Solid Backgrounds */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-700/80 max-w-lg mx-auto lg:mx-0">
                <div className="p-3 rounded-xl bg-[#101b33] border border-cyan-500/30 text-center lg:text-left shadow">
                  <div className="text-2xl font-black text-cyan-300">10</div>
                  <div className="text-xs text-slate-300 font-semibold">Objek 3D Detail</div>
                </div>
                <div className="p-3 rounded-xl bg-[#101b33] border border-blue-500/30 text-center lg:text-left shadow">
                  <div className="text-2xl font-black text-blue-300">360°</div>
                  <div className="text-xs text-slate-300 font-semibold">Rotasi & Zoom</div>
                </div>
                <div className="p-3 rounded-xl bg-[#101b33] border border-emerald-500/30 text-center lg:text-left shadow">
                  <div className="text-2xl font-black text-emerald-300">100%</div>
                  <div className="text-xs text-slate-300 font-semibold">Kurikulum SMK</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Hero Preview */}
            <div className="lg:col-span-6 z-10">
              <div className="relative group">
                {/* Glow ring frame */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />
                
                <div className="relative h-[420px] sm:h-[490px] w-full rounded-2xl overflow-hidden cyber-card border-2 border-cyan-400/50 shadow-2xl">
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#0c162e]/95 backdrop-blur-md px-4 py-2 rounded-full border-2 border-cyan-400/60 text-xs font-bold text-cyan-200 shadow-xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Topologi Interaktif 3D: Local Area Network (LAN)</span>
                  </div>

                  {/* 3D Scene */}
                  <DeviceScene
                    deviceId="lan"
                    autoRotate={true}
                    showHotspots={false}
                    enableFloat={true}
                  />

                  {/* Bottom overlay with quick explore trigger */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <button
                      onClick={() => handleOpenDevice('lan')}
                      className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center gap-2 shadow-xl shadow-cyan-400/40 transition-all cursor-pointer border border-white/60"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Buka Detail Topologi</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- GRID OF 10 NETWORK HARDWARE CARDS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider px-3 py-1 rounded-full bg-[#101e38] border border-cyan-400/40">
            <Layers className="w-4 h-4 text-cyan-400" /> Katalog Perangkat Pembelajaran
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            10 Perangkat & Konsep Jaringan Komputer
          </h3>
          <p className="text-slate-300 text-sm">
            Klik pada perangkat untuk membuka laboratorium 3D lengkap dengan titik hotspot interaktif dan pembahasan materi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {devicesData.map((dev) => (
            <div
              key={dev.id}
              onClick={() => handleOpenDevice(dev.id)}
              className="cyber-card p-5 rounded-2xl group hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 border-slate-700/70 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#16274a] text-cyan-300 border border-cyan-400/50 shadow-sm">
                    {dev.isConcept ? "Konsep" : "Hardware"}
                  </span>
                  <span className="text-[11px] text-cyan-400 font-mono font-bold bg-[#0d1629] px-2 py-0.5 rounded border border-slate-700">
                    {dev.layerOSI.split(' ')[0]}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {dev.name}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                    {dev.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-cyan-300 font-bold group-hover:text-cyan-200">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-cyan-400" /> Teliti 3D
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY PPLG STUDENTS NEED NETWORKING --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cyber-card p-8 sm:p-12 rounded-3xl relative overflow-hidden border-2 border-cyan-400/40 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider px-3 py-1 rounded-full bg-[#13203c] border border-cyan-400/40 inline-block">
                Relevansi Jurusan
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Kenapa Siswa PPLG Wajib Memahami Jaringan Komputer?
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Di era cloud computing dan aplikasi modern, seorang programmer tidak hanya menulis sintaks kode, tetapi juga membangun sistem yang berkomunikasi melalui jaringan.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#14203a] border-2 border-slate-700/70 space-y-2 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">Arsitektur Client-Server</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Memahami bagaimana frontend (React/Flutter) mengirim HTTP request melalui router ke backend API di server.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14203a] border-2 border-slate-700/70 space-y-2 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">Pengembangan Game Multiplayer</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Mengetahui protokol TCP vs UDP, sinkronisasi posisi pemain, latency, dan packet loss dalam gim online.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14203a] border-2 border-slate-700/70 space-y-2 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">Localhost & Testing Lab</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Menguji aplikasi web menggunakan alamat IP privat LAN antarperangkat laptop siswa sebelum di-deploy.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14203a] border-2 border-slate-700/70 space-y-2 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">Keamanan & Port Forwarding</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Mengamankan port database (MySQL/PostgreSQL) agar tidak dapat diakses sembarang perangkat di jaringan publik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
