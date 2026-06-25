import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 800 }) => {
  const mesh = useRef();
  const frameCount = useRef(0);
  
  // Generate random positions and colors
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a large sphere of particles
      const r = 10 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Nexxtech theme colors (Lime green #9ef01a and subtle greys)
      const isGreen = Math.random() > 0.5;
      if (isGreen) {
        colors[i * 3] = 158 / 255;
        colors[i * 3 + 1] = 240 / 255;
        colors[i * 3 + 2] = 26 / 255;
      } else {
        // Light grey/blue for contrast
        colors[i * 3] = 200 / 255;
        colors[i * 3 + 1] = 210 / 255;
        colors[i * 3 + 2] = 220 / 255;
      }
    }
    return [positions, colors];
  }, [count]);

  // Throttle: only update every 3rd frame for performance
  useFrame((state) => {
    if (!mesh.current) return;
    frameCount.current++;
    if (frameCount.current % 3 !== 0) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default function Background3D() {
  const [shouldRender, setShouldRender] = useState(false);

  // Delay mounting the entire Canvas by 3 seconds to avoid blocking initial paint
  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40 transition-opacity duration-700 ease-in-out dark:opacity-30">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Particles count={800} />
      </Canvas>
    </div>
  );
}
