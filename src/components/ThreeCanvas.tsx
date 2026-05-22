import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1 representing total window scroll
}

export default function ThreeCanvas({ scrollProgress }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- SETUP SCENE, CAMERA, & RENDERER ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0908, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 3D GEOMETRY CREATION: COFFEE CUP GROUP ---
    const coffeeCupGroup = new THREE.Group();
    scene.add(coffeeCupGroup);

    // Double-walled outer cup (highly aesthetic, translucent-looking geometric finish)
    const cupOuterGeom = new THREE.CylinderGeometry(1.6, 1.0, 2.0, 32, 1, false);
    const cupOuterMat = new THREE.MeshPhysicalMaterial({
      color: 0xeeded6,
      transparent: true,
      opacity: 0.12,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9, // glass simulation
      ior: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const cupOuterMesh = new THREE.Mesh(cupOuterGeom, cupOuterMat);
    coffeeCupGroup.add(cupOuterMesh);

    // Inner gold rim band (elegant design)
    const rimGeom = new THREE.TorusGeometry(1.6, 0.04, 16, 100);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd09c42, // Liquid gold
      roughness: 0.1,
      metalness: 0.9,
    });
    const rimMesh = new THREE.Mesh(rimGeom, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.0;
    coffeeCupGroup.add(rimMesh);

    // Dark espresso coffee liquid
    const liquidGeom = new THREE.CylinderGeometry(1.52, 0.96, 1.6, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x22110c, // Rich dark espresso
      roughness: 0.15,
      metalness: 0.25,
    });
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
    liquidMesh.position.y = -0.15;
    coffeeCupGroup.add(liquidMesh);

    // Latte Art microfoam concentric disk on top
    const artGeom = new THREE.CylinderGeometry(1.52, 1.52, 0.02, 32);
    const artMat = new THREE.MeshStandardMaterial({
      color: 0xdeb96e, // Creamy golden/beige swirl
      roughness: 0.5,
    });
    const artMesh = new THREE.Mesh(artGeom, artMat);
    artMesh.position.y = 0.66;
    coffeeCupGroup.add(artMesh);

    // A tiny raised foam leaf star geometry (simulating Latte Art star/rosetta)
    const leafGeom = new THREE.TorusGeometry(0.65, 0.11, 8, 3, Math.PI * 2);
    const leafMesh = new THREE.Mesh(leafGeom, new THREE.MeshStandardMaterial({
      color: 0xfbf7ee,
      roughness: 0.8,
    }));
    leafMesh.position.set(0, 0.68, 0);
    leafMesh.rotation.x = Math.PI / 2;
    coffeeCupGroup.add(leafMesh);

    // Cup Handle (torus, geometric styled)
    const handleGeom = new THREE.TorusGeometry(0.7, 0.12, 12, 24, Math.PI * 1.2);
    const handleMesh = new THREE.Mesh(handleGeom, cupOuterMat);
    handleMesh.position.set(-1.45, 0.1, 0);
    handleMesh.rotation.z = Math.PI * 1.1;
    coffeeCupGroup.add(handleMesh);

    // Saucer plate
    const saucerOuterGeom = new THREE.CylinderGeometry(2.5, 1.8, 0.15, 32);
    const saucerMesh = new THREE.Mesh(saucerOuterGeom, cupOuterMat);
    saucerMesh.position.y = -1.15;
    coffeeCupGroup.add(saucerMesh);

    const saucerRimGeom = new THREE.TorusGeometry(2.5, 0.035, 12, 64);
    const saucerRim = new THREE.Mesh(saucerRimGeom, goldMat);
    saucerRim.rotation.x = Math.PI / 2;
    saucerRim.position.y = -1.08;
    coffeeCupGroup.add(saucerRim);

    // Scale up the cup group slightly for luxury impact
    coffeeCupGroup.scale.set(1.15, 1.15, 1.15);
    coffeeCupGroup.position.set(0, 0, 0);

    // --- ORBITING COFFEE BEANS ---
    const beansGroup = new THREE.Group();
    scene.add(beansGroup);

    const beanGeom = new THREE.SphereGeometry(0.24, 16, 16);
    beanGeom.scale(1.6, 1.1, 0.8); // Stretched coffee bean shape

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x3a1e12, // Rich roasted bean brown
      roughness: 0.35,
      metalness: 0.15,
    });

    const coffeeBeans: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; yOffset: number; rotSpeed: number }[] = [];

    const numBeans = 6;
    for (let i = 0; i < numBeans; i++) {
      const beanMesh = new THREE.Mesh(beanGeom, beanMat);
      
      // Add a visual split down the center of each bean (using small dark boxes on each bean)
      const creaseGeom = new THREE.BoxGeometry(0.02, 0.82, 0.18);
      const creaseMat = new THREE.MeshBasicMaterial({ color: 0x110805 });
      const creaseMesh = new THREE.Mesh(creaseGeom, creaseMat);
      creaseMesh.position.set(0, 0, 0.11);
      beanMesh.add(creaseMesh);

      // Gold-dusted detailing on certain beans
      if (i % 2 === 0) {
        const goldDustGeom = new THREE.SphereGeometry(0.09, 8, 8);
        const goldDustMesh = new THREE.Mesh(goldDustGeom, goldMat);
        goldDustMesh.position.set(0.1, 0.25, 0.1);
        beanMesh.add(goldDustMesh);
      }

      const orbitRadius = 2.4 + i * 0.45;
      const angle = (i / numBeans) * Math.PI * 2;
      const speed = 0.012 + (i % 3) * 0.005;
      const yOffset = (Math.random() - 0.5) * 2;
      const rotSpeed = 0.01 + Math.random() * 0.02;

      beanMesh.position.set(Math.cos(angle) * orbitRadius, yOffset, Math.sin(angle) * orbitRadius);
      beanMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      beansGroup.add(beanMesh);
      coffeeBeans.push({
        mesh: beanMesh,
        orbitRadius,
        speed,
        angle,
        yOffset,
        rotSpeed,
      });
    }

    // --- STREAMING RISING STEAM PARTICLES ---
    const steamCount = 35;
    const steamGeom = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamSpeeds: number[] = [];
    const steamYResets: number[] = [];

    for (let i = 0; i < steamCount; i++) {
      // Position inside cup radius
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.9;
      const x = Math.cos(theta) * r;
      const y = 0.8 + Math.random() * 1.5;
      const z = Math.sin(theta) * r;

      steamPositions[i * 3] = x;
      steamPositions[i * 3 + 1] = y;
      steamPositions[i * 3 + 2] = z;

      steamSpeeds.push(0.015 + Math.random() * 0.02);
      steamYResets.push(0.8);
    }

    steamGeom.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
    
    // Steam particle material (glittering gold embers)
    const steamMat = new THREE.PointsMaterial({
      color: 0xdeb96e,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const steamParticles = new THREE.Points(steamGeom, steamMat);
    coffeeCupGroup.add(steamParticles);

    // --- COSMIC BACKGROUND DUST / PARTICLES ---
    const dustCount = 120;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      // Scattered widely in background
      dustPositions[i * 3] = (Math.random() - 0.5) * 20;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }

    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf4ebd2,
      size: 0.07,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const dustParticles = new THREE.Points(dustGeom, dustMat);
    scene.add(dustParticles);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x19100e, 1.2);
    scene.add(ambientLight);

    // Main cinematic amber key light
    const keyLight = new THREE.DirectionalLight(0xf4ebd2, 3.2);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    // High luxury gold backlight
    const backLight = new THREE.DirectionalLight(0xd09c42, 4.5);
    backLight.position.set(-6, 3, -4);
    scene.add(backLight);

    // Rim orange/espresso secondary filler
    const fillLight = new THREE.DirectionalLight(0xaa5c3e, 1.8);
    fillLight.position.set(0, -4, 2);
    scene.add(fillLight);

    // --- MOUSE MOVE PARALLAX INTERPOLATION ---
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseRef.current.targetX = x * 1.5;
      mouseRef.current.targetY = y * 1.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- RESPONSIVE RESIZE OBSERVER ---
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP ---
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();

      // Mouse inertia tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.07;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.07;

      // Base idle rotation of coffee cup Group
      coffeeCupGroup.rotation.y = time * 0.15 + mouseRef.current.x * 0.4;
      coffeeCupGroup.rotation.x = Math.sin(time * 0.4) * 0.05 + mouseRef.current.y * 0.3;
      
      // Gentle floating animation of cup
      coffeeCupGroup.position.y = Math.sin(time * 1.2) * 0.1;

      // --- SCROLL PROGRESS COFFEE CUP INTERPOLATION ---
      // Map scroll progress (0..1) to different cinematic screen positions
      // Phase 1 (Hero -> Collection): Center Large -> Shift Right, shrink, slant
      // Phase 2 (Collection -> sensory Brew Labs): Shift Left, sit inside visualizer console
      // Phase 3 (Brew Labs -> Reservation): Center, far background, tilt up
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let targetScale = 1.15;

      if (scrollProgress < 0.28) {
        // HERO: Centered, prominent, floating high
        const p = scrollProgress / 0.28;
        targetX = THREE.MathUtils.lerp(0, 1.8, p);
        targetY = THREE.MathUtils.lerp(0.0, -0.4, p);
        targetZ = THREE.MathUtils.lerp(0, -1.5, p);
        targetRotX = THREE.MathUtils.lerp(0.0, 0.4, p);
        targetRotY = THREE.MathUtils.lerp(0.0, 1.2, p);
        targetScale = THREE.MathUtils.lerp(1.15, 0.85, p);
      } else if (scrollProgress < 0.62) {
        // COLLECTION & LABS: Shifting left, getting slightly larger, tilted, to sit inside premium console
        const p = (scrollProgress - 0.28) / (0.62 - 0.28);
        targetX = THREE.MathUtils.lerp(1.8, -1.8, p);
        targetY = THREE.MathUtils.lerp(-0.4, 0.1, p);
        targetZ = THREE.MathUtils.lerp(-1.5, 0.0, p);
        targetRotX = THREE.MathUtils.lerp(0.4, -0.3, p);
        targetRotY = THREE.MathUtils.lerp(1.2, -0.8, p);
        targetScale = THREE.MathUtils.lerp(0.85, 1.05, p);
      } else {
        // RESERVATIONS & CHRONOLOGY FOOTER: Moves deep centered in background, tilting backwards beautifully
        const p = (scrollProgress - 0.62) / (1.0 - 0.62);
        targetX = THREE.MathUtils.lerp(-1.8, 0, p);
        targetY = THREE.MathUtils.lerp(0.1, -1.2, p);
        targetZ = THREE.MathUtils.lerp(0.0, -4.0, p);
        targetRotX = THREE.MathUtils.lerp(-0.3, 0.6, p);
        targetRotY = THREE.MathUtils.lerp(-0.8, 0.4, p);
        targetScale = THREE.MathUtils.lerp(1.05, 0.9, p);
      }

      // Smoothly interpolate current placement arrays
      coffeeCupGroup.position.x += (targetX - coffeeCupGroup.position.x) * 0.08;
      // Add floating bounce to the coffee cup's targetY
      const bouncY = targetY + Math.sin(time * 0.8) * 0.08;
      coffeeCupGroup.position.y += (bouncY - coffeeCupGroup.position.y) * 0.08;
      coffeeCupGroup.position.z += (targetZ - coffeeCupGroup.position.z) * 0.08;
      
      const sc = THREE.MathUtils.lerp(coffeeCupGroup.scale.x, targetScale, 0.08);
      coffeeCupGroup.scale.set(sc, sc, sc);

      // Orbiting coffee beans math
      coffeeBeans.forEach((bean, idx) => {
        bean.angle += bean.speed;
        const radius = bean.orbitRadius;
        
        // Beans also react to mouse drift and scroll depth
        const bx = Math.cos(bean.angle) * radius;
        const bz = Math.sin(bean.angle) * radius;
        
        // Beans height floats on sine wave
        const by = bean.yOffset + Math.sin(time * 1.5 + idx) * 0.3;

        bean.mesh.position.set(bx, by, bz);
        bean.mesh.rotation.y += bean.rotSpeed;
        bean.mesh.rotation.x += bean.rotSpeed * 0.5;
      });

      // Orbit beans container rotation
      beansGroup.rotation.y = -time * 0.07;
      // beans follow the general scroll x-shift
      beansGroup.position.x = coffeeCupGroup.position.x;
      beansGroup.position.y = coffeeCupGroup.position.y;
      beansGroup.position.z = coffeeCupGroup.position.z;

      // Dynamic Steam particles rising animation
      const posAttr = steamParticles.geometry.attributes.position;
      if (posAttr) {
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < steamCount; i++) {
          arr[i * 3 + 1] += steamSpeeds[i]; // rise Y
          arr[i * 3] += Math.sin(time * 1.2 + i) * 0.007; // wavy X drift
          arr[i * 3 + 2] += Math.cos(time * 1.2 + i) * 0.007; // wavy Z drift

          // If particle goes too high, reset to top of liquid
          if (arr[i * 3 + 1] > 3.0) {
            arr[i * 3 + 1] = steamYResets[i];
            const theta = Math.random() * Math.PI * 2;
            const r = Math.random() * 0.8;
            arr[i * 3] = Math.cos(theta) * r;
            arr[i * 3 + 2] = Math.sin(theta) * r;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Dust floating background
      dustParticles.rotation.y = time * 0.02 + mouseRef.current.x * 0.15;
      dustParticles.rotation.x = Math.sin(time * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer) renderer.dispose();
      if (scene) scene.clear();
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      id="velora-three-scene"
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
