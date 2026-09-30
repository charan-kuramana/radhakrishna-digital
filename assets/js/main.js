/* ============================================================
   Radhakrishna Digital — Main JS
   Extracted from index.html inline <script> blocks (lift-and-
   shift, no logic changes). Each section was an independent
   self-invoking function in the original markup, in this order.
   ============================================================ */

/* ---- Theme toggle button ---- */
    (function(){
      var toggle = document.getElementById('themeToggle');
      var root = document.documentElement;
      function isLight(){ return root.getAttribute('data-theme') === 'light'; }
      function sync(){
        var light = isLight();
        toggle.setAttribute('aria-pressed', light ? 'true' : 'false');
        toggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      }
      sync();
      toggle.addEventListener('click', function(){
        var next = isLight() ? 'dark' : 'light';
        if (next === 'light') root.setAttribute('data-theme', 'light');
        else root.removeAttribute('data-theme');
        try{ localStorage.setItem('rd-theme', next); }catch(e){}
        sync();
        root.dispatchEvent(new CustomEvent('rd-theme-change', { detail:{ theme: next } }));
      });
    })();

/* ---- Process timeline ---- */
(function(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const section = document.getElementById('process');
  const stepsRoot = document.getElementById('processSteps');
  const visual = document.getElementById('processVisual');
  const steps = [
    { n:'01', color:'#22D3EE', label:'DISCOVER', title:'Understand the opportunity.', desc:'We start by understanding your business, your users, your goals, and the problem you are trying to solve.', tags:['Business goals','User needs','Requirements','Challenges'], icon:'⌕' },
    { n:'02', color:'#8B7CFF', label:'DEFINE', title:'Turn the idea into a clear direction.', desc:'We transform the initial idea into a practical roadmap covering scope, features, priorities, technology, and milestones.', tags:['Strategy','Scope','Features','Roadmap'], icon:'◎' },
    { n:'03', color:'#2DD4BF', label:'DESIGN', title:'Shape the experience before we build it.', desc:'We create the structure, user experience, visual direction, and technical foundation needed to bring the product to life.', tags:['UX','UI','Architecture','Design system'], icon:'✎' },
    { n:'04', color:'#FFD166', label:'BUILD', title:'Turn the vision into a working product.', desc:'Our developers bring design and technology together through focused, iterative development with regular progress and feedback.', tags:['Frontend','Backend','APIs','Integrations'], icon:'</>' },
    { n:'05', color:'#FF6FA5', label:'TEST & REFINE', title:'Make every detail work as it should.', desc:'We test key workflows, devices, integrations, performance, and usability, then refine wherever needed.', tags:['Testing','Performance','Security','Refinement'], icon:'✓' },
    { n:'06', color:'#3B82F6', label:'LAUNCH & EVOLVE', title:'Go live. Then keep improving.', desc:'We deploy to the cloud, monitor performance, and continue improving as your business and users evolve.', tags:['Deployment','Monitoring','Support','Improvements'], icon:'↗' }
  ];
  steps.forEach(function(step, index){
    const item = document.createElement('div');
    item.className = 'process-step';
    item.dataset.index = index;
    item.style.setProperty('--step-color', step.color);
    item.innerHTML = '<div class="process-node">' + step.n + '</div><article class="process-card"><div class="process-icon">' + step.icon + '</div><div class="process-body"><div class="process-label">' + step.label + '</div><h3>' + step.title + '</h3><p>' + step.desc + '</p><div class="process-tags">' + step.tags.map(function(tag){ return '<span>' + tag + '</span>'; }).join('') + '</div></div></article>';
    stepsRoot.appendChild(item);
  });

  const items = Array.from(document.querySelectorAll('.process-step'));
  const railFill = document.getElementById('processRailFill');
  function updateRail(){
    const bounds = document.getElementById('processTimeline').getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight * .62 - bounds.top) / bounds.height, 0), 1);
    railFill.style.height = (progress * 100) + '%';
    let nearest = 0;
    let distance = Infinity;
    items.forEach(function(item, index){
      const rect = item.getBoundingClientRect();
      const next = Math.abs(rect.top + rect.height / 2 - window.innerHeight * .62);
      if (next < distance){ distance = next; nearest = index; }
    });
    items.forEach(function(item, index){ item.classList.toggle('active', index === nearest); });
  }
  if (reducedMotion){
    railFill.style.height = '100%';
    items.forEach(function(item){ item.classList.add('active'); });
  } else {
    window.addEventListener('scroll', updateRail, { passive:true });
    window.addEventListener('resize', updateRail);
    updateRail();
  }

  if (!reducedMotion){
    visual.addEventListener('pointermove', function(event){
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      visual.style.setProperty('--visual-x', (y * -12) + 'deg');
      visual.style.setProperty('--visual-y', (x * 16) + 'deg');
    });
    visual.addEventListener('pointerleave', function(){
      visual.style.setProperty('--visual-x', '0deg');
      visual.style.setProperty('--visual-y', '0deg');
    });
    document.addEventListener('pointermove', function(event){
      const card = event.target.closest('.process-card');
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.transform = 'rotateX(' + (-y * 3) + 'deg) rotateY(' + (x * 4) + 'deg)';
    });
    document.addEventListener('pointerout', function(event){
      const card = event.target.closest('.process-card');
      if (card && !card.contains(event.relatedTarget)) card.style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  if (!reducedMotion){
    const canvas = document.getElementById('processCanvas');
    const context = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    function resize(){
      width = canvas.width = section.clientWidth;
      height = canvas.height = section.clientHeight;
      particles = Array.from({length:Math.max(28, Math.floor(width / 42))}, function(){ return { x:Math.random()*width, y:Math.random()*height, length:30+Math.random()*70, speed:.35+Math.random()*.8, color:Math.random()>.5?'34,211,238':'139,124,255', alpha:.06+Math.random()*.1 }; });
    }
    function draw(){
      context.clearRect(0,0,width,height);
      particles.forEach(function(p){
        const gradient = context.createLinearGradient(p.x,p.y,p.x,p.y+p.length);
        gradient.addColorStop(0,'rgba('+p.color+',0)'); gradient.addColorStop(.5,'rgba('+p.color+','+p.alpha+')'); gradient.addColorStop(1,'rgba('+p.color+',0)');
        context.strokeStyle = gradient; context.lineWidth = 1.2; context.beginPath(); context.moveTo(p.x,p.y); context.lineTo(p.x,p.y+p.length); context.stroke();
        p.y += p.speed; if (p.y > height) { p.y = -p.length; p.x = Math.random()*width; }
      });
      requestAnimationFrame(draw);
    }
    resize(); window.addEventListener('resize', resize); draw();
  }
})();

/* ---- Hero canvas scene (three.js) ---- */
(function(){
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('sceneCanvas');
  const spotlight = document.getElementById('spotlight');
  const heading = document.getElementById('heroHeading');

  /* ---------------- cursor spotlight + heading tilt (plain DOM, always active) ---------------- */
  window.addEventListener('pointermove', function(e){
    const rect = stage.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--mx', px + '%');
    spotlight.style.setProperty('--my', py + '%');

    if (!prefersReducedMotion){
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      heading.style.transform = 'rotateY(' + (nx*6) + 'deg) rotateX(' + (-ny*5) + 'deg)';
    }
  });

  // extruded 3D text-shadow depth for the heading (built once)
  (function buildExtrusion(){
    const steps = 10;
    const shadows = [];
    for (let i = 1; i <= steps; i++){
      const t = i / steps;
      // interpolate cyan -> deep blue for the extrusion depth
      const r = Math.round(34 + (30-34)*t);
      const g = Math.round(211 + (58-211)*t);
      const b = Math.round(238 + (138-238)*t);
      shadows.push(i + 'px ' + i + 'px 0 rgba(' + r + ',' + g + ',' + b + ',0.35)');
    }
    shadows.push('16px 16px 24px rgba(0,0,0,0.45)');
    heading.style.textShadow = shadows.join(', ');
  })();

  /* ---------------- click ripple (anywhere on stage) ---------------- */
  stage.addEventListener('click', function(e){
    const r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    r.style.setProperty('--ripple-color', currentAccentHex());
    document.body.appendChild(r);
    setTimeout(function(){ r.remove(); }, 700);
  });

  let accentPaletteIndex = 0;
  const palette = ['#22D3EE', '#8B7CFF', '#FF6FA5', '#FFD166', '#34D399'];
  function currentAccentHex(){ return palette[accentPaletteIndex]; }

  /* ================= 3D SCENE ================= */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize(){
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const pl1 = new THREE.PointLight(0x22D3EE, 1.3, 16);
  pl1.position.set(4, 2, 4);
  scene.add(pl1);
  const pl2 = new THREE.PointLight(0x3B82F6, 0.9, 16);
  pl2.position.set(-5, -2, 3);
  scene.add(pl2);

  /* ---------------- LAYER 1 (far): antigravity particles ---------------- */
  const bgLayer = new THREE.Group();
  scene.add(bgLayer);

  const COUNT = 650;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  const phases = new Float32Array(COUNT);
  const colors = new Float32Array(COUNT * 3);
  const cyanC = new THREE.Color(0x22D3EE);
  const whiteC = new THREE.Color(0xE8F6FA);
  const TOP = 8, BOTTOM = -8;

  for (let i = 0; i < COUNT; i++){
    positions[i*3]   = (Math.random() - 0.5) * 22;
    positions[i*3+1] = BOTTOM + Math.random() * (TOP - BOTTOM);
    positions[i*3+2] = (Math.random() - 0.5) * 10 - 2;
    speeds[i] = 0.15 + Math.random() * 0.4;
    phases[i] = Math.random() * Math.PI * 2;
    const c = Math.random() > 0.75 ? cyanC : whiteC;
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
  }
  const bgGeo = new THREE.BufferGeometry();
  bgGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  bgGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const bgMat = new THREE.PointsMaterial({
    size: 0.05, vertexColors: true, transparent: true, opacity: 0.65,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  });
  bgLayer.add(new THREE.Points(bgGeo, bgMat));

  /* ---------------- LAYER 2 (mid): clickable network sphere ---------------- */
  const midLayer = new THREE.Group();
  // on narrow phones the camera's horizontal frustum is much tighter, so the
  // desktop x-offset pushes the globe off-screen entirely — bring it back
  // toward center and lower, so it settles near the bottom of the hero instead
  const midBasePos = window.innerWidth <= 720
    ? { x: 0, y: -2.4 }
    : { x: 3.6, y: 0.3 };
  midLayer.position.set(midBasePos.x, midBasePos.y, -1);
  scene.add(midLayer);

  const NODE_COUNT = 150;
  const RADIUS = 2.1;
  const nodePositions = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++){
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    nodePositions.push(new THREE.Vector3(x, y, z).multiplyScalar(RADIUS));
  }
  const lineVerts = [];
  const MAX_DIST = 1.05;
  for (let i = 0; i < nodePositions.length; i++){
    for (let j = i + 1; j < nodePositions.length; j++){
      if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_DIST){
        lineVerts.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
        lineVerts.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x2B4A63, transparent: true, opacity: 0.5 });
  const networkLines = new THREE.LineSegments(lineGeo, lineMat);
  midLayer.add(networkLines);

  const nodePosArray = new Float32Array(NODE_COUNT * 3);
  const nodeColorArray = new Float32Array(NODE_COUNT * 3);
  const baseNodeColor = new THREE.Color(0x7FA8C9);
  for (let i = 0; i < NODE_COUNT; i++){
    nodePosArray[i*3] = nodePositions[i].x;
    nodePosArray[i*3+1] = nodePositions[i].y;
    nodePosArray[i*3+2] = nodePositions[i].z;
    nodeColorArray[i*3] = baseNodeColor.r; nodeColorArray[i*3+1] = baseNodeColor.g; nodeColorArray[i*3+2] = baseNodeColor.b;
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3));
  nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColorArray, 3));
  const nodeMat = new THREE.PointsMaterial({
    size: 0.09, vertexColors: true, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  });
  const nodePoints = new THREE.Points(nodeGeo, nodeMat);
  midLayer.add(nodePoints);

  /* ---------------- theme-aware recolor ---------------- */
  // most bg particles render near-white by design (readable on the dark
  // starfield) — on a light page background that's white-on-white and
  // disappears, so swap in richer, darker tones when data-theme="light"
  function applyHeroTheme(isLight){
    const cA = isLight ? new THREE.Color(0x2563EB) : cyanC;
    const cB = isLight ? new THREE.Color(0x475569) : whiteC;
    const colorAttr = bgGeo.attributes.color;
    for (let i = 0; i < COUNT; i++){
      const c = (i % 4 === 0) ? cA : cB;
      colorAttr.array[i*3] = c.r; colorAttr.array[i*3+1] = c.g; colorAttr.array[i*3+2] = c.b;
    }
    colorAttr.needsUpdate = true;
    bgMat.opacity = isLight ? 0.85 : 0.65;

    lineMat.color.set(isLight ? 0x94A8C9 : 0x2B4A63);
    lineMat.opacity = isLight ? 0.6 : 0.5;

    const nodeColor = isLight ? new THREE.Color(0x2E5FA3) : baseNodeColor;
    const nodeColorAttr = nodeGeo.attributes.color;
    for (let i = 0; i < NODE_COUNT; i++){
      nodeColorAttr.array[i*3] = nodeColor.r; nodeColorAttr.array[i*3+1] = nodeColor.g; nodeColorAttr.array[i*3+2] = nodeColor.b;
    }
    nodeColorAttr.needsUpdate = true;
  }
  applyHeroTheme(document.documentElement.getAttribute('data-theme') === 'light');
  document.documentElement.addEventListener('rd-theme-change', function(e){
    applyHeroTheme(e.detail.theme === 'light');
  });

  /* ---------------- LAYER 3 (near): tech stack logo sprites ---------------- */
  const nearLayer = new THREE.Group();
  scene.add(nearLayer);

  function makeLogoTexture(source, color){
    const logoUrl = source.indexOf('://') !== -1
      ? source
      : 'https://cdn.simpleicons.org/' + source + '/' + color.replace('#', '');
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 128;
    logoCanvas.height = 128;
    const texture = new THREE.CanvasTexture(logoCanvas);
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = function(){
      const context = logoCanvas.getContext('2d');
      const padding = 10;
      const size = Math.min(image.width, image.height);
      const scale = (logoCanvas.width - padding * 2) / size;
      const width = image.width * scale;
      const height = image.height * scale;
      context.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
      context.drawImage(image, (logoCanvas.width - width) / 2, (logoCanvas.height - height) / 2, width, height);
      texture.needsUpdate = true;
    };
    image.src = logoUrl;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  const techSpecs = [
    { slug: 'react',         color: '#61DAFB', pos: [-1.4,  2.4, -1.9] },
    { slug: 'nextdotjs',     color: '#EDEDED', pos: [-2.1, -1.5, -2.3] },
    { slug: 'openjdk',       color: '#F89820', pos: [-2.9,  3.2, -3.0] },
    { slug: 'spring',        color: '#6DB33F', pos: [8.7,  0.3, -2.6] },
    { slug: 'tensorflow',    color: '#C58CFF', pos: [ 6.5,  2.7, -1.9] },
    { slug: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: '#0EA5E9', pos: [ 5.7, -2.3, -2.4] },
    { slug: 'googlecloud',   color: '#4FC3F7', pos: [ 1.7,  3.5, -2.1] },
    { slug: 'vite',          color: '#BD8CFF', pos: [ 2.5, -3.3, -1.5] },
    { slug: 'nodedotjs',     color: '#68A063', pos: [-1.9, -3.6, -2.9] },
    { slug: 'python',        color: '#4B8BBE', pos: [ 4.7,  3.7, -2.7] }
  ];

  const badges = [];
  techSpecs.forEach(function(spec, i){
    const texture = makeLogoTexture(spec.slug, spec.color);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    const baseScale = 0.72;
    sprite.scale.set(baseScale, baseScale, 1);
    sprite.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
    sprite.userData = { phase: i * 0.65, baseScale: baseScale };
    nearLayer.add(sprite);
    badges.push(sprite);
  });

  /* ---------------- mouse-driven parallax + hover highlight ---------------- */
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2(0, 0);
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 1);
  const mouseWorld = new THREE.Vector3(999, 999, 999);
  let mx = 0, my = 0;

  window.addEventListener('pointermove', function(e){
    const rect = stage.getBoundingClientRect();
    mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseNDC.set(mx, my);
  });

  /* ---------------- click-to-glow on the network sphere ---------------- */
  let flashStart = -9999;
  let highlight = new THREE.Color(palette[0]);

  stage.addEventListener('click', function(e){
    scene.updateMatrixWorld(true);
    const worldPos = new THREE.Vector3();
    midLayer.getWorldPosition(worldPos);
    const proj = worldPos.clone().project(camera);
    const rect = stage.getBoundingClientRect();
    const screenX = (proj.x * 0.5 + 0.5) * rect.width + rect.left;
    const screenY = (-proj.y * 0.5 + 0.5) * rect.height + rect.top;
    const dist = Math.hypot(e.clientX - screenX, e.clientY - screenY);

    if (dist < 260){
      accentPaletteIndex = (accentPaletteIndex + 1) % palette.length;
      const next = new THREE.Color(palette[accentPaletteIndex]);
      highlight = next;
      lineMat.color.set(next);
      pl1.color.set(next);
      flashStart = performance.now();
    }
  });

  let curBgX = 0, curBgY = 0;
  let curMidX = 0, curMidY = 0, curMidRotY = 0, curMidRotX = 0;
  let curNearX = 0, curNearY = 0;
  let curCamX = 0, curCamY = 0;

  let t = 0;
  function animate(){
    t += 0.016;

    if (!prefersReducedMotion){
      for (let i = 0; i < COUNT; i++){
        let y = bgGeo.attributes.position.array[i*3+1] + speeds[i] * 0.02;
        if (y > TOP) y = BOTTOM;
        bgGeo.attributes.position.array[i*3+1] = y;
        bgGeo.attributes.position.array[i*3] += Math.sin(t * 0.6 + phases[i]) * 0.0015;
      }
      bgGeo.attributes.position.needsUpdate = true;

      networkLines.rotation.y += 0.0013;
      nodePoints.rotation.y += 0.0013;

      badges.forEach(function(b){
        b.position.y += Math.sin(t * 0.7 + b.userData.phase) * 0.0022;
        const pulse = 1 + Math.sin(t * 1.6 + b.userData.phase) * 0.03;
        b.scale.set(b.scale.x, b.userData.baseScale * pulse, 1);
      });

      curBgX += (mx * 0.7 - curBgX) * 0.03;
      curBgY += (my * 0.5 - curBgY) * 0.03;
      bgLayer.position.x = curBgX;
      bgLayer.position.y = curBgY;

      curMidX += (mx * 1.1 - curMidX) * 0.045;
      curMidY += (my * 0.7 - curMidY) * 0.045;
      curMidRotY += (mx * 0.35 - curMidRotY) * 0.05;
      curMidRotX += (-my * 0.22 - curMidRotX) * 0.05;
      midLayer.position.x = midBasePos.x + curMidX * 0.4;
      midLayer.position.y = midBasePos.y + curMidY * 0.4;
      midLayer.rotation.y = curMidRotY;
      midLayer.rotation.x = curMidRotX;

      curNearX += (mx * 1.8 - curNearX) * 0.06;
      curNearY += (my * 1.3 - curNearY) * 0.06;
      nearLayer.position.x = curNearX;
      nearLayer.position.y = curNearY;

      curCamX += (mx * 0.5 - curCamX) * 0.03;
      curCamY += (my * 0.3 - curCamY) * 0.03;
      camera.position.x = curCamX;
      camera.position.y = curCamY;
      camera.lookAt(0, 0, 0);

      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, mouseWorld);
      const localMouse = midLayer.worldToLocal(mouseWorld.clone());

      const flashElapsed = performance.now() - flashStart;
      const flashProgress = Math.min(1, flashElapsed / 650);
      const flashMix = flashStart > 0 ? (1 - flashProgress) : 0;

      const colAttr = nodeGeo.attributes.color;
      const posAttr = nodeGeo.attributes.position;
      for (let i = 0; i < NODE_COUNT; i++){
        const px = nodePositions[i].x, py = nodePositions[i].y, pz = nodePositions[i].z;
        const dist = Math.sqrt((px-localMouse.x)**2 + (py-localMouse.y)**2 + (pz-localMouse.z)**2);
        const hoverMix = Math.max(0, 1 - dist / 1.6);
        const mix = Math.max(hoverMix, flashMix);

        colAttr.array[i*3]   = baseNodeColor.r + (highlight.r - baseNodeColor.r) * mix;
        colAttr.array[i*3+1] = baseNodeColor.g + (highlight.g - baseNodeColor.g) * mix;
        colAttr.array[i*3+2] = baseNodeColor.b + (highlight.b - baseNodeColor.b) * mix;

        const pop = mix * 0.15;
        const len = Math.sqrt(px*px+py*py+pz*pz) || 1;
        posAttr.array[i*3]   = px + (px/len) * pop;
        posAttr.array[i*3+1] = py + (py/len) * pop;
        posAttr.array[i*3+2] = pz + (pz/len) * pop;
      }
      colAttr.needsUpdate = true;
      posAttr.needsUpdate = true;
    }

    renderer.render(scene, camera);
    if (heroVisible){
      heroRaf = requestAnimationFrame(animate);
    } else {
      heroRaf = null;
    }
  }

  // stop rendering the WebGL scene entirely once the hero scrolls out of view
  let heroVisible = true, heroRaf = null;
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      heroVisible = entries[0].isIntersecting;
      if (heroVisible && heroRaf === null) animate();
    }, { threshold: 0 }).observe(stage);
  }

  animate();

  /* ---------------- magnetic buttons ---------------- */
  function magnetize(el, strength, radius){
    el.addEventListener('mousemove', function(e){
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width/2);
      const relY = e.clientY - (r.top + r.height/2);
      const dist = Math.sqrt(relX*relX + relY*relY);
      if (dist < radius){
        el.style.transform = 'translate(' + (relX*strength) + 'px,' + (relY*strength) + 'px)';
      }
    });
    el.addEventListener('mouseleave', function(){
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = 'translate(0px, 0px)';
      setTimeout(function(){ el.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease'; }, 400);
    });
  }
  if (!prefersReducedMotion){
    magnetize(document.getElementById('btnPrimary'), 0.35, 90);
    magnetize(document.getElementById('btnSecondary'), 0.3, 80);
    magnetize(document.getElementById('navCta'), 0.3, 70);
  }
})();

