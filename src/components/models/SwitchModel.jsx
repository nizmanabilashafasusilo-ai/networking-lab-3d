import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SwitchModel({ wireframe = false }) {
  const ledsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ledsRef.current) {
      ledsRef.current.children.forEach((led, i) => {
        // Subtle random-like flickering for data activity
        const flicker = Math.sin(t * 8 + i * 1.7) > 0.1;
        led.material.opacity = flicker ? 1 : 0.25;
      });
    }
  });

  const matChassis = {
    color: "#2a3b59", // Rich metallic steel slate
    metalness: 0.85,
    roughness: 0.3,
    wireframe
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 1U Rackmount Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.45, 1.8]} />
        <meshStandardMaterial {...matChassis} />
      </mesh>

      {/* Rack Ears (Left & Right Flanges with bolt holes) */}
      {[-1.8, 1.8].map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.45, 0.4]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} wireframe={wireframe} />
          </mesh>
          {/* Bolt holes */}
          {[-0.12, 0.12].map((y, hIdx) => (
            <mesh key={hIdx} position={[idx === 0 ? -0.05 : 0.05, y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.12, 12]} />
              <meshBasicMaterial color="#141f36" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Front Face Plate */}
      <mesh position={[0, 0, 0.905]}>
        <planeGeometry args={[3.38, 0.43]} />
        <meshStandardMaterial color="#18243b" roughness={0.5} wireframe={wireframe} />
      </mesh>

      {/* Blue Brand & Status Stripe */}
      <mesh position={[0, 0.16, 0.91]}>
        <planeGeometry args={[3.3, 0.04]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>

      {/* System Status LEDs (Left Side) */}
      {[-1.5, -1.4, -1.3, -1.2].map((x, i) => (
        <group key={i} position={[x, 0.08, 0.915]}>
          <mesh>
            <circleGeometry args={[0.02, 12]} />
            <meshBasicMaterial color={i === 2 ? "#f59e0b" : "#10b981"} />
          </mesh>
        </group>
      ))}

      {/* 24 RJ45 Ports (2 rows of 12 ports) */}
      <group position={[-0.3, -0.04, 0.91]}>
        {Array.from({ length: 12 }).map((_, col) => {
          const x = -1.0 + col * 0.18;
          return (
            <group key={col} position={[x, 0, 0]}>
              {/* Upper Port */}
              <group position={[0, 0.08, 0]}>
                <mesh>
                  <boxGeometry args={[0.14, 0.11, 0.04]} />
                  <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
                </mesh>
                <mesh position={[0, 0, 0.021]}>
                  <boxGeometry args={[0.1, 0.07, 0.01]} />
                  <meshBasicMaterial color="#0f172a" />
                </mesh>
              </group>
              {/* Lower Port */}
              <group position={[0, -0.08, 0]}>
                <mesh>
                  <boxGeometry args={[0.14, 0.11, 0.04]} />
                  <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
                </mesh>
                <mesh position={[0, 0, 0.021]}>
                  <boxGeometry args={[0.1, 0.07, 0.01]} />
                  <meshBasicMaterial color="#0f172a" />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>

      {/* Port Activity LEDs (Above ports) */}
      <group ref={ledsRef} position={[-0.3, 0.1, 0.915]}>
        {Array.from({ length: 12 }).map((_, col) => {
          const x = -1.0 + col * 0.18;
          return (
            <mesh key={col} position={[x, 0, 0]}>
              <circleGeometry args={[0.015, 8]} />
              <meshBasicMaterial color="#10b981" transparent />
            </mesh>
          );
        })}
      </group>

      {/* 2 SFP+ 10G Fiber Uplink Ports (Far Right) */}
      {[1.25, 1.45].map((x, sIdx) => (
        <group key={sIdx} position={[x, -0.04, 0.91]}>
          <mesh>
            <boxGeometry args={[0.15, 0.22, 0.06]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
          </mesh>
          <mesh position={[0, 0, 0.031]}>
            <boxGeometry args={[0.11, 0.16, 0.01]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
        </group>
      ))}

      {/* Console Port (RJ45 Light Blue) */}
      <group position={[0.95, -0.04, 0.91]}>
        <mesh>
          <boxGeometry args={[0.14, 0.11, 0.04]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0, 0.021]}>
          <boxGeometry args={[0.1, 0.07, 0.01]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Ventilation Grilles on Top */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.23, 0]}>
          <boxGeometry args={[0.2, 0.01, 1.2]} />
          <meshStandardMaterial color="#141f36" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
