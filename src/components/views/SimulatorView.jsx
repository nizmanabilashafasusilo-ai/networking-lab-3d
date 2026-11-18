import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Monitor, 
  Server, 
  Cpu, 
  Share2, 
  Globe, 
  Cable, 
  ArrowRight,
  Info
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

// Device templates for adding nodes
const DEVICE_TYPES = [
  { type: 'pc', label: 'Komputer (PC)', icon: Monitor, color: '#38bdf8' },
  { type: 'switch', label: 'Switch', icon: Cpu, color: '#00f2fe' },
  { type: 'router', label: 'Router', icon: Share2, color: '#c084fc' },
  { type: 'server', label: 'Server Web/DB', icon: Server, color: '#34d399' },
  { type: 'internet', label: 'Internet Cloud', icon: Globe, color: '#fbbf24' },
];

// Preset Topologies
const PRESETS = {
  standardLab: {
    name: "Topologi Standar Lab (3 PC - Switch - Router - Internet)",
    nodes: [
      { id: 'pc1', type: 'pc', name: 'Komputer 1', ip: '192.168.1.10', x: 80, y: 100 },
      { id: 'pc2', type: 'pc', name: 'Komputer 2', ip: '192.168.1.20', x: 80, y: 220 },
      { id: 'pc3', type: 'pc', name: 'Komputer 3', ip: '192.168.1.30', x: 80, y: 340 },
      { id: 'sw1', type: 'switch', name: 'Switch Inti Lab', ip: 'Layer 2 (CAM)', x: 340, y: 220 },
      { id: 'rt1', type: 'router', name: 'Router Gateway', ip: '192.168.1.1', x: 580, y: 220 },
      { id: 'net1', type: 'internet', name: 'Internet Cloud', ip: 'WAN (Public)', x: 820, y: 220 },
    ],
    links: [
      { id: 'l1', from: 'pc1', to: 'sw1' },
      { id: 'l2', from: 'pc2', to: 'sw1' },
      { id: 'l3', from: 'pc3', to: 'sw1' },
      { id: 'l4', from: 'sw1', to: 'rt1' },
      { id: 'l5', from: 'rt1', to: 'net1' },
    ]
  },
  clientServer: {
    name: "Jaringan Client-Server Lokal (2 PC - Switch - Server)",
    nodes: [
      { id: 'pc1', type: 'pc', name: 'PC Programmer 1', ip: '192.168.10.2', x: 120, y: 140 },
      { id: 'pc2', type: 'pc', name: 'PC Programmer 2', ip: '192.168.10.3', x: 120, y: 300 },
      { id: 'sw1', type: 'switch', name: 'Switch Gigabit', ip: 'Layer 2', x: 420, y: 220 },
      { id: 'srv1', type: 'server', name: 'Local Database Server', ip: '192.168.10.100', x: 720, y: 220 },
    ],
    links: [
      { id: 'l1', from: 'pc1', to: 'sw1' },
      { id: 'l2', from: 'pc2', to: 'sw1' },
      { id: 'l3', from: 'sw1', to: 'srv1' },
    ]
  }
};

