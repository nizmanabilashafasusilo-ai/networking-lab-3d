import React from 'react';
import * as THREE from 'three';

export default function ModemModel({ wireframe = false }) {
  const matChassis = {
    color: "#0f172a",
    metalness: 0.8,
    roughness: 0.25,
    wireframe
  };

  return (
    <group position={[0, -0.2, 0]}>
      {/* Main Modem Body (Sleek aerodynamic bevel box) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.45, 1.4]} />
        <meshStandardMaterial {...matChassis} />
      </mesh>

      {/* Top Gloss Accent Plate */}
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[2.2, 0.02, 1.2]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} wireframe={wireframe} />
      </mesh>

      {/* Ventilation slots on top */}
      {[-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.245, -0.2]}>
          <boxGeometry args={[0.08, 0.01, 0.5]} />
          <meshBasicMaterial color="#0a0f1d" />
        </mesh>
      ))}

      {/* Front Face Inset Panel */}
      <mesh position={[0, 0, 0.705]}>
        <planeGeometry args={[2.3, 0.38]} />
        <meshStandardMaterial color="#050811" roughness={0.4} wireframe={wireframe} />
      </mesh>

      {/* LED Status Indicators on Front */}
      {[
        { label: "PWR", color: "#10b981", x: -0.9 },
        { label: "PON", color: "#10b981", x: -0.6 },
        { label: "LOS", color: "#ef4444", off: true, x: -0.3 },
        { label: "NET", color: "#00f2fe", x: 0 },
        { label: "WIFI", color: "#00f2fe", x: 0.3 },
        { label: "LAN1", color: "#10b981", x: 0.6 },
        { label: "LAN2", color: "#10b981", x: 0.9 }
      ].map((led, idx) => (
        <group key={idx} position={[led.x, 0.05, 0.71]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshBasicMaterial color={led.off ? "#475569" : led.color} />
          </mesh>
          <pointLight intensity={led.off ? 0 : 0.2} color={led.color} distance={0.4} />
        </group>
      ))}

      {/* Rear Panel */}
      <mesh position={[0, 0, -0.705]}>
        <planeGeometry args={[2.3, 0.38]} />
        <meshStandardMaterial color="#1e293b" wireframe={wireframe} />
      </mesh>

      {/* Rear: Fiber PON Optical Port (Green) */}
      <group position={[-0.8, 0, -0.72]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.18, 0.14, 0.08]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
      </group>

      {/* Rear: Gigabit LAN Ethernet Ports (Yellow) */}
      {[-0.2, 0.2].map((x, idx) => (
        <group key={idx} position={[x, 0, -0.72]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.22, 0.18, 0.08]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          {/* RJ45 cavity */}
          <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.16, 0.12, 0.02]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      ))}

      {/* Rear: Power DC Jack (Black circular barrel) */}
      <mesh position={[0.7, 0, -0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#020617" metalness={0.9} />
      </mesh>

      {/* Rear: Power Toggle Rocker Switch */}
      <mesh position={[0.95, 0, -0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.12, 0.18, 0.06]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Dual High-Gain Pivot Antennas */}
      {[-0.9, 0.9].map((ax, aIdx) => (
        <group key={aIdx} position={[ax, 0.2, -0.55]}>
          {/* Base Pivot Cylinder */}
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          {/* Hinge */}
          <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          {/* Antenna Mast */}
          <group position={[0, 0.1, 0]} rotation={[(aIdx === 0 ? 0.2 : -0.2), 0, (aIdx === 0 ? -0.2 : 0.2)]}>
            <mesh position={[0, 0.7, 0]} castShadow>
              <cylinderGeometry args={[0.025, 0.04, 1.4, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} wireframe={wireframe} />
            </mesh>
            {/* Top Cap */}
            <mesh position={[0, 1.4, 0]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshBasicMaterial color="#00f2fe" />
            </mesh>
          </group>
        </group>
      ))}

      {/* Rubber Feet */}
      {[
        [-1.0, -0.24, -0.5],
        [1.0, -0.24, -0.5],
        [-1.0, -0.24, 0.5],
        [1.0, -0.24, 0.5]
      ].map((fPos, fIdx) => (
        <mesh key={fIdx} position={fPos}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
