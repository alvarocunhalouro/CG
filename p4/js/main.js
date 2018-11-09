var camera, scene, renderer, controls;

var board, rubik, ball;

var d_light, p_light;

var clock, delta;

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
	
	board = new Chessboard(0, 0, 0);
	scene.add(board);
	
	rubik = new Rubik(-5, 5.5, 5);
	scene.add(rubik);
	
	ball = new Ball(-5, 5, 15);
	scene.add(ball);
	
	d_light = new THREE.DirectionalLight(0xf8f8b8, 1.5);
	d_light.position.set(1,1,1);
	scene.add(d_light);
	
	p_light = new THREE.PointLight(0xffd000, 10, 200, 1);
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

function onKeyDown(e) {
	'use strict';
	
	switch(e.keyCode) {
		
		case 66: //B
			//TODO
			//switch ball movement
			break;
		
		case 68: //D
			switchLight(d_light, 1.5);
			break;
		
		case 76: //L
			//TODO
			//switch lighting calc
			break;
		
		case 80: //P
			switchLight(p_light, 10);
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