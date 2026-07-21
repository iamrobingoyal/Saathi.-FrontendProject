import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'

function FloatingParticles({ count = 80 }) {
  const pointsRef = useRef()

  // Generate random positions
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 5
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.04
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.04
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#25544a"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  )
}

function MorphingShape() {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.08
      meshRef.current.rotation.y = time * 0.12
      
      const s = 1 + Math.sin(time * 1.2) * 0.06
      meshRef.current.scale.set(s, s, s)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <dodecahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#25544a"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-80" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <FloatingParticles />
        <MorphingShape />
      </Canvas>
    </div>
  )
}
