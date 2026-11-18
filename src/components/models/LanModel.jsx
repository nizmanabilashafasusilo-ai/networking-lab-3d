import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LanModel({ wireframe = false, activeHotspot = null }) {
  const packetGroupRef = useRef();
  const ringRef = useRef();

  // Animate floating packets along cables
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (packetGroupRef.current) {
      packetGroupRef.current.children.forEach((child, i) => {
        const offset = (t * 0.8 + i * 0.25) % 1;
        if (child.userData.start && child.userData.end) {
          child.position.lerpVectors(child.userData.start, child.userData.end, offset);
        }
      });
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.1;
    }
  });

  const matBase = {
    wireframe,
    roughness: 0.3,
    metalness: 0.8
  };

  return (
    <group position={[0, -0.6, 0]}>
      {/* Cyber Grid Pedestal */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.1, 48]} />
        <meshStandardMaterial color="#141f38" {...matBase} />
      </mesh>
      
      {/* Outer Glowing Tech Ring */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.9, 3.05, 48]} />
        <meshBasicMaterial color="#00f2fe" wireframe={wireframe} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Grid Floor Overlay with clean contrast */}
      <gridHelper args={[6, 20, '#00f2fe', '#334155']} position={[0, 0.015, 0]} />

      {/* --- 1. CORE SWITCH (Center) --- */}
      <group position={[0, 0.25, 0]}>
        {/* Switch Metal Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.22, 0.8]} />
          <meshStandardMaterial color="#2a3b59" metalness={0.9} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Front Panel with Ports */}
        <mesh position={[0, 0, 0.405]}>
          <planeGeometry args={[1.3, 0.16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Blinking Port LEDs */}
        {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((x, idx) => (
          <mesh key={idx} position={[x, 0.04, 0.41]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#10b981" : "#00f2fe"} />
          </mesh>
        ))}
        {/* Rack Ears */}
        <mesh position={[-0.75, 0, 0]}>
          <boxGeometry args={[0.1, 0.22, 0.2]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} wireframe={wireframe} />
        </mesh>
        <mesh position={[0.75, 0, 0]}>
          <boxGeometry args={[0.1, 0.22, 0.2]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} wireframe={wireframe} />
        </mesh>
        <pointLight position={[0, 0.5, 0.5]} intensity={0.7} color="#00f2fe" distance={1.8} />
      </group>

      {/* --- 2. WORKSTATIONS (3 Client PCs) --- */}
      {[
        { pos: [-2.0, 0.2, 1.2], rot: 0.3, label: "PC-01 (Lab PPLG)" },
        { pos: [0, 0.2, 2.0], rot: 0, label: "PC-02 (Lab PPLG)" },
        { pos: [2.0, 0.2, 1.2], rot: -0.3, label: "PC-03 (Lab PPLG)" }
      ].map((pc, idx) => (
        <group key={idx} position={pc.pos} rotation={[0, pc.rot, 0]}>
          {/* Desk Pad */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.9, 0.02, 0.6]} />
            <meshStandardMaterial color="#1e293b" wireframe={wireframe} />
          </mesh>
          {/* Monitor Stand */}
          <mesh position={[0, 0.15, -0.15]}>
            <cylinderGeometry args={[0.02, 0.03, 0.3, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} wireframe={wireframe} />
          </mesh>
          {/* Monitor Screen Frame */}
          <mesh position={[0, 0.35, -0.15]} castShadow>
            <boxGeometry args={[0.65, 0.42, 0.03]} />
            <meshStandardMaterial color="#334155" wireframe={wireframe} />
          </mesh>
          {/* Glowing Display */}
          <mesh position={[0, 0.35, -0.133]}>
            <planeGeometry args={[0.61, 0.38]} />
            <meshBasicMaterial color={idx === 1 ? "#0284c7" : "#0ea5e9"} />
          </mesh>
          {/* PC Tower */}
          <mesh position={[0.42, 0.25, 0]} castShadow>
            <boxGeometry args={[0.16, 0.45, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} wireframe={wireframe} />
          </mesh>
          {/* RGB Accent line on Tower */}
          <mesh position={[0.42, 0.25, 0.202]}>
            <planeGeometry args={[0.02, 0.38]} />
            <meshBasicMaterial color="#00f2fe" />
          </mesh>
          {/* Keyboard */}
          <mesh position={[0, 0.03, 0.1]}>
            <boxGeometry args={[0.4, 0.02, 0.14]} />
            <meshStandardMaterial color="#475569" wireframe={wireframe} />
          </mesh>
        </group>
      ))}

      {/* --- 3. GATEWAY ROUTER (Internet Exit) --- */}
      <group position={[-1.8, 0.3, -1.2]} rotation={[0, 0.4, 0]}>
        {/* Router Base Body */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.15, 0.5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Antennas */}
        {[-0.25, 0.25].map((ax, aIdx) => (
          <group key={aIdx} position={[ax, 0.07, -0.22]} rotation={[-0.2, (aIdx - 0.5) * 0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.9} wireframe={wireframe} />
          </group>
        ))}
        {/* WAN Status Glowing Bead */}
        <mesh position={[0, 0.08, 0.24]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* WAN Label Floating Hologram */}
        <mesh position={[0, 0.45, 0]}>
          <planeGeometry args={[0.4, 0.12]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* --- 4. LOCAL FILE & DB SERVER (Resource Hub) --- */}
      <group position={[1.8, 0.5, -1.2]} rotation={[0, -0.4, 0]}>
        {/* Server Tower */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.9, 0.6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Front Drive Bays (4 bays) */}
        {[0.25, 0.1, -0.05, -0.2].map((y, dIdx) => (
          <mesh key={dIdx} position={[0, y, 0.305]}>
            <boxGeometry args={[0.5, 0.1, 0.02]} />
            <meshStandardMaterial color="#334155" wireframe={wireframe} />
          </mesh>
        ))}
        {/* Activity Lights on Server */}
        {[0.25, 0.1, -0.05, -0.2].map((y, dIdx) => (
          <mesh key={dIdx} position={[0.2, y, 0.32]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color={dIdx % 2 === 0 ? "#10b981" : "#f59e0b"} />
          </mesh>
        ))}
      </group>

      {/* --- 5. NETWORK CABLING (High Contrast Glowing Lines) --- */}
      {[
        { end: [-2.0, 0.1, 1.2], color: "#00f2fe" }, // to PC 1
        { end: [0, 0.1, 2.0], color: "#00f2fe" },    // to PC 2
        { end: [2.0, 0.1, 1.2], color: "#00f2fe" },   // to PC 3
        { end: [-1.8, 0.25, -1.2], color: "#38bdf8" },// to Router
        { end: [1.8, 0.25, -1.2], color: "#10b981" }  // to Server
      ].map((line, idx) => {
        const start = new THREE.Vector3(0, 0.2, 0);
        const end = new THREE.Vector3(...line.end);
        const mid = new THREE.Vector3(
          (start.x + end.x) / 2,
          0.05,
          (start.z + end.z) / 2
        );
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(20);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={idx} geometry={geometry}>
            <lineBasicMaterial color={line.color} linewidth={3} transparent opacity={0.95} />
          </line>
        );
      })}

      {/* --- 6. ANIMATED DATA PACKETS --- */}
      <group ref={packetGroupRef}>
        {[
          { start: new THREE.Vector3(-2.0, 0.15, 1.2), end: new THREE.Vector3(0, 0.25, 0), color: "#00f2fe" },
          { start: new THREE.Vector3(0, 0.25, 0), end: new THREE.Vector3(1.8, 0.3, -1.2), color: "#10b981" },
          { start: new THREE.Vector3(2.0, 0.15, 1.2), end: new THREE.Vector3(0, 0.25, 0), color: "#00f2fe" },
          { start: new THREE.Vector3(0, 0.25, 0), end: new THREE.Vector3(-1.8, 0.3, -1.2), color: "#38bdf8" },
        ].map((p, idx) => (
          <mesh key={idx} userData={{ start: p.start, end: p.end }}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color={p.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
