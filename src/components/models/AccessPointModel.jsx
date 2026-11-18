import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AccessPointModel({ wireframe = false }) {
  const wave1Ref = useRef();
  const wave2Ref = useRef();
  const wave3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (wave1Ref.current) {
      const s1 = 1 + (t * 0.8) % 1.5;
      wave1Ref.current.scale.set(s1, s1, s1);
      wave1Ref.current.material.opacity = Math.max(0, 0.4 - (s1 - 1) * 0.25);
    }
    if (wave2Ref.current) {
      const s2 = 1 + ((t * 0.8) + 0.5) % 1.5;
      wave2Ref.current.scale.set(s2, s2, s2);
      wave2Ref.current.material.opacity = Math.max(0, 0.4 - (s2 - 1) * 0.25);
    }
    if (wave3Ref.current) {
      const s3 = 1 + ((t * 0.8) + 1.0) % 1.5;
      wave3Ref.current.scale.set(s3, s3, s3);
      wave3Ref.current.material.opacity = Math.max(0, 0.4 - (s3 - 1) * 0.25);
    }
  });

  const matDome = {
    color: "#f8fafc",
    metalness: 0.2,
    roughness: 0.3,
    wireframe
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Saucer / Disc Main Dome (Ceiling Mount AP) */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.6, 1.4, 0.25, 48]} />
        <meshStandardMaterial {...matDome} />
      </mesh>

      {/* Front Curved Bevel Top */}
      <mesh position={[0, 0.24, 0]}>
        <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.22]} />
        <meshStandardMaterial {...matDome} />
      </mesh>

      {/* Center Cyan LED Status Ring */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.32, 32]} />
        <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} intensity={0.6} color="#00f2fe" distance={1.2} />

      {/* Center Brand Inset */}
      <mesh position={[0, 0.315, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Backside: Mounting Bracket Ring */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.08, 36]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.4} wireframe={wireframe} />
      </mesh>

      {/* Backside: Recessed RJ45 PoE Port */}
      <group position={[0, -0.06, -0.6]} rotation={[Math.PI, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.25, 0.1, 0.2]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.15]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Wi-Fi Radio Waves Visualizer (Translucent Expanding Toruses) */}
      <group position={[0, 0.2, 0]}>
        <mesh ref={wave1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.03, 16, 48]} />
          <meshBasicMaterial color="#00f2fe" transparent opacity={0.4} />
        </mesh>
        <mesh ref={wave2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.03, 16, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </mesh>
        <mesh ref={wave3Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.03, 16, 48]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}
