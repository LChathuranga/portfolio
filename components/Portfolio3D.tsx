'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface PortfolioData {
  title: string
  description: string
  technologies: string[]
  link?: string
}

const Portfolio3D = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<PortfolioData | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  
  // 3D Scene variables
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const portfolioObjects = useRef<THREE.Mesh[]>([])
  const particlesRef = useRef<THREE.Points>()
  
  // Controls
  const keysPressed = useRef<{ [key: string]: boolean }>({})
  const mouseMovement = useRef({ x: 0, y: 0 })
  const isPointerLocked = useRef(false)

  // Portfolio data
  const portfolioData: PortfolioData[] = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"]
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates using Socket.io and React.",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"]
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that displays current weather and forecasts using external APIs.",
      technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"]
    },
    {
      title: "Portfolio Website",
      description: "This interactive 3D portfolio built with Three.js and Next.js to showcase projects in an immersive way.",
      technologies: ["Next.js", "Three.js", "TypeScript", "WebGL"]
    }
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0f0f23, 50, 200)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 5, 20)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x0f0f23, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    canvasRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00ff88, 1)
    directionalLight.position.set(10, 10, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Create particles
    createParticles()

    // Create portfolio objects
    createPortfolioObjects()

    // Create environment
    createEnvironment()

    // Event listeners
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)

    // Start animation loop
    animate()

    // Show info panel after loading
    setTimeout(() => {
      setLoading(false)
      setShowInfo(true)
      setTimeout(() => setShowInfo(false), 5000)
    }, 2000)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  const createParticles = () => {
    const particleCount = 1000
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200
      positions[i + 1] = (Math.random() - 0.5) * 200
      positions[i + 2] = (Math.random() - 0.5) * 200
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.5,
      transparent: true,
      opacity: 0.6
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    particlesRef.current = particleSystem
    sceneRef.current?.add(particleSystem)
  }

  const createPortfolioObjects = () => {
    portfolioData.forEach((item, index) => {
      // Create floating cubes for each portfolio item
      const geometry = new THREE.BoxGeometry(3, 3, 3)
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL((index * 0.25) % 1, 0.7, 0.6),
        transparent: true,
        opacity: 0.8
      })

      const cube = new THREE.Mesh(geometry, material)
      
      // Position cubes in a circle
      const angle = (index / portfolioData.length) * Math.PI * 2
      const radius = 15
      cube.position.x = Math.cos(angle) * radius
      cube.position.y = Math.sin(index) * 3 + 5
      cube.position.z = Math.sin(angle) * radius

      cube.userData = { portfolioData: item, index }
      portfolioObjects.current.push(cube)
      sceneRef.current?.add(cube)

      // Add glow effect
      const glowGeometry = new THREE.BoxGeometry(3.2, 3.2, 3.2)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL((index * 0.25) % 1, 0.7, 0.6),
        transparent: true,
        opacity: 0.2
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      cube.add(glow)
    })
  }

  const createEnvironment = () => {
    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(100, 100)
    const floorMaterial = new THREE.MeshLambertMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.8
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -5
    floor.receiveShadow = true
    sceneRef.current?.add(floor)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current[event.code] = true
    
    if (event.code === 'Escape' && isPointerLocked.current) {
      document.exitPointerLock()
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current[event.code] = false
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isPointerLocked.current && cameraRef.current) {
      mouseMovement.current.x += event.movementX * 0.002
      mouseMovement.current.y += event.movementY * 0.002
      mouseMovement.current.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseMovement.current.y))
    }
  }

  const handleClick = () => {
    if (!isPointerLocked.current) {
      rendererRef.current?.domElement.requestPointerLock()
    } else {
      // Raycast for object interaction
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2(0, 0) // Center of screen
      
      raycaster.setFromCamera(mouse, cameraRef.current!)
      const intersects = raycaster.intersectObjects(portfolioObjects.current)
      
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object as THREE.Mesh
        setSelectedItem(selectedObject.userData.portfolioData)
      }
    }
  }

  const handleResize = () => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
  }

  const animate = () => {
    requestAnimationFrame(animate)

    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return

    // Update pointer lock status
    isPointerLocked.current = document.pointerLockElement === rendererRef.current.domElement

    // Camera movement
    const moveSpeed = 0.3
    const direction = new THREE.Vector3()
    
    if (keysPressed.current['KeyW']) direction.z -= 1
    if (keysPressed.current['KeyS']) direction.z += 1
    if (keysPressed.current['KeyA']) direction.x -= 1
    if (keysPressed.current['KeyD']) direction.x += 1

    direction.normalize()
    direction.multiplyScalar(moveSpeed)

    // Apply camera rotation
    cameraRef.current.rotation.order = 'YXZ'
    cameraRef.current.rotation.y = -mouseMovement.current.x
    cameraRef.current.rotation.x = -mouseMovement.current.y

    // Move camera based on its current rotation
    const cameraDirection = new THREE.Vector3()
    cameraRef.current.getWorldDirection(cameraDirection)
    
    const right = new THREE.Vector3()
    right.crossVectors(cameraDirection, cameraRef.current.up).normalize()
    
    const forward = new THREE.Vector3()
    forward.crossVectors(cameraRef.current.up, right).normalize()

    const movement = new THREE.Vector3()
    movement.addScaledVector(right, direction.x)
    movement.addScaledVector(forward, -direction.z)
    
    cameraRef.current.position.add(movement)

    // Animate portfolio objects
    portfolioObjects.current.forEach((obj, index) => {
      obj.rotation.x += 0.01
      obj.rotation.y += 0.01
      obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01
    })

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current)
  }

  const closePopup = () => {
    setSelectedItem(null)
  }

  return (
    <>
      {loading && (
        <div id="loading-screen">
          <div className="loading-spinner"></div>
          <h2>Loading 3D Portfolio...</h2>
          <p>Initializing the experience</p>
        </div>
      )}

      <div id="canvas-container" ref={canvasRef}></div>
      
      <div id="ui-overlay">
        <div id="crosshair" className={isPointerLocked.current ? 'active' : ''}></div>
        
        <div id="controls">
          <h3>Controls</h3>
          <p><strong>WASD:</strong> Move around</p>
          <p><strong>Mouse:</strong> Look around</p>
          <p><strong>Click:</strong> Interact with objects</p>
          <p><strong>ESC:</strong> Release mouse</p>
        </div>

        <div id="info-panel" className={showInfo ? 'visible' : ''}>
          <h2>Welcome!</h2>
          <p>Navigate through this 3D space to explore my portfolio. Click on the floating objects to learn more about my projects and skills.</p>
        </div>
      </div>

      {selectedItem && (
        <div className="portfolio-popup visible">
          <button className="close-btn" onClick={closePopup}>&times;</button>
          <div>
            <h2 style={{ color: '#00ff88', marginBottom: '15px' }}>{selectedItem.title}</h2>
            <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>{selectedItem.description}</p>
            <h3 style={{ color: '#00ff88', marginBottom: '10px' }}>Technologies Used:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedItem.technologies.map((tech, index) => (
                <span 
                  key={index}
                  style={{
                    background: 'rgba(0, 255, 136, 0.2)',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    border: '1px solid #00ff88',
                    fontSize: '14px'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            {selectedItem.link && (
              <a 
                href={selectedItem.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  padding: '10px 20px',
                  background: '#00ff88',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}
              >
                View Project
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Portfolio3D
