import React, { useState } from 'react';
import { 
  RotateCcw, 
  Play, 
  Pause, 
  Grid, 
  MapPin, 
  BookOpen, 
  Info, 
  Layers, 
  CheckCircle, 
  Workflow, 
  HelpCircle, 
  Cpu, 
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import DeviceScene from '../models/DeviceScene';
import { devicesData } from '../../data/devicesData';
import { soundManager } from '../../utils/audio';

export default function ExplorerView({ selectedDeviceId, setSelectedDeviceId }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeTab, setActiveInfoTab] = useState('pengertian');

  // Current active device
  const currentDevice = devicesData.find((d) => d.id === selectedDeviceId) || devicesData[0];

  const categories = [
    { id: 'all', label: 'Semua (10)' },
    { id: 'perangkat_aktif', label: 'Perangkat Aktif' },
    { id: 'media', label: 'Media & Konektor' },
    { id: 'konsep', label: 'Topologi & Server' }
  ];

  const filteredDevices = devicesData.filter((d) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'perangkat_aktif') return ['modem', 'router', 'switch', 'hub', 'access_point'].includes(d.id);
    if (activeCategory === 'media') return ['nic', 'kabel_utp', 'rj45'].includes(d.id);
    if (activeCategory === 'konsep') return ['lan', 'server'].includes(d.id);
    return true;
  });

  const handleSelectDevice = (id) => {
    soundManager.playClick();
    setSelectedDeviceId(id);
    setActiveHotspot(null);
  };

  const handleSelectHotspot = (hotspot) => {
    setActiveHotspot(hotspot);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-700/80">
        <div>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-cyan-400" /> Laboratorium 3D Interaktif
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Jelajah Perangkat Jaringan Komputer
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Pilih perangkat untuk melihat model 3D, putar 360°, dan klik titik hotspot untuk mempelajari komponennya.
          </p>
        </div>

        {/* Filter Badges with High Contrast */}
        <div className="flex flex-wrap items-center gap-2 bg-[#121c35] p-1.5 rounded-2xl border-2 border-slate-700/80 shadow-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                  : 'text-slate-200 hover:text-white hover:bg-[#1a294c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Device Selector Carousel with Clear Buttons */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {filteredDevices.map((dev) => {
          const isSelected = dev.id === currentDevice.id;
          return (
            <button
              key={dev.id}
              onClick={() => handleSelectDevice(dev.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/40 border-cyan-400 text-cyan-200 shadow-cyan-400/20 scale-102 ring-2 ring-cyan-400/40'
                  : 'bg-[#121d38] border-slate-700 text-slate-200 hover:text-white hover:bg-[#19284a] hover:border-slate-500'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
              <span>{dev.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 3D Scene Container Column */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* 3D Canvas Box */}
          <div className="relative h-[480px] sm:h-[540px] w-full rounded-2xl overflow-hidden cyber-card border-2 border-cyan-400/50 shadow-2xl">
            {/* Top Device Banner Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 bg-[#0b1429]/95 backdrop-blur-md px-4 py-2 rounded-full border-2 border-cyan-400/60 text-xs shadow-xl">
              <span className="text-cyan-300 font-extrabold">{currentDevice.name}</span>
              <span className="text-slate-400">•</span>
              <span className="text-cyan-400 font-mono text-[11px] font-bold bg-[#14203a] px-2 py-0.5 rounded border border-slate-700">{currentDevice.layerOSI}</span>
            </div>

            {/* 3D View Controls Toolbar (Top Right) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0c162e]/95 backdrop-blur-md p-1.5 rounded-xl border-2 border-slate-700 shadow-xl">
              {/* Auto Rotate Toggle */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setAutoRotate(!autoRotate);
                }}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  autoRotate ? 'bg-cyan-400 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#19284c]'
                }`}
                title={autoRotate ? "Hentikan Rotasi Otomatis" : "Aktifkan Rotasi Otomatis"}
              >
                {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Wireframe Toggle */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setWireframe(!wireframe);
                }}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  wireframe ? 'bg-cyan-400 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#19284c]'
                }`}
                title={wireframe ? "Mode Solid" : "Mode Wireframe 3D"}
              >
                <Grid className="w-4 h-4" />
              </button>

              {/* Hotspots Toggle */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowHotspots(!showHotspots);
                }}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  showHotspots ? 'bg-cyan-400 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#19284c]'
                }`}
                title={showHotspots ? "Sembunyikan Titik Hotspot" : "Tampilkan Titik Hotspot"}
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>

            {/* Active Hotspot Bubble Notification (Bottom Center) */}
            {activeHotspot && (
              <div className="absolute bottom-14 left-4 right-4 z-20 bg-[#0d172e] backdrop-blur-md border-2 border-cyan-400 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <div className="text-xs font-extrabold text-cyan-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>{activeHotspot.title}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{activeHotspot.desc}</p>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-[#1a284c] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* 3D Canvas */}
            <DeviceScene
              deviceId={currentDevice.id}
              wireframe={wireframe}
              autoRotate={autoRotate}
              showHotspots={showHotspots}
              hotspots={currentDevice.hotspots || []}
              activeHotspot={activeHotspot}
              onSelectHotspot={handleSelectHotspot}
              enableFloat={true}
            />
          </div>

          {/* Hotspot Pills Selection Row */}
          {currentDevice.hotspots && currentDevice.hotspots.length > 0 && (
            <div className="bg-[#101b34] border-2 border-slate-700/80 p-3.5 rounded-2xl space-y-2 shadow-lg">
              <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Titik Hotspot Komponen (Klik untuk Fokus):
              </span>
              <div className="flex flex-wrap gap-2">
                {currentDevice.hotspots.map((h) => {
                  const isHActive = activeHotspot?.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveHotspot(h);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                        isHActive
                          ? 'bg-cyan-400 text-slate-950 border-white font-extrabold scale-105'
                          : 'bg-[#152342] text-slate-200 border-slate-600 hover:border-cyan-400 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{h.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Device Information Panel Column with High Contrast Cards */}
        <div className="lg:col-span-5 cyber-card p-6 rounded-2xl space-y-6 border-2 border-cyan-400/40 shadow-2xl">
          {/* Header Info */}
          <div className="space-y-1.5 pb-2 border-b-2 border-slate-700/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded bg-[#16274a] text-cyan-300 border border-cyan-400/50 uppercase tracking-wider shadow-sm">
                {currentDevice.category}
              </span>
              <span className="text-xs text-cyan-300 font-mono font-bold bg-[#14203a] px-2.5 py-0.5 rounded border border-slate-700">
                {currentDevice.layerOSI}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {currentDevice.name}
            </h3>
            <p className="text-xs text-slate-300 italic font-medium">
              {currentDevice.alias}
            </p>
          </div>

          {/* Sub Navigation Tabs for Material */}
          <div className="flex items-center gap-1.5 border-b-2 border-slate-700/80 pb-2.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'pengertian', label: 'Pengertian' },
              { id: 'fungsi', label: 'Fungsi Utama' },
              { id: 'cara_kerja', label: 'Cara Kerja' },
              { id: 'ciri', label: 'Ciri-Ciri' },
              { id: 'penerapan', label: 'Penerapan' },
              { id: 'perbedaan', label: 'Perbedaan' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveInfoTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-cyan-400 text-slate-950 border-white shadow-md'
                    : 'bg-[#14203a] text-slate-200 border-slate-700 hover:text-white hover:border-slate-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display with High Contrast Cards */}
          <div className="space-y-4 min-h-[240px]">
            {activeTab === 'pengertian' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-sm text-slate-100 leading-relaxed font-normal">
                  {currentDevice.overview}
                </p>
                {currentDevice.isConcept && (
                  <div className="p-3.5 rounded-xl bg-blue-950 border-2 border-blue-400/50 text-xs text-blue-100 space-y-1.5 shadow-md">
                    <span className="font-extrabold flex items-center gap-1.5 text-cyan-300">
                      <Info className="w-4 h-4 text-cyan-400" /> Catatan Penting Konsep:
                    </span>
                    <p className="leading-relaxed">
                      LAN adalah sistem arsitektur jaringan, bukan perangkat fisik tunggal. Di 3D, LAN ditampilkan sebagai topologi lengkap yang mengintegrasikan PC klien, switch, router, dan server.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'fungsi' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Fungsi Utama Perangkat:
                </span>
                <ul className="space-y-2.5">
                  {currentDevice.functions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 leading-relaxed p-2.5 rounded-xl bg-[#14203a] border border-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'cara_kerja' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Cara Kerja Secara Sederhana:
                </span>
                <div className="p-4 rounded-xl bg-[#14203a] border-2 border-slate-700 text-xs sm:text-sm text-slate-100 leading-relaxed shadow-inner">
                  {currentDevice.howItWorks}
                </div>
              </div>
            )}

            {activeTab === 'ciri' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Karakteristik & Bagian Penting:
                </span>
                <ul className="space-y-2.5">
                  {currentDevice.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 p-2.5 rounded-xl bg-[#14203a] border border-slate-700">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'penerapan' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Penerapan Nyata di Lab / Industri:
                </span>
                <div className="p-4 rounded-xl bg-[#10243d] border-2 border-cyan-400/40 text-xs sm:text-sm text-cyan-100 leading-relaxed shadow-md">
                  {currentDevice.realWorldExample}
                </div>
              </div>
            )}

            {activeTab === 'perbedaan' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Perbedaan dengan Perangkat Mirip:
                </span>
                <div className="p-4 rounded-xl bg-[#2b1f14] border-2 border-amber-500/50 text-xs sm:text-sm text-amber-100 leading-relaxed shadow-md">
                  {currentDevice.comparisonHighlight}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
