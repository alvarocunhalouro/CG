var camera, scene, renderer, controls;

var board, rubik, ball;

var d_light, p_light;

var clock, delta;

var cubeMaterials = [];



function createCamera(fov, aspect, near, far, x, y, z) {
	'use strict';
	
	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	
	camera.position.set(x,y,z);
	
	camera.lookAt(scene.position);
	
	return camera;
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	
	var textureLoader = new THREE.TextureLoader();
	var red = textureLoader.load('textures/red.png');
	var green = textureLoader.load('textures/green.png');
	var blue = textureLoader.load('textures/blue.png');
	var yellow = textureLoader.load('textures/yellow.png');
	var white = textureLoader.load('textures/white.png');
	var orange = textureLoader.load('textures/orange.png');
	
	cubeMaterials[0] = new THREE.MeshPhongMaterial({color: 0xffffff, map:red});
	cubeMaterials[1] = new THREE.MeshPhongMaterial({color: 0xffffff, map:green});
	cubeMaterials[2] = new THREE.MeshPhongMaterial({color: 0xffffff, map:blue});
	cubeMaterials[3] = new THREE.MeshPhongMaterial({color: 0xffffff, map:yellow});
	cubeMaterials[4] = new THREE.MeshPhongMaterial({color: 0xffffff, map:white});
	cubeMaterials[5] = new THREE.MeshPhongMaterial({color: 0xffffff, map:orange});
	
	var ballTexture = textureLoader.load('textures/Ball10.jpg');
	var ballMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 30, map:ballTexture});
	
	board = new Chessboard(0, 0, 0);
	scene.add(board);
	
	rubik = new Rubik(-5, 5.5, 5, cubeMaterials);
	scene.add(rubik);
	
	ball = new Ball(-5, 5, 15, ballMaterial);
	scene.add(ball);
	
	d_light = new THREE.DirectionalLight(0xf8f8b8, 1.5);
	d_light.position.set(1,1,1);
	scene.add(d_light);
	
	p_light = new THREE.PointLight(0xffffff, 5, 200, 1);
	p_light.position.set(-15, 2.5, -15);
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

function onKeyDown(e) {
	'use strict';
	
	switch(e.keyCode) {
		
		case 66: //B
			//TODO
			ball.moving = !ball.moving;
			break;
		
		case 68: //D
			switchLight(d_light, 1.5);
			break;
		
		case 76: //L
			//TODO
			//switch lighting calc
			break;
		
		case 80: //P
			switchLight(p_light, 5);
			break;
		
		case 82: //R
			//TODO
			//Reset
			break;
		
		case 83: //S
			//TODO
			//switch pause/play
			//basta congelar o tempo (+ mensagem)
			break;
		
		case 87: //W
			//TODO
			//switch wireframe
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
}

function init() {
	'use strict';
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	
	clock = new THREE.Clock(false);
	clock.start();
	
	camera = createCamera(45, renderer.getSize().width/renderer.getSize().height, 10, 200, 50, 50, 50);
	
	controls = new THREE.OrbitControls(camera);
	controls.autoRotate = false;
	
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