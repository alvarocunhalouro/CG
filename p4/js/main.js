const directional_intensity = 1.5;
const point_intensity = 2;
const viewSize = 90;
const camFactor = 1.6;

var camera, pauseCamera, scene, pauseScene, renderer, controls;

var board, rubik, ball, message;

var board_mats = [], rubik_mats = [], ball_mats = [];

var d_light, p_light;

var clock, delta;

var in_pause = false, wireframe = false;

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
	
	camera.lookAt(pauseScene.position);
	
	return camera;
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	
	var textureLoader = new THREE.TextureLoader();
	
	var cubeTextures = [];
	
	cubeTextures[0] = new textureLoader.load("textures/red.png");
	cubeTextures[1] = new textureLoader.load("textures/green.png");
	cubeTextures[2] = new textureLoader.load("textures/blue.png");
	cubeTextures[3] = new textureLoader.load("textures/yellow.png");
	cubeTextures[4] = new textureLoader.load("textures/orange.png");
	cubeTextures[5] = new textureLoader.load("textures/white.png");
	
	for(var i = 0; i < cubeTextures.length; i++) {
		rubik_mats[i] = new THREE.MeshBasicMaterial({map: cubeTextures[i]});
		rubik_mats[i+cubeTextures.length] = new THREE.MeshPhongMaterial({map: cubeTextures[i], bumpMap: cubeTextures[5]});
	}
	
	var boardTexture = new textureLoader.load("textures/boardTexture.png");
	var ballTexture = new textureLoader.load("textures/ball10.png");
	
	board_mats[0] = new THREE.MeshBasicMaterial({map: boardTexture});
	board_mats[1] = new THREE.MeshPhongMaterial({map: boardTexture});
	
	ball_mats[0] = new THREE.MeshBasicMaterial({map: ballTexture});
	ball_mats[1] = new THREE.MeshPhongMaterial({map: ballTexture});
	
	board = new Chessboard(0, 0, 0, board_mats);
	scene.add(board);
	
	rubik = new Rubik(-5, 3, 5, rubik_mats);
	scene.add(rubik);
	
	ball = new Ball(-5, 2.5, 15, ball_mats);
	scene.add(ball);
	
	d_light = new THREE.DirectionalLight(0xf8f8b8, directional_intensity);
	d_light.position.set(1,1,1);
	scene.add(d_light);
	
	p_light = new THREE.PointLight(0xffffff, point_intensity, 200, 1);
	p_light.position.set(15, 2.5, -15);
	scene.add(p_light);
	
	scene.add(new THREE.AxesHelper(30));
}

function createPauseScene() {
	'use strict';
	
	pauseScene = new THREE.Scene();
	
	var textureLoader = new THREE.TextureLoader();
	
	var pauseTexture = textureLoader.load("textures/pause.png");
	var pauseGeo = new THREE.PlaneGeometry(80, 20);
	var pauseMat = new THREE.MeshBasicMaterial({map: pauseTexture, transparent: true});
	
	message = new THREE.Mesh(pauseGeo, pauseMat);
	message.rotateX(-Math.PI/2);
	pauseScene.add(message);
	
	pauseScene.position.set(0,2,0);
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
	
	if(wireframe) {
		switchWireframe();
	}
	
	camera.position.set(50, 50, 50);
	
	switchPausePlay();
	
	clock = new THREE.Clock(false);
	clock.start();
}

function switchPausePlay() {
	'use strict';
	
	if(clock.running) {
		clock.stop();
		controls.autoRotate = false;
		in_pause = true;
	}
	else {
		clock.start();
		controls.autoRotate = true;
		in_pause = false;
	}
}

function switchWireframe() {
	'use strict';
	
	wireframe = !wireframe;
	
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
	
	if(!in_pause) {
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
			
			case 83: //S
				switchPausePlay();
				break;
			
			case 87: //W
				switchWireframe();
				break;
		}
	}
	else {
		switch(e.keyCode) {
			case 82: //R
				reset();
				break;
			
			case 83:
				switchPausePlay();
				break;
		}
	}
}

function onResize() {
	'use strict';
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	var aspectRatio = window.innerWidth / window.innerHeight;
	
	if(aspectRatio > 1) {
		pauseCamera.left = aspectRatio*viewSize / -camFactor;
		pauseCamera.right = aspectRatio*viewSize / camFactor;
		pauseCamera.top = viewSize/camFactor;
		pauseCamera.bottom = -viewSize/camFactor;
	}
	else {
		pauseCamera.top = pauseCamera.right / aspectRatio;
		pauseCamera.bottom = pauseCamera.right / -aspectRatio;
	}
	
	pauseCamera.updateProjectionMatrix();
	
	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
}

function render() {
	'use strict';
	
	renderer.render(scene, camera);
	
	if(in_pause) {
		renderer.autoClear = false;
		renderer.clearDepth();
		renderer.render(pauseScene, pauseCamera);
		renderer.autoClear = true;
	}
}

function init() {
	'use strict';
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createPauseScene();
	
	clock = new THREE.Clock(false);
	clock.start();
	
	camera = createPerspectiveCamera(45, renderer.getSize().width/renderer.getSize().height, 10, 200, 50, 50, 50);
	pauseCamera = createOrthographicCamera(150, 5, 60, 0, 20, 0);
	
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