/* ---- Services orbit controls ---- */
(function(){
  const serviceControls = document.querySelectorAll('[data-service]');
  const serviceVisual = document.querySelector('.services-visual');
  const serviceConsole = document.querySelector('.service-console');

  serviceControls.forEach(function(control){
    control.addEventListener('click', function(){
      const selected = control.dataset.service;
      serviceControls.forEach(function(item){
        item.classList.toggle('is-active', item.dataset.service === selected);
      });
    });
  });

  if (serviceVisual && serviceConsole && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    serviceVisual.addEventListener('pointermove', function(event){
      const bounds = serviceVisual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      serviceConsole.style.transform = 'translate(-50%, -50%) rotateX(' + (8 - y * 10) + 'deg) rotateY(' + (-12 + x * 16) + 'deg)';
    });
    serviceVisual.addEventListener('pointerleave', function(){
      serviceConsole.style.transform = 'translate(-50%, -50%) rotateX(8deg) rotateY(-12deg)';
    });
  }
})();

/* ---- Selected work / project list ---- */
(function(){
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projects = [
    { tag:'Point of Sale & Business Management', title:'POS', desc:'A modern business platform designed to manage products, inventory, sales, and operational workflows through a scalable digital architecture.', tech:'Java · Spring Boot · React · Microservices · PostgreSQL · Azure', accent:'#22D3EE', icon:'▦' },
    { tag:'Dental Website', title:'apsuperspeciality', desc:'A modern web experience focused on simplifying healthcare workflows through intuitive interfaces and connected digital functionality.', tech:'React · TypeScript · APIs · Azure', accent:'#C58CFF', icon:'✦' },
    { tag:'AI-Powered Digital Wellness', title:'AI Therapist', desc:'An intelligent digital platform designed to connect users with AI-powered conversational experiences and personalized interactions.', tech:'React · Next.js · .NET · AI · Azure', accent:'#FFD166', icon:'◉' },
    { tag:'Digital Hostel Management System', title:'Hostlify', desc:'A centralized management solution designed to simplify hostel operations, data management, reporting, and day-to-day workflows.', tech:'Zoho Creator · Zoho Analytics · Business Automation', accent:'#2DD4BF', icon:'▱' },
    { tag:'Fashion & Clothing Website', title:'Radhakrishna Fashions', desc:'A fashion-focused website designed to present clothing collections through a polished, accessible, and brand-led digital experience.', tech:'Fashion Catalog · Responsive Design · Product Presentation', accent:'#F472B6', icon:'◇', url:'https://www.rkfashions.shop/' }
  ];
  const list = document.getElementById('projectList');
  const panel = document.getElementById('previewPanel');
  const icon = document.getElementById('pvIcon');
  const glow = document.getElementById('pvGlow');
  const tag = document.getElementById('pvTag');
  const title = document.getElementById('pvTitle');
  const desc = document.getElementById('pvDesc');
  const tech = document.getElementById('pvTech');
  const previewLink = document.getElementById('pvLink');
  let activeIndex = 0;

  function arrow(){ return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'; }
  function setActive(index){
    activeIndex = index;
    const project = projects[index];
    list.querySelectorAll('.project-row').forEach(function(row, rowIndex){ row.classList.toggle('active', rowIndex === index); });
    panel.style.setProperty('--pv-accent', project.accent);
    icon.textContent = project.icon;
    tag.textContent = project.tag;
    title.textContent = project.title;
    desc.textContent = project.desc;
    tech.textContent = project.tech;
    glow.style.background = 'radial-gradient(circle, ' + project.accent + ' 0%, transparent 70%)';
    previewLink.href = project.url || '#start-project';
    previewLink.target = project.url ? '_blank' : '';
    previewLink.rel = project.url ? 'noopener noreferrer' : '';
  }
  projects.forEach(function(project, index){
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'project-row' + (index === 0 ? ' active' : '');
    row.style.setProperty('--row-accent', project.accent);
    row.innerHTML = '<span class="row-num">0' + (index + 1) + '</span><span class="row-icon">' + project.icon + '</span><span class="row-text"><span class="row-tag">' + project.tag + '</span><span class="row-title">' + project.title + '</span></span><span class="row-arrow">' + arrow() + '</span>';
    row.addEventListener('click', function(){ setActive(index); });
    row.addEventListener('focus', function(){ setActive(index); });
    row.addEventListener('mouseenter', function(){ if (!window.matchMedia('(hover: none)').matches) setActive(index); });
    list.appendChild(row);

    const detail = document.createElement('div');
    detail.className = 'row-detail';
    detail.style.setProperty('--row-accent', project.accent);
    detail.innerHTML = '<div class="row-detail-inner">' + project.desc + '<div class="tech">' + project.tech + '</div><a href="' + (project.url || '#start-project') + '"' + (project.url ? ' target="_blank" rel="noopener noreferrer"' : '') + '>View Project ' + arrow() + '</a></div>';
    list.appendChild(detail);
  });
  setActive(activeIndex);

  if (!prefersReducedMotion){
    panel.addEventListener('pointermove', function(event){
      const bounds = panel.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      panel.style.transform = 'rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 5) + 'deg)';
    });
    panel.addEventListener('pointerleave', function(){ panel.style.transform = 'rotateX(0) rotateY(0)'; });
  }
})();

