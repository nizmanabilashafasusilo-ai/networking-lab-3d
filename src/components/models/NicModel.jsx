import React from 'react';
import * as THREE from 'three';

export default function NicModel({ wireframe = false }) {
  const matPcb = {
    color: "#064e3b", // High-tech forest green PCB
    metalness: 0.3,
    roughness: 0.6,
    wireframe
  };

  return (
    <group position={[-0.4, 0, 0]} rotation={[0, -0.4, 0]}>
      {/* Main PCB Board */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.3, 0.04]} />
        <meshStandardMaterial {...matPcb} />
      </mesh>

      {/* Golden PCIe Bus Fingers (Bottom Edge) */}
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[1.5, 0.16, 0.042]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Golden teeth lines */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={i} position={[-0.68 + i * 0.08, -0.72, 0.023]}>
          <planeGeometry args={[0.04, 0.14]} />
          <meshBasicMaterial color="#d97706" />
        </mesh>
      ))}

      {/* Main Ethernet Controller IC (Chipset) */}
      <group position={[-0.3, 0.1, 0.05]}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.06]} />
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Chip Heatsink fins */}
        {[-0.15, 0, 0.15].map((hx, hIdx) => (
          <mesh key={hIdx} position={[hx, 0, 0.04]}>
            <boxGeometry args={[0.08, 0.45, 0.04]} />
            <meshStandardMaterial color="#475569" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Crystal Oscillator (Silver Oval Component) */}
      <mesh position={[0.2, 0.3, 0.04]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </mesh>

      {/* SMD Capacitors & Transformers */}
      <group position={[0.5, -0.1, 0.05]}>
        <mesh>
          <boxGeometry args={[0.4, 0.3, 0.12]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Metal Mounting Bracket (Right side) */}
      <group position={[1.22, 0, 0]}>
        {/* Vertical Face Plate */}
        <mesh>
          <boxGeometry args={[0.04, 2.2, 0.35]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Top Screw Flange */}
        <mesh position={[0, 1.1, 0.1]}>
          <boxGeometry args={[0.04, 0.04, 0.25]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} />
        </mesh>
        {/* Metal Shielded RJ45 Socket */}
        <group position={[-0.15, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.25, 0.28]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          {/* Socket Hole */}
          <mesh position={[0.155, 0, 0]}>
            <boxGeometry args={[0.01, 0.16, 0.2]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          {/* Link / Activity LEDs */}
          <mesh position={[0.155, 0.09, 0.08]}>
            <circleGeometry args={[0.015, 8]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <mesh position={[0.155, 0.09, -0.08]}>
            <circleGeometry args={[0.015, 8]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
