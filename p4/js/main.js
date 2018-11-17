const directional_intensity = 1.5;
const point_intensity = 2;

var camera, pauseCamera, scene, renderer, controls;

var board, rubik, ball;

var d_light, p_light;

var clock, delta;

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
	
	var boardTexture = new textureLoader.load("textures/boardTexture.png");
	
	var cubeTextures = [];
	
	cubeTextures[0] = new textureLoader.load("textures/red.png");
	cubeTextures[1] = new textureLoader.load("textures/green.png");
	cubeTextures[2] = new textureLoader.load("textures/blue.png");
	cubeTextures[3] = new textureLoader.load("textures/yellow.png");
	cubeTextures[4] = new textureLoader.load("textures/orange.png");
	cubeTextures[5] = new textureLoader.load("textures/white.png");
	//var rubikTexture = new textureLoader.load("textures/rubik.png");
	
	var ballTexture = new textureLoader.load("textures/ball10.jpg");
	
	board = new Chessboard(0, 0, 0, boardTexture);
	scene.add(board);
	
	rubik = new Rubik(-5, 3, 5, cubeTextures);
	scene.add(rubik);
	
	ball = new Ball(-5, 2.5, 15, ballTexture);
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
	
	//FIXME - - - if(em pausa)
	if(true) {
		'use strict';
		
		board.children[0].material = board.materials[1];
		rubik.children[0].material = rubik.materials.slice(6);
		ball.children[0].material = ball.materials[1];
		
		console.log(ball.rotation);
		ball.step = 0;
		ball.rotation.x = 0;
		ball.rotation.y = 0;
		ball.rotation.z = 0;
		ball.children[0].rotation.z = 0;
		ball.speed = ball.maxSpeed;
		ball.moving = true;
		
		d_light.intensity = directional_intensity;
		p_light.intensity = point_intensity;
		
		clock = new THREE.Clock(false);
		clock.start();
		
		camera.position.set(50, 50, 50);
	}
}

function switchWireframe() {
	'use strict';
	
	//TODO
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
			//TODO
			//switch pause/play
			//basta congelar o tempo (+ mensagem)
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