/* ---- Tech diagram ---- */
(function(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const REF_W = 1000, REF_H = 660;
  const HUB = { x: 500, y: 330 };

  const pipeLayer = document.getElementById('techPipeLayer');
  const nodeLayer = document.getElementById('techNodeLayer');
  const diagram = document.getElementById('techDiagram');
  const hub3d = document.getElementById('techHub');
  const caption = document.getElementById('techCaption');

  const icons = {
    browser: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.4"/><line x1="3" y1="8.4" x2="21" y2="8.4"/></svg>',
    server: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="6" rx="1"/><rect x="4" y="14" width="16" height="6" rx="1"/></svg>',
    db: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13"/></svg>',
    cloud: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.6-7.95A5 5 0 0 1 16 9a3.6 3.6 0 0 1 1 7v0H7z"/></svg>'
  };

  const isMobile = window.innerWidth <= 720;

  // top category cards feed INTO the hub
  const topCards = isMobile ? [
    { label:'Frontend', accent:'#22D3EE', x:260, y:55, icon:icons.browser, blurb:'Interfaces people enjoy using — React, Next.js, TypeScript and more.' },
    { label:'Backend', accent:'#8B7CFF', x:740, y:55, icon:icons.server, blurb:'Reliable architectures powering the logic behind your product.' },
    { label:'Database', accent:'#2DD4BF', x:260, y:180, icon:icons.db, blurb:'Data systems structured for performance and growth.' },
    { label:'Cloud & Infra', accent:'#FFD166', x:740, y:180, icon:icons.cloud, blurb:'Modern cloud practices built for reliability and delivery.' }
  ] : [
    { label:'Frontend', accent:'#22D3EE', x:150, y:76, icon:icons.browser, blurb:'Interfaces people enjoy using — React, Next.js, TypeScript and more.' },
    { label:'Backend', accent:'#8B7CFF', x:383, y:76, icon:icons.server, blurb:'Reliable architectures powering the logic behind your product.' },
    { label:'Database', accent:'#2DD4BF', x:616, y:76, icon:icons.db, blurb:'Data systems structured for performance and growth.' },
    { label:'Cloud & Infra', accent:'#FFD166', x:850, y:76, icon:icons.cloud, blurb:'Modern cloud practices built for reliability and delivery.' }
  ];

  // chips grouped by category, rendered as tiles fed OUT from the hub
  // on mobile only the top couple of each category are shown — 21 tiles
  // simply don't fit a ~300px-wide diagram without overlapping
  const chipGroups = [
    { category:'Frontend', accent:'#22D3EE', chips: isMobile ? ['React','Next.js'] : ['React','Next.js','TypeScript','JavaScript'] },
    { category:'Backend', accent:'#8B7CFF', chips: isMobile ? ['Java','Node.js'] : ['Java','Spring Boot','Node.js','.NET'] },
    { category:'Database', accent:'#2DD4BF', chips: isMobile ? ['PostgreSQL','MongoDB'] : ['PostgreSQL','MySQL','MongoDB'] },
    { category:'Cloud & Infrastructure', accent:'#FFD166', chips: isMobile ? ['Azure','Docker'] : ['Azure','Docker','Kubernetes','CI/CD'] },
    { category:'AI & Intelligent Systems', accent:'#FF6FA5', chips: isMobile ? ['AI APIs'] : ['AI APIs','AI Assistants','Automation'] },
    { category:'Integrations & Platforms', accent:'#3B82F6', chips: isMobile ? ['REST APIs'] : ['REST APIs','Zoho','Payments'] }
  ];
  const bottomTiles = [];
  chipGroups.forEach(function(group){ group.chips.forEach(function(name){ bottomTiles.push({ label:name, accent:group.accent, category:group.category }); }); });

  if (isMobile){
    const perRow = 5, rowGap = 115, marginX = 80;
    bottomTiles.forEach(function(t, i){
      const row = Math.floor(i / perRow);
      const idxInRow = i % perRow;
      const countInRow = Math.min(perRow, bottomTiles.length - row * perRow);
      t.x = countInRow > 1 ? marginX + idxInRow * (REF_W - marginX * 2) / (countInRow - 1) : REF_W / 2;
      t.y = 490 + row * rowGap;
    });
  } else {
    const marginX = 60, rowGap = 88, perRow = Math.ceil(bottomTiles.length / 2);
    bottomTiles.forEach(function(t, i){
      const row = i < perRow ? 0 : 1;
      const idxInRow = i - row * perRow;
      const countInRow = row === 0 ? perRow : (bottomTiles.length - perRow);
      t.x = countInRow > 1 ? marginX + idxInRow * (REF_W - marginX * 2) / (countInRow - 1) : REF_W / 2;
      t.y = 540 + row * rowGap;
    });
  }

  function bezierIn(x, y){
    const c1x = x, c1y = y + (HUB.y - y) * 0.55;
    const c2x = HUB.x, c2y = HUB.y - (HUB.y - y) * 0.35;
    return 'M ' + x + ' ' + (y + 30) + ' C ' + c1x + ' ' + c1y + ', ' + c2x + ' ' + c2y + ', ' + HUB.x + ' ' + HUB.y;
  }
  function bezierOut(x, y){
    const c1x = HUB.x, c1y = HUB.y + (y - HUB.y) * 0.4;
    const c2x = x, c2y = y - (y - HUB.y) * 0.5;
    return 'M ' + HUB.x + ' ' + HUB.y + ' C ' + c1x + ' ' + c1y + ', ' + c2x + ' ' + c2y + ', ' + x + ' ' + (y - 34);
  }

  function addPipe(d, accent, dir){
    const base = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    base.setAttribute('d', d); base.setAttribute('class', 't-pipe-base');
    pipeLayer.appendChild(base);

    const core = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    core.setAttribute('d', d); core.setAttribute('class', 't-pipe-core');
    pipeLayer.appendChild(core);

    const sheen = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    sheen.setAttribute('d', d); sheen.setAttribute('class', 't-pipe-sheen');
    pipeLayer.appendChild(sheen);

    const flow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    flow.setAttribute('d', d);
    flow.setAttribute('class', 't-pipe-flow ' + dir);
    flow.setAttribute('stroke', accent);
    flow.setAttribute('stroke-width', '2.8');
    pipeLayer.appendChild(flow);

    return { base: base, flow: flow };
  }

  function addNode(html, x, y, accent, blurbHTML){
    const node = document.createElement('div');
    node.className = 't-node';
    node.style.left = (x / REF_W * 100) + '%';
    node.style.top = (y / REF_H * 100) + '%';
    node.style.setProperty('--n-accent', accent);
    node.innerHTML = html;
    nodeLayer.appendChild(node);

    const pair = { node: node, pipes: [] };
    node.addEventListener('mouseenter', function(){
      caption.innerHTML = blurbHTML;
      node.classList.add('hi');
      pair.pipes.forEach(function(p){ p.base.classList.add('hi'); p.flow.classList.add('hi'); });
    });
    node.addEventListener('mouseleave', function(){
      caption.textContent = 'Hover over any card or tile to explore our stack.';
      node.classList.remove('hi');
      pair.pipes.forEach(function(p){ p.base.classList.remove('hi'); p.flow.classList.remove('hi'); });
    });
    return pair;
  }

  topCards.forEach(function(c, i){
    const pipe = addPipe(bezierIn(c.x, c.y), c.accent, 'in');
    const html = '<div class="t-node-card" style="--n-delay:' + (i * 0.3) + 's"><span class="t-icon">' + c.icon + '</span><span class="t-label">' + c.label + '</span></div>';
    const pair = addNode(html, c.x, c.y, c.accent, '<b>' + c.label + '</b> — ' + c.blurb);
    pair.pipes.push(pipe);
  });

  bottomTiles.forEach(function(t){
    const pipe = addPipe(bezierOut(t.x, t.y), t.accent, 'out');
    const html = '<div class="t-node-tile"><span class="t-dot"></span>' + t.label + '</div>';
    const pair = addNode(html, t.x, t.y, t.accent, '<b>' + t.label + '</b> — part of our ' + t.category + ' expertise.');
    pair.pipes.push(pipe);
  });

  if (!reducedMotion){
    diagram.addEventListener('pointermove', function(event){
      const bounds = diagram.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      hub3d.style.transform = 'translate(-50%,-50%) rotateX(' + (-y * 14) + 'deg) rotateY(' + (x * 18) + 'deg)';
    });
    diagram.addEventListener('pointerleave', function(){ hub3d.style.transform = 'translate(-50%,-50%)'; });
  }
})();

