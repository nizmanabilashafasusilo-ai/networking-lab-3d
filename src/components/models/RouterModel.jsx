import React from 'react';
import * as THREE from 'three';

export default function RouterModel({ wireframe = false }) {
  const matChassis = {
    color: "#1e293b",
    metalness: 0.8,
    roughness: 0.25,
    wireframe
  };

  return (
    <group position={[0, -0.2, 0]}>
      {/* Main Angular Chassis */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.4, 1.6]} />
        <meshStandardMaterial {...matChassis} />
      </mesh>

      {/* Futuristic Faceted Top Cover */}
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[2.3, 0.08, 1.4]} />
        <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} wireframe={wireframe} />
      </mesh>

      {/* Center Cyan Cyber Stripe */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.08, 0.02, 1.2]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>

      {/* Front Glowing LED Light Bar */}
      <mesh position={[0, 0.02, 0.81]}>
        <boxGeometry args={[1.6, 0.04, 0.02]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>
      <pointLight position={[0, 0.02, 0.9]} intensity={0.8} color="#00f2fe" distance={1.4} />

      {/* Front LED Status Icons */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, idx) => (
        <mesh key={idx} position={[x, 0.08, 0.81]}>
          <planeGeometry args={[0.05, 0.05]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}

      {/* Rear Panel (Ports) */}
      <mesh position={[0, 0, -0.805]}>
        <planeGeometry args={[2.4, 0.36]} />
        <meshStandardMaterial color="#1a2538" wireframe={wireframe} />
      </mesh>

      {/* WAN Port (Dedicated Gigabit Blue Port) */}
      <group position={[-0.8, 0, -0.82]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.26, 0.22, 0.08]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.18, 0.14, 0.02]} />
          <meshBasicMaterial color="#0a0f1d" />
        </mesh>
      </group>

      {/* 4 LAN Ports (Gigabit Yellow Ports) */}
      {[-0.35, -0.05, 0.25, 0.55].map((x, idx) => (
        <group key={idx} position={[x, 0, -0.82]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.24, 0.2, 0.08]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.18, 0.14, 0.02]} />
            <meshBasicMaterial color="#0a0f1d" />
          </mesh>
        </group>
      ))}

      {/* USB 3.0 Port (Blue slot) */}
      <mesh position={[0.85, 0.02, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.16, 0.08, 0.08]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>

      {/* Power Jack & Power Button */}
      <mesh position={[1.05, 0, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* 4 High Performance Antennas (Corner & Side Mounts) */}
      {[
        { pos: [-1.2, 0.15, -0.6], rot: [-0.3, 0.2, -0.3] },
        { pos: [1.2, 0.15, -0.6], rot: [-0.3, -0.2, 0.3] },
        { pos: [-1.2, 0.15, 0.4], rot: [0.2, 0.2, -0.3] },
        { pos: [1.2, 0.15, 0.4], rot: [0.2, -0.2, 0.3] },
      ].map((ant, idx) => (
        <group key={idx} position={ant.pos}>
          {/* Base Joint */}
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.12, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          {/* Blade Shaped Antenna */}
          <group position={[0, 0.08, 0]} rotation={ant.rot}>
            <mesh position={[0, 0.8, 0]} castShadow>
              <boxGeometry args={[0.06, 1.5, 0.12]} />
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.3} wireframe={wireframe} />
            </mesh>
            {/* Cyan Accent Tip */}
            <mesh position={[0, 1.56, 0]}>
              <boxGeometry args={[0.062, 0.06, 0.122]} />
              <meshBasicMaterial color="#00f2fe" />
            </mesh>
          </group>
        </group>
      ))}

      {/* Rubber Feet */}
      {[
        [-1.1, -0.22, -0.6],
        [1.1, -0.22, -0.6],
        [-1.1, -0.22, 0.6],
        [1.1, -0.22, 0.6]
      ].map((fp, i) => (
        <mesh key={i} position={fp}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
