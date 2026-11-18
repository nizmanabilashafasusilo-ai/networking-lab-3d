import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Import all 10 device models
import LanModel from './LanModel';
import ModemModel from './ModemModel';
import RouterModel from './RouterModel';
import SwitchModel from './SwitchModel';
import HubModel from './HubModel';
import AccessPointModel from './AccessPointModel';
import NicModel from './NicModel';
import UtpCableModel from './UtpCableModel';
import Rj45Model from './Rj45Model';
import ServerModel from './ServerModel';
import { soundManager } from '../../utils/audio';

function ModelSwitch({ deviceId, wireframe, activeHotspot }) {
  switch (deviceId) {
    case 'lan':
      return <LanModel wireframe={wireframe} activeHotspot={activeHotspot} />;
    case 'modem':
      return <ModemModel wireframe={wireframe} />;
    case 'router':
      return <RouterModel wireframe={wireframe} />;
    case 'switch':
      return <SwitchModel wireframe={wireframe} />;
    case 'hub':
      return <HubModel wireframe={wireframe} />;
    case 'access_point':
      return <AccessPointModel wireframe={wireframe} />;
    case 'nic':
      return <NicModel wireframe={wireframe} />;
    case 'kabel_utp':
      return <UtpCableModel wireframe={wireframe} />;
    case 'rj45':
      return <Rj45Model wireframe={wireframe} />;
    case 'server':
      return <ServerModel wireframe={wireframe} />;
    default:
      return <RouterModel wireframe={wireframe} />;
  }
}

// High-contrast interactive Hotspot Marker
function HotspotMarker({ hotspot, isActive, onSelect }) {
  return (
    <group position={hotspot.position}>
      {/* 3D Pulse sphere */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={isActive ? "#00f2fe" : "#38bdf8"} />
      </mesh>
      {/* Outer pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.09, 0.12, 16]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML interactive tag billboard */}
      <Html distanceFactor={8} position={[0, 0.14, 0]} center>
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playClick();
            onSelect(hotspot);
          }}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-xl cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-cyan-400 text-slate-950 border-2 border-white scale-110 shadow-cyan-400/80 ring-2 ring-cyan-400'
              : 'bg-navy-900/95 text-cyan-200 border-2 border-cyan-400/70 hover:bg-cyan-950 hover:border-cyan-300 hover:scale-105 shadow-black/80'
          }`}
          title={hotspot.desc}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-navy-950' : 'bg-cyan-400 animate-ping'}`} />
          <span className="drop-shadow">{hotspot.title}</span>
        </button>
      </Html>
    </group>
  );
}

// Studio Lighting & Pedestal Stage for High Object Contrast
function StudioEnvironment({ deviceId }) {
  return (
    <>
      {/* Soft Ambient Light so shadows never disappear into black */}
      <ambientLight intensity={1.1} />

      {/* Key Directional Light with Warm White */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cyan Fill Light from Front-Left */}
      <directionalLight position={[-6, 5, 4]} intensity={1.0} color="#38bdf8" />

      {/* High-Contrast Rim Light from Back to outline object edges against dark background */}
      <directionalLight position={[0, 6, -6]} intensity={1.8} color="#00f2fe" />

      {/* Upward Subtle Fill */}
      <pointLight position={[0, -2, 2]} intensity={0.8} color="#0284c7" distance={8} />

      {/* Studio Pedestal Disc (Only shown for standalone devices, LAN has its own custom grid) */}
      {deviceId !== 'lan' && (
        <group position={[0, -1.3, 0]}>
          {/* Main Pedestal Disc */}
          <mesh receiveShadow position={[0, -0.05, 0]}>
            <cylinderGeometry args={[2.6, 2.8, 0.1, 48]} />
            <meshStandardMaterial color="#141f38" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Glowing Neon Edge Ring */}
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.45, 2.58, 48]} />
            <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
          {/* Inner Studio Floor Ring */}
          <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 1.55, 36]} />
            <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* Shadow Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.36, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.45} />
      </mesh>
    </>
  );
}

export default function DeviceScene({
  deviceId = 'router',
  wireframe = false,
  autoRotate = false,
  showHotspots = true,
  hotspots = [],
  activeHotspot = null,
  onSelectHotspot = () => {},
  enableFloat = true
}) {
  const controlsRef = useRef();

  return (
    <div className="relative w-full h-full min-h-[440px] bg-gradient-to-b from-[#0f1b36] via-[#091224] to-[#060a16] rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl shadow-black/80">
      {/* High-Contrast Radial Spotlight Backdrop behind 3D Object */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(6, 182, 212, 0.18) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%)'
        }}
      />

      {/* Grid Floor Overlay with clear contrast */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-60" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2.2, 4.8], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <StudioEnvironment deviceId={deviceId} />

          {/* Model with optional gentle floating */}
          {enableFloat ? (
            <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
              <ModelSwitch deviceId={deviceId} wireframe={wireframe} activeHotspot={activeHotspot} />
              {showHotspots &&
                hotspots.map((h) => (
                  <HotspotMarker
                    key={h.id}
                    hotspot={h}
                    isActive={activeHotspot?.id === h.id}
                    onSelect={onSelectHotspot}
                  />
                ))}
            </Float>
          ) : (
            <>
              <ModelSwitch deviceId={deviceId} wireframe={wireframe} activeHotspot={activeHotspot} />
              {showHotspots &&
                hotspots.map((h) => (
                  <HotspotMarker
                    key={h.id}
                    hotspot={h}
                    isActive={activeHotspot?.id === h.id}
                    onSelect={onSelectHotspot}
                  />
                ))}
            </>
          )}

          {/* Camera Controls */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={1.8}
            maxDistance={11}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            maxPolarAngle={Math.PI / 2 + 0.08}
          />
        </Suspense>
      </Canvas>

      {/* High-Contrast On-screen 3D Navigation Guide Pill */}
      <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 text-xs font-semibold text-slate-200 bg-navy-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/50 shadow-lg shadow-black/60">
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        <span>Tarik Mouse / Sentuh: Putar 360° • Scroll: Zoom In/Out</span>
      </div>
    </div>
  );
}