/* ---- About monolith/cube ---- */
(function(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const monolith = document.getElementById('aboutMonolith');
  const tilt = document.getElementById('aboutTilt');
  const cube = document.getElementById('aboutCube');
  const tagsRoot = document.getElementById('aboutTags');
  const particlesRoot = document.getElementById('aboutParticles');

  const pillars = [
    { color:'#34D399', label:'Business First' },
    { color:'#FBBF24', label:'Built With Purpose' },
    { color:'#60A5FA', label:'Engineered To Grow' },
    { color:'#B07CFF', label:'A Partnership' }
  ];
  pillars.forEach(function(p){
    const tag = document.createElement('span');
    tag.style.setProperty('--t-color', p.color);
    tag.textContent = p.label;
    tagsRoot.appendChild(tag);
  });

  const particleColors = ['#34D399', '#FBBF24', '#60A5FA', '#B07CFF'];
  for (let i = 0; i < 10; i++){
    const dot = document.createElement('span');
    dot.className = 'about-particle';
    const color = particleColors[i % particleColors.length];
    dot.style.background = color;
    dot.style.boxShadow = '0 0 8px ' + color;
    dot.style.left = (8 + Math.random() * 84) + '%';
    dot.style.top = (6 + Math.random() * 88) + '%';
    dot.style.animationDelay = (Math.random() * -6) + 's';
    dot.style.animationDuration = (5 + Math.random() * 3) + 's';
    particlesRoot.appendChild(dot);
  }

  if (!reducedMotion){
    monolith.addEventListener('pointermove', function(event){
      const bounds = monolith.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      tilt.style.setProperty('--tilt-x', (y * -10) + 'deg');
      tilt.style.setProperty('--tilt-y', (x * 14) + 'deg');
    });
    monolith.addEventListener('pointerleave', function(){
      tilt.style.setProperty('--tilt-x', '0deg');
      tilt.style.setProperty('--tilt-y', '0deg');
    });
    monolith.addEventListener('click', function(){
      const playing = cube.style.animationPlayState !== 'paused';
      cube.style.animationPlayState = playing ? 'paused' : 'running';
    });
  }
})();

