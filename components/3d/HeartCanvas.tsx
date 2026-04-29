'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// ── Heart geometry (extruded SVG-style shape) ─────────────────────────────────
function useHeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0.25, 0.25)
    shape.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0)
    shape.bezierCurveTo(-0.3, 0, -0.3, 0.35, -0.3, 0.35)
    shape.bezierCurveTo(-0.3, 0.55, -0.1, 0.77, 0.25, 0.95)
    shape.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35)
    shape.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0)
    shape.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25)
    return new THREE.ExtrudeGeometry(shape, {
      steps: 2, depth: 0.2, bevelEnabled: true,
      bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 8,
    })
  }, [])
}

// ── Animated heart mesh ───────────────────────────────────────────────────────
function Heart({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const mainRef  = useRef<THREE.Mesh>(null!)
  const glowRef  = useRef<THREE.Mesh>(null!)
  const geo = useHeartGeometry()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const rotY = mouseX * 0.5 + Math.sin(t * 0.3) * 0.2
    const rotX = -mouseY * 0.3 + Math.cos(t * 0.2) * 0.1
    const posY = Math.sin(t * 0.8) * 0.08
    const scale = 1 + Math.sin(t * 1.5) * 0.03

    ;[mainRef, glowRef].forEach((r, i) => {
      if (!r.current) return
      r.current.rotation.set(rotX, rotY, 0)
      r.current.position.y = posY
      r.current.scale.setScalar(i === 0 ? scale : scale * 1.05)
    })
  })

  return (
    <group position={[-0.25, -0.4, 0]}>
      <mesh ref={glowRef} geometry={geo}>
        <meshStandardMaterial color="#ff1a3a" emissive="#8b0000" emissiveIntensity={0.8} transparent opacity={0.3} side={THREE.BackSide} />
      </mesh>
      <mesh ref={mainRef} geometry={geo}>
        <meshStandardMaterial color="#c1002a" emissive="#7b0015" emissiveIntensity={0.6} metalness={0.3} roughness={0.3} />
      </mesh>
    </group>
  )
}

// ── Floating gold orbs ────────────────────────────────────────────────────────
function Orb({ pos, scale, speed, offset }: { pos: [number,number,number]; scale: number; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.position.y = pos[1] + Math.sin(t * speed + offset) * 0.3
      ref.current.position.x = pos[0] + Math.cos(t * speed * 0.7 + offset) * 0.15
    }
  })
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={1} transparent opacity={0.4} />
    </mesh>
  )
}

function Orbs() {
  const orbs = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2 - 2] as [number,number,number],
      scale: Math.random() * 0.15 + 0.05,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }))
  , [])
  return <>{orbs.map((o) => <Orb key={o.id} pos={o.pos} scale={o.scale} speed={o.speed} offset={o.offset} />)}</>
}

// ── Public component ──────────────────────────────────────────────────────────
export default function HeartCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]}   intensity={1}   color="#ffd700" />
      <directionalLight position={[-5, -3, 2]} intensity={0.5} color="#ff4466" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#c1002a" distance={6} />
      <pointLight position={[2, 2, 1]} intensity={1} color="#d4af37" distance={5} />
      <Stars radius={50} depth={20} count={300} factor={2} saturation={0} fade speed={0.5} />
      <Orbs />
      <Heart mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
