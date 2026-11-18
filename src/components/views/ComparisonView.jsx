import React, { useState } from 'react';
import { 
  Columns, 
  ArrowLeftRight, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Lightbulb, 
  Share2, 
  Server, 
  Radio, 
  Wifi, 
  Cpu
} from 'lucide-react';
import { comparisonData } from '../../data/comparisonData';
import { soundManager } from '../../utils/audio';

export default function ComparisonView() {
  const [selectedCompId, setSelectedCompId] = useState(comparisonData[0].id);

  const currentComp = comparisonData.find((c) => c.id === selectedCompId) || comparisonData[0];

  const handleSelectComp = (id) => {
    soundManager.playClick();
    setSelectedCompId(id);
  };

  const getDeviceIcon = (iconName) => {
    switch (iconName) {
      case 'Radio': return Radio;
      case 'Share2': return Share2;
      case 'Server': return Server;
      case 'Layers': return Layers;
      case 'Wifi': return Wifi;
      case 'Cpu': return Cpu;
      default: return Server;
    }
  };

  const IconA = getDeviceIcon(currentComp.deviceA.icon);
  const IconB = getDeviceIcon(currentComp.deviceB.icon);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#101e38] border-2 border-cyan-400/50 shadow-md">
          <Columns className="w-4 h-4 text-cyan-400" /> Matriks Komparasi Hardware
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Perbandingan Perangkat Jaringan Mirip
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          Pahami perbedaan mendasar antara pasangan perangkat yang sering membingungkan siswa baru kelas X SMK PPLG.
        </p>
      </div>

      {/* Comparison Selector Tabs with Solid High Contrast Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {comparisonData.map((comp) => {
          const isSelected = comp.id === selectedCompId;
          return (
            <button
              key={comp.id}
              onClick={() => handleSelectComp(comp.id)}
              className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 shadow-lg ${
                isSelected
                  ? 'bg-gradient-to-b from-[#172d56] to-[#122244] border-cyan-400 text-cyan-200 shadow-cyan-400/25 scale-102 ring-2 ring-cyan-400/50'
                  : 'bg-[#121c35] border-slate-700 text-slate-300 hover:text-white hover:bg-[#1a2b52] hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-white">
                <span>{comp.deviceA.name}</span>
                <span className="text-cyan-400 font-black text-[10px] bg-[#0c1629] px-2 py-0.5 rounded border border-cyan-500/40">VS</span>
                <span>{comp.deviceB.name}</span>
              </div>
              <span className="text-[11px] text-slate-300 line-clamp-1 font-medium">
                {comp.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Comparison Showcase */}
      <div className="cyber-card rounded-3xl p-6 sm:p-8 space-y-8 border-2 border-cyan-400/40 shadow-2xl">
        
        {/* Head-to-Head Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative">
          
          {/* Device A */}
          <div className="p-6 rounded-2xl bg-[#10243d] border-2 border-cyan-400 space-y-3 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400/70 uppercase tracking-wider shadow-sm">
                {currentComp.deviceA.layer}
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/25 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md">
                <IconA className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">{currentComp.deviceA.name}</h3>
              <p className="text-xs text-cyan-300 font-bold mt-0.5">{currentComp.deviceA.role}</p>
            </div>
          </div>

          {/* VS Center Pill */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0c152a] border-2 border-white items-center justify-center text-xs font-black text-cyan-300 shadow-2xl shadow-cyan-400/60 ring-4 ring-cyan-400">
            VS
          </div>

          {/* Device B */}
          <div className="p-6 rounded-2xl bg-[#1e1c3b] border-2 border-indigo-400 space-y-3 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-400/70 uppercase tracking-wider shadow-sm">
                {currentComp.deviceB.layer}
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/25 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 shadow-md">
                <IconB className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">{currentComp.deviceB.name}</h3>
              <p className="text-xs text-indigo-300 font-bold mt-0.5">{currentComp.deviceB.role}</p>
            </div>
          </div>

        </div>

        {/* Executive Summary with High Contrast Card */}
        <div className="p-5 rounded-2xl bg-[#121d38] border-2 border-slate-700 text-xs sm:text-sm text-slate-100 leading-relaxed shadow-lg">
          <span className="text-cyan-300 font-extrabold block mb-1.5 text-xs uppercase tracking-wider">
            Ringkasan Konseptual:
          </span>
          {currentComp.summary}
        </div>

        {/* Detailed Comparison Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white tracking-wide uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> Matriks Perbandingan Detail
          </h4>

          <div className="overflow-x-auto rounded-2xl border-2 border-slate-700 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#152549] text-white border-b-2 border-slate-700 uppercase text-[11px] tracking-wider font-extrabold">
                <tr>
                  <th className="py-3.5 px-5 font-black w-1/4">Parameter / Kriteria</th>
                  <th className="py-3.5 px-5 font-black text-cyan-300 w-3/8 bg-[#10243d] border-l-2 border-slate-700">{currentComp.deviceA.name}</th>
                  <th className="py-3.5 px-5 font-black text-indigo-300 w-3/8 bg-[#1e1c3b] border-l-2 border-slate-700">{currentComp.deviceB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-700/80">
                {currentComp.metrics.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-[#0e172e]" : "bg-[#131f3b]"}>
                    <td className="py-4 px-5 font-black text-white">
                      <div>{row.criterion}</div>
                      <span className="text-[10px] text-cyan-300 font-semibold bg-[#1c2c50] px-2 py-0.5 rounded border border-slate-600 inline-block mt-1">
                        {row.badge}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-100 leading-relaxed font-medium border-l-2 border-slate-700/80">{row.devA}</td>
                    <td className="py-4 px-5 text-slate-100 leading-relaxed font-medium border-l-2 border-slate-700/80">{row.devB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analogy Box */}
        <div className="p-5 rounded-2xl bg-[#172744] border-2 border-cyan-400/60 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
            <Lightbulb className="w-5 h-5 text-amber-400 stroke-[2.5]" /> Analogi Dunia Nyata (Biar Gampang Ingat):
          </div>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
            {currentComp.analogy}
          </p>
        </div>

        {/* Student Takeaway */}
        <div className="p-5 rounded-2xl bg-[#0f2d22] border-2 border-emerald-400/70 text-xs sm:text-sm text-emerald-100 leading-relaxed shadow-xl">
          <span className="font-black text-emerald-300 block mb-1 text-xs uppercase tracking-wider">
            Kesimpulan Praktikum Lab SMK:
          </span>
          <span className="font-medium">{currentComp.takeaway}</span>
        </div>

      </div>
    </div>
  );
}