/* ---- Magnetize / interaction helpers ---- */
(function(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function magnetize(el, strength, radius){
    if (!el) return;
    el.addEventListener('mousemove', function(e){
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(relX * relX + relY * relY);
      if (dist < radius){
        el.style.transform = 'translate(' + (relX * strength) + 'px,' + (relY * strength) + 'px)';
      }
    });
    el.addEventListener('mouseleave', function(){
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = 'translate(0px, 0px)';
      setTimeout(function(){ el.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease'; }, 400);
    });
  }

  if (!reducedMotion){
    magnetize(document.getElementById('ctaStart'), 0.32, 90);
    magnetize(document.getElementById('ctaFab'), 0.4, 70);
  }

  /* ---------------- particle wave-terrain background ---------------- */
  const canvas = document.getElementById('contactNetwork');
  const section = document.getElementById('contact');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, raf = null;

  const ROWS = 26, COLS = 72;
  const horizonY = function(){ return h * 0.08; };
  const groundY = function(){ return h * 1.08; };

  let camX = 0, camY = 0, targetX = 0, targetY = 0;
  section.addEventListener('pointermove', function(e){
    const b = section.getBoundingClientRect();
    targetX = ((e.clientX - b.left) / b.width - 0.5) * 2;
    targetY = ((e.clientY - b.top) / Math.min(b.height, 700) - 0.5) * 2;
  });
  section.addEventListener('pointerleave', function(){ targetX = 0; targetY = 0; });

  function resize(){
    w = canvas.width = section.clientWidth;
    h = canvas.height = 600;
    canvas.style.height = h + 'px';
  }

  function step(t){
    const time = t * 0.00055;
    camX += (targetX - camX) * 0.05;
    camY += (targetY - camY) * 0.05;
    section.style.setProperty('--cam-x', camX.toFixed(3));
    section.style.setProperty('--cam-y', camY.toFixed(3));
    ctx.clearRect(0, 0, w, h);

    const parX = camX * w * 0.05;
    const parY = camY * h * 0.035;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // central flare glow
    const flareX = w * 0.5 + parX * 1.4, flareY = horizonY() + h * 0.02 + parY;
    const flarePulse = 0.85 + 0.15 * Math.sin(time * 2.2);
    const flare = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, w * 0.34 * flarePulse);
    if (isLight){
      flare.addColorStop(0, 'rgba(90,130,220,0.30)');
      flare.addColorStop(0.35, 'rgba(120,150,230,0.12)');
      flare.addColorStop(1, 'rgba(120,150,230,0)');
    } else {
      flare.addColorStop(0, 'rgba(255,255,255,0.55)');
      flare.addColorStop(0.35, 'rgba(190,210,255,0.16)');
      flare.addColorStop(1, 'rgba(190,210,255,0)');
    }
    ctx.fillStyle = flare;
    ctx.fillRect(0, 0, w, h);

    for (let r = 0; r < ROWS; r++){
      const dRaw = r / (ROWS - 1);
      const depth = Math.pow(dRaw, 1.6);
      const parallax = 0.25 + depth * 1.1;
      const rowY = horizonY() + (groundY() - horizonY()) * depth + parY * parallax;
      const halfSpread = (w * 0.03) + (w * 0.58) * Math.pow(dRaw, 1.15);
      const ampBase = 4 + 46 * depth;
      const rowCenterX = w / 2 + parX * parallax;

      for (let c = 0; c < COLS; c++){
        const u = c / (COLS - 1) - 0.5;
        const x = rowCenterX + u * halfSpread * 2;

        const wave =
          Math.sin(u * 9 + time * 1.7 + depth * 3) * ampBase * 0.6 +
          Math.sin(u * 3.2 - time * 1.1 + depth * 5) * ampBase * 0.4;
        const y = rowY + wave;

        const distFromFlare = Math.sqrt(Math.pow((x - flareX) / w, 2) + Math.pow((y - flareY) / h, 2) * 2.2);
        let bright = Math.max(0, 1 - distFromFlare * 2.1);
        bright = Math.pow(bright, 1.4) * (0.55 + 0.45 * (1 - depth));

        const hue = (200 + u * 140 + time * 40) % 360;
        const sat = bright > 0.35 ? 70 : 12;
        const light = isLight ? (72 - bright * 48) : (55 + bright * 45);
        const alpha = isLight ? (0.16 + bright * 0.7 + (1 - depth) * 0.04) : (0.12 + bright * 0.85 + (1 - depth) * 0.05);

        ctx.fillStyle = 'hsla(' + hue + ',' + sat + '%,' + light + '%,' + Math.min(alpha, 1) + ')';
        const size = 0.6 + depth * 1.6 + bright * 1.4;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!reducedMotion && visible){
      raf = requestAnimationFrame(step);
    } else {
      raf = null;
    }
  }

  // pause the animation loop entirely while the section is scrolled out of view
  let visible = true;
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      visible = entries[0].isIntersecting;
      if (visible && !reducedMotion && raf === null) raf = requestAnimationFrame(step);
    }, { threshold: 0 }).observe(section);
  }

  resize();
  window.addEventListener('resize', resize);
  if (reducedMotion){
    step(0);
    document.documentElement.addEventListener('rd-theme-change', function(){ step(0); });
  } else {
    raf = requestAnimationFrame(step);
  }
})();

