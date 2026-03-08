<<<<<<< HEAD
// =========================================
// Three.js Interactive Hero Background
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize pixel ratio
    container.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 2); // Indigo accent color
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xec4899, 2); // Pink accent color
    pointLight2.position.set(-2, -3, 2);
    scene.add(pointLight2);

    window.updateThreeTheme = (theme) => {
        if (theme === 'light') {
            pointLight.intensity = 1.2;
            pointLight2.intensity = 1.2;
            material.opacity = 0.4; // increase wireframe visibility
            material.emissiveIntensity = 0.5;
            particlesMaterial.color.set(0x3b82f6); // darker blue for light mode
            particlesMaterial.opacity = 0.6;
            particlesMaterial.blending = THREE.NormalBlending; // better visibility on light bg
        } else {
            pointLight.intensity = 2;
            pointLight2.intensity = 2;
            material.opacity = 0.15;
            material.emissiveIntensity = 0.2;
            particlesMaterial.color.set(0x6366f1);
            particlesMaterial.opacity = 0.8;
            particlesMaterial.blending = THREE.AdditiveBlending;
        }
    };

    // --- 3. Futuristic Geometry ---
    // Using an Icosahedron for a poly/tech look
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        emissive: 0x6366f1,
        emissiveIntensity: 0.2
    });
    const mainObject = new THREE.Mesh(geometry, material);

    // Position it slightly to the right on desktop, center on mobile
    if (window.innerWidth > 768) {
        mainObject.position.x = 2;
    }
    scene.add(mainObject);

    // Add an inner solid object
    const innerGeometry = new THREE.IcosahedronGeometry(1, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.8
    });
    const innerObject = new THREE.Mesh(innerGeometry, innerMaterial);
    mainObject.add(innerObject);

    // --- 4. Floating Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread particles over a 15x15x15 volume
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // --- 5. Mouse Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // --- 6. Animation Loop ---
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Target rotation based on mouse
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Smoothly interpolate object rotation towards target
        mainObject.rotation.y += 0.005 + (targetX - mainObject.rotation.y) * 0.05;
        mainObject.rotation.x += 0.005 + (targetY - mainObject.rotation.x) * 0.05;

        // Slowly rotate particles
        particleMesh.rotation.y = -elapsedTime * 0.05;
        // Float particles up and down slightly
        particleMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

        // Move scene slightly based on mouse for parallax
        scene.position.x += (mouseX * 0.001 - scene.position.x) * 0.05;
        scene.position.y += (-mouseY * 0.001 - scene.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // --- 7. Responsive Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (window.innerWidth > 768) {
            mainObject.position.x = 2;
        } else {
            mainObject.position.x = 0;
            mainObject.position.y = 1;
        }
    });
});
=======
// =========================================
// Three.js Interactive Hero Background
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize pixel ratio
    container.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 2); // Indigo accent color
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xec4899, 2); // Pink accent color
    pointLight2.position.set(-2, -3, 2);
    scene.add(pointLight2);

    window.updateThreeTheme = (theme) => {
        if (theme === 'light') {
            pointLight.intensity = 1.2;
            pointLight2.intensity = 1.2;
            material.opacity = 0.4; // increase wireframe visibility
            material.emissiveIntensity = 0.5;
            particlesMaterial.color.set(0x3b82f6); // darker blue for light mode
            particlesMaterial.opacity = 0.6;
            particlesMaterial.blending = THREE.NormalBlending; // better visibility on light bg
        } else {
            pointLight.intensity = 2;
            pointLight2.intensity = 2;
            material.opacity = 0.15;
            material.emissiveIntensity = 0.2;
            particlesMaterial.color.set(0x6366f1);
            particlesMaterial.opacity = 0.8;
            particlesMaterial.blending = THREE.AdditiveBlending;
        }
    };

    // --- 3. Futuristic Geometry ---
    // Using an Icosahedron for a poly/tech look
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        emissive: 0x6366f1,
        emissiveIntensity: 0.2
    });
    const mainObject = new THREE.Mesh(geometry, material);

    // Position it slightly to the right on desktop, center on mobile
    if (window.innerWidth > 768) {
        mainObject.position.x = 2;
    }
    scene.add(mainObject);

    // Add an inner solid object
    const innerGeometry = new THREE.IcosahedronGeometry(1, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.8
    });
    const innerObject = new THREE.Mesh(innerGeometry, innerMaterial);
    mainObject.add(innerObject);

    // --- 4. Floating Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread particles over a 15x15x15 volume
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // --- 5. Mouse Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // --- 6. Animation Loop ---
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Target rotation based on mouse
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Smoothly interpolate object rotation towards target
        mainObject.rotation.y += 0.005 + (targetX - mainObject.rotation.y) * 0.05;
        mainObject.rotation.x += 0.005 + (targetY - mainObject.rotation.x) * 0.05;

        // Slowly rotate particles
        particleMesh.rotation.y = -elapsedTime * 0.05;
        // Float particles up and down slightly
        particleMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

        // Move scene slightly based on mouse for parallax
        scene.position.x += (mouseX * 0.001 - scene.position.x) * 0.05;
        scene.position.y += (-mouseY * 0.001 - scene.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // --- 7. Responsive Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (window.innerWidth > 768) {
            mainObject.position.x = 2;
        } else {
            mainObject.position.x = 0;
            mainObject.position.y = 1;
        }
    });
});
>>>>>>> aad7480f5b2a5e05aaec7b8afcca49ae30982255
