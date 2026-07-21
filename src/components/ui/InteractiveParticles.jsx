import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useSettingsStore } from '../../store/useStore'

export function InteractiveParticles() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const materialRef = useRef(null)
  const [reduced, setReduced] = useState(false)
  const darkMode = useSettingsStore((s) => s.darkMode)

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Update color based on dark/light theme
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(darkMode ? '#60a5fa' : '#3b82f6')
      materialRef.current.opacity = darkMode ? 0.35 : 0.5
    }
  }, [darkMode])

  useEffect(() => {
    if (reduced) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const parent = canvas.parentElement
    if (!parent) return undefined

    // 1. Scene setup
    const scene = new THREE.Scene()

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    camera.position.z = 8

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Helper to get parent dimensions
    const resizeRenderer = () => {
      const width = parent.clientWidth
      const height = parent.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resizeRenderer()

    // Helper to compute viewport size at z = 0 plane
    const getViewportSize = () => {
      const fovRad = (camera.fov * Math.PI) / 180
      const height = 2 * Math.tan(fovRad / 2) * camera.position.z
      const width = height * camera.aspect
      return { width, height }
    }

    // 4. Create particles (slanted, delicate dashes)
    const count = 350
    // Tiny, delicate plane dash
    const geometry = new THREE.PlaneGeometry(0.03, 0.15)
    
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(darkMode ? '#60a5fa' : '#3b82f6'),
      transparent: true,
      opacity: darkMode ? 0.35 : 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    materialRef.current = material

    const mesh = new THREE.InstancedMesh(geometry, material, count)
    scene.add(mesh)

    // 5. Particle States
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const homes = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    const speeds = new Float32Array(count)

    const initParticles = () => {
      const { width, height } = getViewportSize()
      for (let i = 0; i < count; i++) {
        // Distribute within the container's virtual 3D bounds
        const x = (Math.random() - 0.5) * width * 1.1
        const y = (Math.random() - 0.5) * height * 1.1
        const z = (Math.random() - 0.5) * 1.5 // depth layer variations

        homes[i * 3] = x
        homes[i * 3 + 1] = y
        homes[i * 3 + 2] = z

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        velocities[i * 3] = 0
        velocities[i * 3 + 1] = 0
        velocities[i * 3 + 2] = 0

        phases[i] = Math.random() * Math.PI * 2
        speeds[i] = 0.3 + Math.random() * 0.6
      }
    }
    initParticles()

    // 6. Mouse Interaction relative to parent container
    const mouse = new THREE.Vector2(-999, -999)
    const raycaster = new THREE.Raycaster()
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mouseWorld = new THREE.Vector3(-999, -999, 0)

    const onMouseMove = (e) => {
      const rect = parent.getBoundingClientRect()
      // Map mouse coordinate relative to the container bounds
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      mouse.set(x, y)
    }

    const onMouseLeave = () => {
      mouse.set(-999, -999)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    parent.addEventListener('mouseleave', onMouseLeave)

    // 7. Handle Resizing
    const onResize = () => {
      resizeRenderer()
      initParticles()
    }
    window.addEventListener('resize', onResize)

    // 8. Animation Loop
    const clock = new THREE.Clock()
    const dummy = new THREE.Object3D()
    let animationFrameId

    const tick = () => {
      const time = clock.getElapsedTime()

      // Raycast mouse into 3D space
      if (mouse.x !== -999) {
        raycaster.setFromCamera(mouse, camera)
        raycaster.ray.intersectPlane(planeZ, mouseWorld)
      } else {
        mouseWorld.set(-999, -999, 0)
      }

      for (let i = 0; i < count; i++) {
        let px = positions[i * 3]
        let py = positions[i * 3 + 1]
        const pz = positions[i * 3 + 2]

        let vx = velocities[i * 3]
        let vy = velocities[i * 3 + 1]

        const hx = homes[i * 3]
        const hy = homes[i * 3 + 1]

        const phase = phases[i]
        const speed = speeds[i]

        // Smooth drift
        const driftX = Math.sin(time * speed + phase) * 0.1
        const driftY = Math.cos(time * speed + phase) * 0.1

        // Proximity repulsion
        let rx = 0
        let ry = 0
        if (mouseWorld.x !== -999) {
          const dx = px - mouseWorld.x
          const dy = py - mouseWorld.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const repulsionRadius = 2.0

          if (dist < repulsionRadius) {
            const force = (1.0 - dist / repulsionRadius) * 0.1
            const angle = dist > 0.01 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2
            rx = Math.cos(angle) * force
            ry = Math.sin(angle) * force
          }
        }

        // Spring force returning to home
        const homeDiffX = hx + driftX - px
        const homeDiffY = hy + driftY - py
        const sx = homeDiffX * 0.015
        const sy = homeDiffY * 0.015

        // Update velocity
        vx = (vx + rx + sx) * 0.88
        vy = (vy + ry + sy) * 0.88

        px += vx
        py += vy

        positions[i * 3] = px
        positions[i * 3 + 1] = py

        // Depth scale
        const scale = 1.0 + pz * 0.2

        dummy.position.set(px, py, pz)
        dummy.rotation.set(0, 0, Math.PI / 6) // Slanted 30 degrees
        dummy.scale.set(scale, scale, 1)
        dummy.updateMatrix()

        mesh.setMatrixAt(i, dummy.matrix)
      }

      mesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      parent.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    />
  )
}