/* ---- Contact section animations ---- */
(function(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headingWrap = document.getElementById('spHeadingWrap');
  const heading = document.getElementById('spTitle');
  const mailCta = document.getElementById('spMailCta');

  function magnetize(el, strength, radius){
    if (!el) return;
    el.addEventListener('mousemove', function(e){
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(relX * relX + relY * relY);
      if (dist < radius){
        el.style.transform = 'translate(' + (relX * strength) + 'px,' + (relY * strength) + 'px)';
      }
    });
    el.addEventListener('mouseleave', function(){
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = 'translate(0px, 0px)';
      setTimeout(function(){ el.style.transition = ''; }, 400);
    });
  }

  if (!reducedMotion){
    magnetize(mailCta, 0.25, 100);

    headingWrap.addEventListener('pointermove', function(event){
      const bounds = headingWrap.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      heading.style.setProperty('--sp-hx', (y * -10) + 'deg');
      heading.style.setProperty('--sp-hy', (x * 12) + 'deg');
    });
    headingWrap.addEventListener('pointerleave', function(){
      heading.style.setProperty('--sp-hx', '0deg');
      heading.style.setProperty('--sp-hy', '0deg');
    });
  }

  /* ---------------- illustration: cursor tilt + scroll-in reveal ---------------- */
  const spVisual = document.getElementById('spVisual');
  const spVisualFrame = document.getElementById('spVisualFrame');

  if (!reducedMotion){
    spVisual.addEventListener('pointermove', function(event){
      const bounds = spVisual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      spVisualFrame.style.setProperty('--sp-vx', (y * -12) + 'deg');
      spVisualFrame.style.setProperty('--sp-vy', (x * 14) + 'deg');
    });
    spVisual.addEventListener('pointerleave', function(){
      spVisualFrame.style.setProperty('--sp-vx', '0deg');
      spVisualFrame.style.setProperty('--sp-vy', '0deg');
    });
  }

  if (reducedMotion){
    spVisual.classList.add('is-visible');
  } else if ('IntersectionObserver' in window){
    const visualObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          spVisual.classList.add('is-visible');
          visualObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    visualObserver.observe(spVisual);
  } else {
    spVisual.classList.add('is-visible');
  }

  /* ---------------- twinkling starfield ---------------- */
  const starCanvas = document.getElementById('spStarfield');
  const starSection = document.getElementById('start-project');
  const sctx = starCanvas.getContext('2d');
  let sw = 0, sh = 0, stars = [];

  function resizeStars(){
    sw = starCanvas.width = starSection.clientWidth;
    sh = starCanvas.height = starSection.clientHeight;
    const count = Math.max(60, Math.floor((sw * sh) / 9000));
    stars = Array.from({ length: count }, function(){
      return {
        x: Math.random() * sw,
        y: Math.random() * sh,
        r: 0.5 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.2
      };
    });
  }

  function drawStars(t){
    sctx.clearRect(0, 0, sw, sh);
    const time = t * 0.001;
    for (let i = 0; i < stars.length; i++){
      const s = stars[i];
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * s.speed + s.phase));
      sctx.fillStyle = 'rgba(210,225,255,' + (twinkle * 0.85) + ')';
      sctx.beginPath();
      sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      sctx.fill();
    }
    starsRunning = !reducedMotion && starsVisible;
    if (starsRunning) requestAnimationFrame(drawStars);
  }

  let starsVisible = true, starsRunning = false;
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      starsVisible = entries[0].isIntersecting;
      if (starsVisible && !reducedMotion && !starsRunning) requestAnimationFrame(drawStars);
    }, { threshold: 0 }).observe(starSection);
  }

  resizeStars();
  window.addEventListener('resize', resizeStars);
  requestAnimationFrame(drawStars);
})();

