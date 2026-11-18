import React, { useState } from 'react';
import { 
  Box, 
  Layers, 
  Network, 
  Columns, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda', icon: Box },
    { id: 'explorer', label: 'Jelajah 3D', icon: Layers },
    { id: 'simulator', label: 'Simulasi Jaringan', icon: Network },
    { id: 'comparison', label: 'Perbandingan', icon: Columns },
    { id: 'quiz', label: 'Kuis Interaktif', icon: HelpCircle },
  ];

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  const handleNavClick = (id) => {
    soundManager.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c1529]/95 backdrop-blur-xl border-b-2 border-cyan-500/30 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Subtitle */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/30 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#070c18] rounded-[10px] flex items-center justify-center">
                <Network className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-wider text-white flex items-center gap-1 drop-shadow">
                  NETWORKING<span className="text-cyan-400">LAB</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-400/50 shadow-sm">
                  SMK PPLG
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-wide font-medium hidden sm:block">
                Media Pembelajaran 3D Jaringan Dasar
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#14203a] p-1.5 rounded-full border border-slate-700/80 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-400/30 scale-105 border border-white/40'
                      : 'text-slate-200 hover:text-white hover:bg-[#1f3056]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools (Sound Toggle & CTA) */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-md ${
                isMuted
                  ? 'bg-[#14203a] text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-400 hover:bg-cyan-900 shadow-cyan-500/20'
              }`}
              title={isMuted ? "Aktifkan Efek Suara Lab" : "Matikan Suara"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#14203a] border-2 border-slate-700 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d162b] border-b-2 border-cyan-500/40 px-4 pt-3 pb-5 space-y-1.5 shadow-2xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 border-white'
                    : 'bg-[#14203a] text-slate-200 border-slate-700/70 hover:bg-[#1e2e50]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
