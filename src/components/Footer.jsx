import React from 'react';
import { Network, Sparkles, GraduationCap, Code2 } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#080e1c] border-t-2 border-cyan-500/30 pt-12 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/25 border-2 border-cyan-400 flex items-center justify-center shadow-md">
                <Network className="w-5 h-5 text-cyan-300 stroke-[2.5]" />
              </div>
              <span className="font-black text-xl text-white tracking-wider">
                NETWORKING<span className="text-cyan-400">LAB</span>
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed max-w-md font-normal">
              Platform pembelajaran interaktif 3D materi Jaringan Komputer Dasar untuk siswa Kelas X SMK jurusan Pengembangan Perangkat Lunak dan Gim (PPLG). Belajar konsep hardware, topologi, dan logika routing melalui visualisasi modern.
            </p>
            <div className="flex items-center gap-3 text-xs text-cyan-300">
              <span className="inline-flex items-center gap-1.5 bg-[#122344] px-3 py-1 rounded-full border border-cyan-400/50 font-bold shadow-sm">
                <GraduationCap className="w-4 h-4 text-cyan-400" /> Kurikulum Merdeka
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#17203d] px-3 py-1 rounded-full border border-blue-400/50 text-blue-200 font-bold shadow-sm">
                <Code2 className="w-4 h-4 text-blue-400" /> PPLG / RPL Dasar
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-3.5 tracking-wider uppercase">Navigasi Pembelajaran</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Beranda Laboratorium
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Jelajah 10 Perangkat 3D
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('simulator')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Simulasi Pengiriman Paket
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('comparison')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Matriks Perbandingan Perangkat
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Evaluasi Kuis Interaktif
                </button>
              </li>
            </ul>
          </div>

          {/* Target Materi */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-3.5 tracking-wider uppercase">Fokus Kompetensi</h4>
            <ul className="space-y-2 text-xs text-slate-200 font-medium">
              <li>• Identifikasi Fisik & Hotspot Komponen</li>
              <li>• Pemahaman OSI Layer 1, 2, & 3</li>
              <li>• Perbedaan MAC Address vs IP Address</li>
              <li>• Alur Enkapsulasi Paket Frame LAN</li>
              <li>• Perakitan Kabel UTP & Konektor RJ45</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t-2 border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-300">
          <p>© 2026 NETWORKING LAB — Media Pembelajaran Interaktif Siswa SMK PPLG.</p>
          <p className="flex items-center gap-1.5 text-slate-300">
            Dibuat untuk Laboratorium Komputer & Jaringan Dasar SMK
          </p>
        </div>
      </div>
    </footer>
  );
}