/* ---- Pointer-based cursor interactions ---- */
(function(){
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (reducedMotion || !hasFinePointer) return;

  var canvas = document.getElementById('cursorAura');
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var mx = -999, my = -999, active = false;
  var raf = null;

  function resize(){
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('pointermove', function(e){
    if (e.pointerType && e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY;
    active = true;
    if (raf === null) raf = requestAnimationFrame(draw);
    for (var i = 0; i < 2; i++){
      particles.push({
        x: mx + (Math.random() - 0.5) * 6,
        y: my + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.15,
        size: 16 + Math.random() * 20,
        life: 1,
        hue: Math.random() > 0.35 ? 262 : 190
      });
    }
    if (particles.length > 140) particles.splice(0, particles.length - 140);
  }, { passive: true });

  window.addEventListener('pointerleave', function(){ active = false; });
  window.addEventListener('blur', function(){ active = false; });

  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (var i = particles.length - 1; i >= 0; i--){
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.size *= 1.012;
      p.life *= 0.93;
      if (p.life < 0.03){ particles.splice(i, 1); continue; }

      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      var alpha = p.life * 0.4;
      grad.addColorStop(0, 'hsla(' + p.hue + ',90%,72%,' + alpha + ')');
      grad.addColorStop(0.5, 'hsla(' + p.hue + ',85%,55%,' + (alpha * 0.45) + ')');
      grad.addColorStop(1, 'hsla(' + p.hue + ',85%,45%,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (active){
      var core = ctx.createRadialGradient(mx, my, 0, mx, my, 22);
      core.addColorStop(0, 'rgba(255,255,255,0.9)');
      core.addColorStop(0.35, 'hsla(262,90%,75%,0.55)');
      core.addColorStop(1, 'hsla(262,90%,60%,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(mx, my, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    if (active || particles.length){
      raf = requestAnimationFrame(draw);
    } else {
      raf = null;
    }
  }
  raf = requestAnimationFrame(draw);
})();

/* ---- Scroll up/down nav buttons ---- */
(function(){
  const upBtn = document.getElementById('scrollUpBtn');
  const downBtn = document.getElementById('scrollDownBtn');
  const sections = Array.prototype.slice.call(document.querySelectorAll('body > div#stage, body > section, body > footer'));

  function currentIndex(){
    const y = window.scrollY + window.innerHeight * 0.3;
    let idx = 0;
    for (let i = 0; i < sections.length; i++){
      if (sections[i].offsetTop <= y) idx = i;
    }
    return idx;
  }

  function sync(){
    const scrolled = window.scrollY > window.innerHeight * 0.6;
    upBtn.classList.toggle('is-visible', scrolled);

    const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40;
    downBtn.classList.toggle('is-visible', !nearBottom);
  }
  sync();
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);

  upBtn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  downBtn.addEventListener('click', function(){
    const idx = currentIndex();
    const next = sections[idx + 1];
    if (next){
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  });
})();
