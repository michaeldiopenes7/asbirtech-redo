var container;
var camera, scene, renderer;
var uniforms;
var startTime;

var cols = 5.0;
var rows = 3.0;

init();
animate();

function init() {
  container = document.getElementById('bg-canvas');

  startTime = Date.now();
  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    time:       { type: 'f',  value: 1.0 },
    resolution: { type: 'v2', value: new THREE.Vector2() },
    colsrows:   { type: 'v2', value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial({
    uniforms:       uniforms,
    vertexShader:   document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  uniforms.resolution.value.x = w;
  uniforms.resolution.value.y = h;
  uniforms.colsrows.value.x   = cols;
  uniforms.colsrows.value.y   = rows;

  renderer.setSize(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var elapsed = (Date.now() - startTime) / 1000.0;
  uniforms.time.value = elapsed;
  renderer.render(scene, camera);
}