export default function SimulatorView() {
  const [nodes, setNodes] = useState(PRESETS.standardLab.nodes);
  const [links, setLinks] = useState(PRESETS.standardLab.links);
  const [selectedNode, setSelectedNode] = useState(null);
  const [cableSource, setCableSource] = useState(null);
  const [sourceNodeId, setSourceNodeId] = useState('pc1');
  const [targetNodeId, setTargetNodeId] = useState('net1');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [activePacketPos, setActivePacketPos] = useState(null);

  const canvasRef = useRef(null);

  // Handle preset loading
  const loadPreset = (presetKey) => {
    soundManager.playClick();
    setIsSimulating(false);
    setActivePacketPos(null);
    setSimulationLogs([]);
    setNodes(PRESETS[presetKey].nodes);
    setLinks(PRESETS[presetKey].links);
    setSourceNodeId(PRESETS[presetKey].nodes[0]?.id || '');
    setTargetNodeId(PRESETS[presetKey].nodes[PRESETS[presetKey].nodes.length - 1]?.id || '');
  };

  // Add new device node
  const handleAddDevice = (type) => {
    soundManager.playClick();
    const count = nodes.filter((n) => n.type === type).length + 1;
    const template = DEVICE_TYPES.find((t) => t.type === type);
    const id = `${type}_${Date.now().toString().slice(-4)}`;
    
    // Position randomly near canvas center
    const newNode = {
      id,
      type,
      name: `${template.label} ${count}`,
      ip: type === 'pc' ? `192.168.1.${30 + count}` : type === 'server' ? '192.168.1.150' : type === 'router' ? '192.168.1.1' : type === 'switch' ? 'Layer 2' : 'WAN Cloud',
      x: 350 + (Math.random() - 0.5) * 200,
      y: 180 + (Math.random() - 0.5) * 150
    };

    setNodes([...nodes, newNode]);
  };

  // Delete node
  const handleDeleteNode = (id) => {
    soundManager.playClick();
    setNodes(nodes.filter((n) => n.id !== id));
    setLinks(links.filter((l) => l.from !== id && l.to !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
    if (cableSource === id) setCableSource(null);
  };

  // Connect cable between two nodes with network connection validation rules
  const handleNodeClick = (node) => {
    if (isSimulating) return;

    if (!cableSource) {
      soundManager.playClick();
      setCableSource(node.id);
      setSelectedNode(node);
    } else {
      if (cableSource === node.id) {
        setCableSource(null);
        return;
      }

      // Check if link already exists
      const exists = links.some(
        (l) => (l.from === cableSource && l.to === node.id) || (l.from === node.id && l.to === cableSource)
      );

      if (exists) {
        soundManager.playWrong();
        alert("Kabel antara kedua perangkat ini sudah terpasang!");
        setCableSource(null);
        return;
      }

      // Logical Validation
      const srcNode = nodes.find((n) => n.id === cableSource);
      const tgtNode = node;

      if ((srcNode.type === 'pc' && tgtNode.type === 'internet') || (srcNode.type === 'internet' && tgtNode.type === 'pc')) {
        soundManager.playWrong();
        alert("Aturan Jaringan: Komputer PC tidak dapat terhubung langsung ke Internet Cloud tanpa Router/Gateway!");
        setCableSource(null);
        return;
      }

      if ((srcNode.type === 'switch' && tgtNode.type === 'internet') || (srcNode.type === 'internet' && tgtNode.type === 'switch')) {
        soundManager.playWrong();
        alert("Aturan Jaringan: Switch Layer 2 tidak memiliki fungsi routing dan tidak dapat terhubung langsung ke Internet tanpa Router!");
        setCableSource(null);
        return;
      }

      // Add valid link
      soundManager.playClick();
      const newLink = {
        id: `link_${Date.now()}`,
        from: cableSource,
        to: node.id
      };
      setLinks([...links, newLink]);
      setCableSource(null);
    }
  };

  // Simple Breadth-First-Search (BFS) Pathfinding across connected graph
  const findPath = (startId, endId) => {
    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === endId) {
        return path;
      }

      // Find neighbors
      const neighbors = [];
      links.forEach((l) => {
        if (l.from === current && !visited.has(l.to)) {
          neighbors.push(l.to);
        } else if (l.to === current && !visited.has(l.from)) {
          neighbors.push(l.from);
        }
      });

      for (const neighbor of neighbors) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
    return null;
  };

  // Run Step-by-Step Packet Transmission Simulation
  const handleRunSimulation = () => {
    if (isSimulating) return;

    if (!sourceNodeId || !targetNodeId) {
      alert("Pilih perangkat asal dan perangkat tujuan pengiriman data!");
      return;
    }

    if (sourceNodeId === targetNodeId) {
      alert("Perangkat asal dan tujuan tidak boleh sama!");
      return;
    }

    const path = findPath(sourceNodeId, targetNodeId);

    if (!path) {
      soundManager.playWrong();
      setSimulationLogs([
        {
          type: 'error',
          text: `Gagal Mengirim Data: Tidak ditemukan jalur kabel yang menghubungkan ${nodes.find(n => n.id === sourceNodeId)?.name} dengan ${nodes.find(n => n.id === targetNodeId)?.name}. Pasang kabel terlebih dahulu!`
        }
      ]);
      return;
    }

    soundManager.playPacketSend();
    setIsSimulating(true);
    setSimulationLogs([]);

    // Generate educational logs per step
    const logs = [];
    const stepCount = path.length;

    path.forEach((nodeId, idx) => {
      const n = nodes.find((node) => node.id === nodeId);
      if (idx === 0) {
        logs.push({
          step: 1,
          node: n.name,
          text: `[Tahap 1: Enkapsulasi Sumber] ${n.name} membungkus payload data menjadi frame Ethernet dengan target IP ${nodes.find(t => t.id === targetNodeId)?.ip}. Data mulai dialirkan melalui kabel UTP.`
        });
      } else if (n.type === 'switch') {
        logs.push({
          step: idx + 1,
          node: n.name,
          text: `[Tahap ${idx + 1}: Layer 2 Switching] ${n.name} menerima frame data, memeriksa tabel CAM (MAC Address Table), dan meneruskan frame secara Unicast khusus ke port tujuan tanpa melakukan broadcast.`
        });
      } else if (n.type === 'router') {
        logs.push({
          step: idx + 1,
          node: n.name,
          text: `[Tahap ${idx + 1}: Layer 3 Routing] ${n.name} membaca paket IP, menjalankan NAT (Network Address Translation), dan mencocokkan rute pada Routing Table untuk keluar ke gateway tujuan.`
        });
      } else if (n.type === 'server') {
        logs.push({
          step: idx + 1,
          node: n.name,
          text: `[Tahap ${idx + 1}: Pemrosesan Server] ${n.name} menerima request, memverifikasi port (HTTP/Database), lalu menghasilkan response (Status 200 OK / Data Payload).`
        });
      } else if (n.type === 'internet') {
        logs.push({
          step: idx + 1,
          node: n.name,
          text: `[Tahap ${idx + 1}: Jaringan Internet WAN] Paket data berhasil mencapai jaringan publik internet luar melalui rute ISP internasional.`
        });
      } else if (idx === stepCount - 1) {
        logs.push({
          step: idx + 1,
          node: n.name,
          text: `[Tahap ${idx + 1}: Data Tiba] ${n.name} berhasil menerima paket data secara utuh tanpa hambatan! Transmisi selesai.`
        });
      }
    });

    // Execute animated path traversal
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < path.length) {
        const currentNode = nodes.find((n) => n.id === path[stepIndex]);
        setActivePacketPos({ x: currentNode.x, y: currentNode.y });
        setSimulationLogs((prev) => [...prev, logs[stepIndex]]);
        soundManager.playPacketHop();
        stepIndex++;
      } else {
        clearInterval(interval);
        soundManager.playCorrect();
        setIsSimulating(false);
      }
    }, 1200);
  };

  const handleReset = () => {
    soundManager.playClick();
    setIsSimulating(false);
    setActivePacketPos(null);
    setSimulationLogs([]);
    setCableSource(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-700/80">
        <div>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Network className="w-4 h-4 text-cyan-400" /> Laboratorium Topologi & Simulasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Simulasi Pengiriman Paket Jaringan
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Rakit perangkat jaringan, hubungkan kabel UTP, dan amati bagaimana paket data berpindah secara real-time.
          </p>
        </div>

        {/* Preset Selectors with High Contrast Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadPreset('standardLab')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#14203a] border-2 border-cyan-400 text-cyan-200 hover:bg-[#1d2f54] transition-all cursor-pointer shadow-md"
          >
            Topologi Lab Komputer
          </button>
          <button
            onClick={() => loadPreset('clientServer')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#14203a] border-2 border-slate-600 text-slate-200 hover:text-white hover:bg-[#1d2f54] hover:border-slate-400 transition-all cursor-pointer shadow-md"
          >
            Topologi Client-Server
          </button>
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#14203a] text-slate-300 border-2 border-slate-700 hover:text-white hover:border-slate-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Toolbox: Add Node & Instructions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#101b34] border-2 border-slate-700/80 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-cyan-400" /> Tambah Node:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {DEVICE_TYPES.map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.type}
                  onClick={() => handleAddDevice(d.type)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#172648] border-2 border-slate-600 hover:border-cyan-400 text-white hover:bg-[#20335e] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Icon className="w-4 h-4" style={{ color: d.color }} />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cable Connection Hint with High Contrast Pill */}
        <div className="text-xs font-semibold text-cyan-200 bg-[#0d162b] px-3.5 py-1.5 rounded-full border-2 border-cyan-500/40 flex items-center gap-2 shadow-inner">
          <Cable className="w-4 h-4 text-cyan-400" />
          <span>
            {cableSource
              ? `Klik perangkat tujuan untuk menghubungkan kabel dari: ${nodes.find(n => n.id === cableSource)?.name}`
              : "Klik 1 perangkat lalu klik perangkat lain untuk memasang kabel UTP"}
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas & Transmission Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-8 cyber-card rounded-2xl p-5 overflow-hidden relative border-2 border-cyan-400/40 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-700/80">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Canvas Jaringan (Area Kerja Virtual)</span>
            </div>
            <div className="text-xs font-bold text-cyan-300 bg-[#121e3a] px-3 py-1 rounded-full border border-slate-700">
              Perangkat: {nodes.length} • Kabel Aktif: {links.length}
            </div>
          </div>

          {/* High Contrast Canvas Surface */}
          <div 
            ref={canvasRef}
            className="w-full h-[460px] sm:h-[500px] bg-[#0c152b] rounded-xl relative overflow-hidden border-2 border-slate-700/80 tech-grid select-none shadow-inner"
          >
            {/* SVG Link Cables with High Visibility Dual Stroke */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {links.map((link) => {
                const src = nodes.find((n) => n.id === link.from);
                const tgt = nodes.find((n) => n.id === link.to);
                if (!src || !tgt) return null;

                return (
                  <g key={link.id}>
                    {/* Dark contrast outline halo */}
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke="#020617"
                      strokeWidth="6"
                    />
                    {/* Glowing Cyan Center Line */}
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke="#00f2fe"
                      strokeWidth="3"
                    />
                    {/* Data Cable Dash */}
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Glowing Traveling Packet (During Simulation) */}
            {activePacketPos && (
              <div
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out pointer-events-none"
                style={{ left: activePacketPos.x, top: activePacketPos.y }}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-cyan-400 animate-ping opacity-80" />
                  <div className="absolute inset-0 w-8 h-8 rounded-full bg-cyan-300 border-2 border-white shadow-xl shadow-cyan-400 flex items-center justify-center">
                    <span className="text-[10px] font-black text-slate-950">IP</span>
                  </div>
                </div>
              </div>
            )}

            {/* Render High-Contrast Device Nodes */}
            {nodes.map((node) => {
              const template = DEVICE_TYPES.find((t) => t.type === node.type) || DEVICE_TYPES[0];
              const Icon = template.icon;
              const isSource = node.id === sourceNodeId;
              const isTarget = node.id === targetNodeId;
              const isCableSelected = node.id === cableSource;

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 shadow-2xl group ${
                    isCableSelected
                      ? 'bg-[#2b1f0d] border-amber-400 scale-110 shadow-amber-400/50 ring-4 ring-amber-400/30'
                      : isSource
                      ? 'bg-[#122852] border-cyan-300 shadow-cyan-400/40 ring-4 ring-cyan-400/30 scale-105'
                      : isTarget
                      ? 'bg-[#0d3326] border-emerald-300 shadow-emerald-400/40 ring-4 ring-emerald-400/30 scale-105'
                      : 'bg-[#131f3b] border-slate-600/90 hover:border-cyan-400 hover:scale-105 hover:bg-[#1a2c54]'
                  }`}
                  style={{ left: node.x, top: node.y }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center border-2 shadow-inner"
                    style={{ backgroundColor: `${template.color}25`, borderColor: template.color }}
                  >
                    <Icon className="w-6 h-6 stroke-[2.2]" style={{ color: template.color }} />
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-black text-white block whitespace-nowrap drop-shadow">
                      {node.name}
                    </span>
                    <span className="text-[10px] text-cyan-200 font-mono font-bold bg-[#0a1122] px-2 py-0.5 rounded border border-slate-700 block mt-0.5">
                      {node.ip}
                    </span>
                  </div>

                  {/* Delete button on hover */}
                  {!isSimulating && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(node.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-full bg-red-600 text-white hover:bg-red-500 transition-opacity shadow-md"
                      title="Hapus Node"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Transmission Control Panel with High Contrast Inputs */}
          <div className="mt-5 pt-4 border-t-2 border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-bold">Sumber:</span>
                <select
                  value={sourceNodeId}
                  onChange={(e) => setSourceNodeId(e.target.value)}
                  disabled={isSimulating}
                  className="bg-[#14203a] border-2 border-slate-600 text-white rounded-xl px-3 py-2 text-xs font-bold focus:border-cyan-400 outline-none shadow-sm"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>{n.name} ({n.ip})</option>
                  ))}
                </select>
              </div>

              <ArrowRight className="w-4 h-4 text-cyan-400 stroke-[3] hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-bold">Tujuan:</span>
                <select
                  value={targetNodeId}
                  onChange={(e) => setTargetNodeId(e.target.value)}
                  disabled={isSimulating}
                  className="bg-[#14203a] border-2 border-slate-600 text-white rounded-xl px-3 py-2 text-xs font-bold focus:border-cyan-400 outline-none shadow-sm"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>{n.name} ({n.ip})</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`px-6 py-3 rounded-xl font-black text-xs tracking-wide flex items-center gap-2 cursor-pointer transition-all shadow-xl ${
                isSimulating
                  ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 border border-white/60'
              }`}
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>{isSimulating ? "Mengirim Data..." : "Kirim Data / Jalankan Simulasi"}</span>
            </button>
          </div>
        </div>

        {/* Live Packet Log Inspector */}
        <div className="lg:col-span-4 cyber-card rounded-2xl p-5 space-y-4 border-2 border-cyan-400/40 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-700/80">
            <span className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" /> Log Perjalanan Paket Data
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#14203a] border border-cyan-500/50 text-cyan-300">
              Live Inspector
            </span>
          </div>

          {/* Log Stream with High Contrast Tiles */}
          <div className="space-y-3 min-h-[360px] max-h-[480px] overflow-y-auto pr-1">
            {simulationLogs.length === 0 ? (
              <div className="text-center py-20 text-slate-300 space-y-3">
                <Network className="w-10 h-10 mx-auto text-cyan-400 animate-pulse-slow" />
                <p className="text-xs font-medium max-w-xs mx-auto">
                  Tekan tombol <span className="text-cyan-300 font-extrabold bg-[#14203a] px-2 py-0.5 rounded border border-cyan-400/40">"Kirim Data"</span> untuk melihat alur enkapsulasi dan perjalanan paket antar-node secara nyata.
                </p>
              </div>
            ) : (
              simulationLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl text-xs leading-relaxed border-2 space-y-1.5 animate-in slide-in-from-right duration-300 shadow-md ${
                    log.type === 'error'
                      ? 'bg-red-950 border-red-500 text-red-100'
                      : 'bg-[#14203a] border-cyan-400/60 text-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-cyan-300">
                    <span className="bg-[#0b1324] px-2 py-0.5 rounded border border-slate-700">{log.node || "Status Jaringan"}</span>
                    <span className="text-cyan-400 font-mono font-bold">Tahap {log.step || idx + 1}</span>
                  </div>
                  <p className="text-slate-100 font-normal">{log.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
