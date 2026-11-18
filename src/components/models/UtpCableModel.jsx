import React from 'react';
import * as THREE from 'three';

export default function UtpCableModel({ wireframe = false }) {
  // 4 Twisted Pairs with official color coding
  const pairs = [
    { color1: "#ea580c", color2: "#fed7aa", angle: 0, label: "Orange Pair" },
    { color1: "#16a34a", color2: "#bbf7d0", angle: Math.PI / 2, label: "Green Pair" },
    { color1: "#2563eb", color2: "#bfdbfe", angle: Math.PI, label: "Blue Pair" },
    { color1: "#854d0e", color2: "#fef08a", angle: Math.PI * 1.5, label: "Brown Pair" }
  ];

  return (
    <group position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      {/* Outer Blue PVC Jacket (Main unstripped cable section) */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 1.6, 32]} />
        <meshStandardMaterial color="#0284c7" metalness={0.2} roughness={0.5} wireframe={wireframe} />
      </mesh>

      {/* Cable Printing / Cat6 Spec Text Strip */}
      <mesh position={[0, -0.8, 0.352]}>
        <planeGeometry args={[0.08, 1.2]} />
        <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>

      {/* Internal Center Spline / Divider (Cat6 plastic cross separator) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" opacity={0.8} transparent />
      </mesh>

      {/* Rip Cord (Nylon string) */}
      <mesh position={[0.2, 0.2, 0.1]} rotation={[0.2, 0.4, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>

      {/* 4 Twisted Pairs (Spreading and spiraling out) */}
      {pairs.map((pair, idx) => {
        const radius = 0.22;
        const x = Math.cos(pair.angle) * radius;
        const z = Math.sin(pair.angle) * radius;

        return (
          <group key={idx} position={[x, 0.35, z]}>
            {/* Wire 1 (Solid Color) */}
            <mesh position={[-0.04, 0.3, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.9, 16]} />
              <meshStandardMaterial color={pair.color1} roughness={0.3} wireframe={wireframe} />
            </mesh>
            {/* Bare Copper Core 1 */}
            <mesh position={[-0.04, 0.8, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.15, 12]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Wire 2 (Striped / Light Color) */}
            <mesh position={[0.04, 0.3, 0.02]}>
              <cylinderGeometry args={[0.035, 0.035, 0.9, 16]} />
              <meshStandardMaterial color={pair.color2} roughness={0.3} wireframe={wireframe} />
            </mesh>
            {/* Bare Copper Core 2 */}
            <mesh position={[0.04, 0.8, 0.02]}>
              <cylinderGeometry args={[0.018, 0.018, 0.15, 12]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
