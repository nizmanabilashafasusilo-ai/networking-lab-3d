import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HubModel({ wireframe = false }) {
  const collisionLedRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (collisionLedRef.current) {
      // Periodic blink simulating packet collisions on shared domain
      const collision = Math.sin(t * 5) > 0.6;
      collisionLedRef.current.material.opacity = collision ? 1 : 0.15;
    }
  });

  const matChassis = {
    color: "#334155",
    metalness: 0.6,
    roughness: 0.4,
    wireframe
  };

  return (
    <group position={[0, -0.15, 0]}>
      {/* Main Hub Box Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.45, 1.4]} />
        <meshStandardMaterial {...matChassis} />
      </mesh>

      {/* Front Face Inset */}
      <mesh position={[0, 0, 0.705]}>
        <planeGeometry args={[2.3, 0.38]} />
        <meshStandardMaterial color="#1e293b" wireframe={wireframe} />
      </mesh>

      {/* Legacy Hub Label Badge */}
      <mesh position={[-0.7, 0.12, 0.71]}>
        <planeGeometry args={[0.7, 0.08]} />
        <meshBasicMaterial color="#475569" />
      </mesh>

      {/* Prominent Collision LED Indicator */}
      <group position={[0.7, 0.1, 0.71]}>
        <mesh ref={collisionLedRef}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#ef4444" transparent />
        </mesh>
        <pointLight position={[0, 0, 0.05]} intensity={0.4} color="#ef4444" distance={0.5} />
      </group>

      {/* Power LED Indicator */}
      <group position={[0.9, 0.1, 0.71]}>
        <mesh>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* 8 RJ45 Ethernet Ports (Single Line) */}
      <group position={[0, -0.06, 0.71]}>
        {Array.from({ length: 8 }).map((_, idx) => {
          const x = -0.8 + idx * 0.23;
          return (
            <group key={idx} position={[x, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.18, 0.15, 0.04]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0, 0.021]}>
                <boxGeometry args={[0.12, 0.09, 0.01]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
              {/* Port Activity Green LED */}
              <mesh position={[0, 0.1, 0.005]}>
                <circleGeometry args={[0.018, 8]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Uplink Push Button */}
      <mesh position={[1.05, -0.06, 0.71]}>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Rear DC Power Input */}
      <mesh position={[0.8, 0, -0.71]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}
