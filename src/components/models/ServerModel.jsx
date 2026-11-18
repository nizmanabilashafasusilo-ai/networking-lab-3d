import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ServerModel({ wireframe = false }) {
  const driveLedsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (driveLedsRef.current) {
      driveLedsRef.current.children.forEach((led, i) => {
        const blink = Math.sin(t * 10 + i * 2.3) > 0.2;
        led.material.opacity = blink ? 1 : 0.25;
      });
    }
  });

  const matChassis = {
    color: "#22324f", // Rich graphite server steel
    metalness: 0.85,
    roughness: 0.25,
    wireframe
  };

  return (
    <group position={[0, -0.1, 0]}>
      {/* 2U Rackmount Server Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.9, 2.4]} />
        <meshStandardMaterial {...matChassis} />
      </mesh>

      {/* Rack Handles on Left & Right */}
      {[-1.65, 1.65].map((x, hIdx) => (
        <group key={hIdx} position={[x, 0, 1.1]}>
          {/* Mounting Bracket Ear */}
          <mesh>
            <boxGeometry args={[0.1, 0.88, 0.2]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} wireframe={wireframe} />
          </mesh>
          {/* Tubular Handle */}
          <mesh position={[0, 0, 0.15]}>
            <boxGeometry args={[0.06, 0.7, 0.06]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.98} />
          </mesh>
        </group>
      ))}

      {/* Front Face Plate */}
      <mesh position={[0, 0, 1.205]}>
        <planeGeometry args={[3.15, 0.86]} />
        <meshStandardMaterial color="#162238" roughness={0.4} wireframe={wireframe} />
      </mesh>

      {/* 8 Hot-Swap 3.5" Drive Bays (2 rows of 4 bays on the left) */}
      <group position={[-0.6, 0, 1.21]}>
        {[0, 1].map((row) => (
          <group key={row} position={[0, row === 0 ? 0.2 : -0.2, 0]}>
            {[0, 1, 2, 3].map((col) => {
              const x = -0.9 + col * 0.46;
              return (
                <group key={col} position={[x, 0, 0]}>
                  {/* Caddy Tray Frame */}
                  <mesh>
                    <boxGeometry args={[0.42, 0.35, 0.04]} />
                    <meshStandardMaterial color="#2a3d5f" metalness={0.8} />
                  </mesh>
                  {/* Release Latch Lever */}
                  <mesh position={[0, -0.12, 0.025]}>
                    <boxGeometry args={[0.38, 0.06, 0.02]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.9} />
                  </mesh>
                  {/* Drive Ventilation Slots */}
                  <mesh position={[0, 0.05, 0.025]}>
                    <boxGeometry args={[0.36, 0.15, 0.01]} />
                    <meshStandardMaterial color="#0f172a" />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>

      {/* Blinking Drive Activity LEDs */}
      <group ref={driveLedsRef} position={[-0.6, 0, 1.23]}>
        {[0, 1].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const x = -0.9 + col * 0.46;
            const y = (row === 0 ? 0.2 : -0.2) + 0.12;
            return (
              <mesh key={`${row}-${col}`} position={[x, y, 0]}>
                <circleGeometry args={[0.02, 8]} />
                <meshBasicMaterial color="#10b981" transparent />
              </mesh>
            );
          })
        )}
      </group>

      {/* Right Front: Honeycomb Air Grille Ventilation */}
      <group position={[0.9, 0.05, 1.21]}>
        <mesh>
          <planeGeometry args={[0.9, 0.65]} />
          <meshStandardMaterial color="#243450" wireframe={wireframe} />
        </mesh>
        {/* Air intake slots */}
        {[-0.2, 0, 0.2].map((y, yi) => (
          <mesh key={yi} position={[0, y, 0.01]}>
            <planeGeometry args={[0.8, 0.12]} />
            <meshBasicMaterial color="#0b1324" />
          </mesh>
        ))}
      </group>

      {/* Right Front: Control Panel (Power button, UID button, Status LEDs) */}
      <group position={[1.4, 0.1, 1.215]}>
        {/* Power Button */}
        <mesh position={[0, 0.2, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>
        {/* UID Blue Locator LED */}
        <mesh position={[0, 0.08, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Front USB Port */}
        <mesh position={[0, -0.15, 0]}>
          <planeGeometry args={[0.08, 0.15]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Rear: Dual Redundant Power Supplies (PSU 1 & PSU 2) */}
      <group position={[0.9, 0, -1.205]}>
        {[-0.25, 0.25].map((x, pIdx) => (
          <group key={pIdx} position={[x, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.42, 0.7, 0.05]} />
              <meshStandardMaterial color="#475569" metalness={0.9} />
            </mesh>
            {/* PSU Handle */}
            <mesh position={[0, 0.2, -0.06]}>
              <boxGeometry args={[0.3, 0.08, 0.08]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* IEC C14 Power Socket */}
            <mesh position={[0, -0.15, -0.04]}>
              <boxGeometry args={[0.2, 0.15, 0.03]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
