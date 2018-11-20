const directional_intensity = 1.5;
const point_intensity = 2;

var camera, pauseCamera, scene, renderer, controls;

var board, rubik, ball;

var d_light, p_light;

var clock, delta;

var boardMaterials = [];

var cubeMaterials = [];

var ballMaterials = [];


function createPerspectiveCamera(fov, aspect, near, far, x, y, z) {
	'use strict';
	
	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	
	camera.position.set(x,y,z);
	
	camera.lookAt(scene.position);
	
	return camera;
}

function createOrthographicCamera(viewsize, near, far, x, y, z){
	'use strict';
	
	var aspectratio = window.innerWidth/window.innerHeight;
	
	var camera = new THREE.OrthographicCamera(-aspectratio*viewsize/2, aspectratio*viewsize/2, viewsize/2, -viewsize/2, near, far);
	
	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	
	camera.lookAt(scene.position);
	
	return camera;
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	
	var textureLoader = new THREE.TextureLoader();

	//BOARD
	var boardTexture = new textureLoader.load("textures/boardTexture.png");
	
	boardMaterials[0] = new THREE.MeshBasicMaterial({map: boardTexture});
	boardMaterials[1] = new THREE.MeshPhongMaterial({map: boardTexture, shininess:5});
	
	//CUBE
	var red = new textureLoader.load("textures/red.png");
	var green = new textureLoader.load("textures/green.png");
	var blue = new textureLoader.load("textures/blue.png");
	var yellow = new textureLoader.load("textures/yellow.png");
	var orange = new textureLoader.load("textures/orange.png");
	var white = new textureLoader.load("textures/white.png");
	var cubeBump = new textureLoader.load("textures/bump_map.jpeg");
	
	cubeMaterials[0] = new THREE.MeshBasicMaterial({map: red});
	cubeMaterials[1] = new THREE.MeshBasicMaterial({map: green});
	cubeMaterials[2] = new THREE.MeshBasicMaterial({map: blue});
	cubeMaterials[3] = new THREE.MeshBasicMaterial({map: yellow});
	cubeMaterials[4] = new THREE.MeshBasicMaterial({map: orange});
	cubeMaterials[5] = new THREE.MeshBasicMaterial({map: white});
		
	cubeMaterials[6] = new THREE.MeshPhongMaterial({map: red, bumpMap: cubeBump, shininess:30});
	cubeMaterials[7] = new THREE.MeshPhongMaterial({map: green, bumpMap: cubeBump, shininess:30});
	cubeMaterials[8] = new THREE.MeshPhongMaterial({map: blue, bumpMap: cubeBump, shininess:30});
	cubeMaterials[9] = new THREE.MeshPhongMaterial({map: yellow, bumpMap: cubeBump, shininess:30});
	cubeMaterials[10] = new THREE.MeshPhongMaterial({map: orange, bumpMap: cubeBump, shininess:30});
	cubeMaterials[11] = new THREE.MeshPhongMaterial({map: white, bumpMap: cubeBump, shininess:30});
	
	//BALL
	var ballTexture = new textureLoader.load("textures/Ball2.jpg");

	ballMaterials[0] = new THREE.MeshBasicMaterial({map: ballTexture});
	ballMaterials[1] = new THREE.MeshPhongMaterial({map: ballTexture, shininess:70});
	
	//Objects
	board = new Chessboard(0, 0, 0, boardMaterials);
	scene.add(board);
	
	rubik = new Rubik(-5, 3, 5, cubeMaterials);
	scene.add(rubik);
	
	ball = new Ball(-5, 2.5, 15, ballMaterials);
	scene.add(ball);
	
	d_light = new THREE.DirectionalLight(0xf8f8b8, directional_intensity);
	d_light.position.set(1,1,1);
	scene.add(d_light);
	
	p_light = new THREE.PointLight(0xffffff, point_intensity, 200, 1);
	p_light.position.set(15, 2.5, -15);
	scene.add(p_light);
	
	scene.add(new THREE.AxesHelper(30));
}

function switchLight(light, intensity) {
	'use strict';
	
	if(light.intensity != 0) {
		light.intensity = 0;
	}
	else {
		light.intensity = intensity;
	}
}

function switchLightingCalc() {
	'use strict';
	
	board.changeMaterial();
	rubik.changeMaterial();
	ball.changeMaterial();
}

function reset() {
	'use strict';
	
	if(!clock.running) {
		'use strict';
		
		board.children[0].material = board.materials[1];
		rubik.children[0].material = rubik.materials.slice(6);
		ball.children[0].material = ball.materials[1];
		
		ball.step = 0;
		ball.rotation.set(0,0,0);
		ball.children[0].rotation.z = 0;
		ball.speed = 0;
		ball.moving = false;
		
		d_light.intensity = directional_intensity;
		p_light.intensity = point_intensity;
		
		camera.position.set(50, 50, 50);
		
		controls.autoRotate = true;
		
		clock = new THREE.Clock(false);
		clock.start();
	}
}

function switchPausePlay() {
	'use strict';
	
	if(clock.running) {
		clock.stop();
		controls.autoRotate = false;
	}
	else {
		clock.start();
		controls.autoRotate = true;
	}
}

function switchWireframe() {
	'use strict';
	
	for(var i = 0; i < board.materials.length; i++) {
		board.materials[i].wireframe = !board.materials[i].wireframe;
		ball.materials[i].wireframe = !ball.materials[i].wireframe;
	}
	
	for(var i = 0; i < rubik.materials.length; i++) {
		rubik.materials[i].wireframe = !rubik.materials[i].wireframe;
	}
}

function onKeyDown(e) {
	'use strict';
	
	switch(e.keyCode) {
		
		case 65: //A (not needed)
			controls.autoRotate = !controls.autoRotate;
			break;
		
		case 66: //B
			ball.moving = !ball.moving;
			break;
		
		case 68: //D
			switchLight(d_light, directional_intensity);
			break;
		
		case 76: //L
			switchLightingCalc();
			break;
		
		case 80: //P
			switchLight(p_light, point_intensity);
			break;
		
		case 82: //R
			reset();
			break;
		
		case 83: //S
			switchPausePlay();
			//FIXME mensagem
			break;
		
		case 87: //W
			switchWireframe();
			break;
	}
}

function onResize() {
	'use strict';
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	camera.aspect = renderer.getSize().width / renderer.getSize().height;
	camera.updateProjectionMatrix();
}

function render() {
	'use strict';
	
	renderer.render(scene, camera);
	//renderer.render(scene, pauseCamera);
}

function init() {
	'use strict';
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	
	clock = new THREE.Clock(false);
	clock.start();
	
	camera = createPerspectiveCamera(45, renderer.getSize().width/renderer.getSize().height, 10, 200, 50, 50, 50);
	pauseCamera = createOrthographicCamera(150, 5, 60, 0, 30, 0);
	
	controls = new THREE.OrbitControls(camera);
	controls.autoRotate = true;
	
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}

function animate() {
	'use strict';
	
	delta = clock.getDelta();
	
	ball.update(delta);
	
	controls.update();
	
	render();
	
	requestAnimationFrame(animate);
}