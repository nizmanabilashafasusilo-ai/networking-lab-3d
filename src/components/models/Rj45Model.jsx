import React from 'react';
import * as THREE from 'three';

export default function Rj45Model({ wireframe = false }) {
  const matClearPlastic = {
    color: "#e0f2fe",
    metalness: 0.1,
    roughness: 0.1,
    transparent: true,
    opacity: 0.55,
    wireframe
  };

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -0.3, 0]}>
      {/* Main Transparent Polycarbonate Housing Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.9, 1.8]} />
        <meshPhysicalMaterial {...matClearPlastic} transmission={0.7} thickness={0.5} />
      </mesh>

      {/* Front Stepped Nose */}
      <mesh position={[0, -0.1, 0.95]}>
        <boxGeometry args={[1.18, 0.65, 0.2]} />
        <meshPhysicalMaterial {...matClearPlastic} transmission={0.7} thickness={0.5} />
      </mesh>

      {/* Flexible Plastic Locking Latch (Clip on Top) */}
      <group position={[0, 0.5, -0.2]} rotation={[-0.3, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.08, 1.3]} />
          <meshPhysicalMaterial {...matClearPlastic} transmission={0.6} />
        </mesh>
        {/* Latch Barb Tabs */}
        <mesh position={[0, 0.06, 0.5]}>
          <boxGeometry args={[0.5, 0.1, 0.15]} />
          <meshPhysicalMaterial {...matClearPlastic} />
        </mesh>
      </group>

      {/* 8 Gold-Plated Pin Contact Blades (Front Top) */}
      <group position={[0, 0.28, 0.7]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const x = -0.42 + i * 0.12;
          return (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.04, 0.18, 0.35]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.98} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* 8 Internal Wire Guide Channels with standard T568B color codes */}
      <group position={[0, -0.1, 0]}>
        {[
          "#fed7aa", // White-Orange
          "#ea580c", // Orange
          "#bbf7d0", // White-Green
          "#2563eb", // Blue
          "#bfdbfe", // White-Blue
          "#16a34a", // Green
          "#fef08a", // White-Brown
          "#854d0e"  // Brown
        ].map((col, idx) => {
          const x = -0.42 + idx * 0.12;
          return (
            <mesh key={idx} position={[x, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color={col} roughness={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* Cable Jacket Clamp (Strain Relief Wedge inside rear cavity) */}
      <mesh position={[0, -0.1, -0.7]}>
        <boxGeometry args={[0.9, 0.45, 0.3]} />
        <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
