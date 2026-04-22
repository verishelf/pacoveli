"use client";

import { useRef, useMemo, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/** Moves starfield with page scroll (smooth lerp). */
function ScrollDrivenStarfield({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  const maxScroll = useRef(1);

  useEffect(() => {
    const update = () => {
      scrollY.current = window.scrollY;
      const se = document.documentElement;
      maxScroll.current = Math.max(1, se.scrollHeight - window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    const t = scrollY.current / maxScroll.current;
    const rotX = t * 0.45 - 0.15;
    const rotY = t * 0.35;
    const shiftY = -scrollY.current * 0.0035;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rotX, 0.12);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotY, 0.12);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, shiftY, 0.12);
  });

  return <group ref={group}>{children}</group>;
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(
    () => [
      { geometry: "icosahedron" as const, position: [2, 1, -3], scale: 0.4, color: "#00d4ff" },
      { geometry: "torus" as const, position: [-2.5, -0.5, -4], scale: 0.35, color: "#ff006e" },
      { geometry: "octahedron" as const, position: [0, 2, -5], scale: 0.3, color: "#ffbe0b" },
      { geometry: "dodecahedron" as const, position: [3, -1, -6], scale: 0.25, color: "#00d4aa" },
      { geometry: "torusKnot" as const, position: [-1, 1.5, -4], scale: 0.2, color: "#8b5cf6" },
    ],
    []
  );

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.5}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <mesh
            position={shape.position as [number, number, number]}
            scale={shape.scale}
            castShadow
            receiveShadow
          >
            {shape.geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
            {shape.geometry === "torus" && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
            {shape.geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
            {shape.geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
            {shape.geometry === "torusKnot" && (
              <torusKnotGeometry args={[0.3, 0.1, 64, 16]} />
            )}
            <meshStandardMaterial
              color={shape.color}
              emissive={shape.color}
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.2}
              wireframe={i % 2 === 0}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ParticleField() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { pointer } = state;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      pointer.x * 2,
      0.02
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointer.y * 2,
      0.02
    );
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        <ScrollDrivenStarfield>
          <Stars
            radius={50}
            depth={50}
            count={3000}
            factor={2}
            saturation={0.8}
            fade
            speed={0.5}
          />
          <ParticleField />
        </ScrollDrivenStarfield>
        <FloatingShapes />
        <CameraRig />
      </Canvas>
    </div>
  );
}
