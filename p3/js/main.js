const rotation_h = Math.PI / 20;
const rotation_v = Math.PI / 20;

var camera, scene, renderer;

var sun;

var spotlights = [];

var plane;

var lightMaterials = [];

function createSpotlight() {
	'use strict';
	
	//TODO
}

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
	
	
		
	lightMaterials[0] = new THREE.MeshStandardMaterial({color:0x8a918b, side:THREE.DoubleSide, roughness:0.48, metalness:0.58 }); 
		
	lightMaterials[1] = new THREE.MeshLambertMaterial({color:0xffffb5, emissive:0xffffff}) 
	
	plane = new Plane(0, 0, 0);
	scene.add(plane);
	
	for(var i = 0; i < 4; i++) {
		spotlights[i] = new Spotlight(plane, lightMaterials);
	}
	for(var i = 0; i < 4; i++) {
		scene.add(spotlights[i]);
	} 	
	var pos = 40; 
	
	spotlights[0].position.set(pos, 0, 0);
	spotlights[1].position.set(-pos, 0, 0);
	spotlights[2].position.set(0, 0, pos);
	spotlights[3].position.set(0, 0, -pos);
	
	//spotlights[3].rotation.y = -Math.PI/2;
	//spotlights[2].rotation.y = Math.PI/2; 
	//spotlights[0].rotation.y = Math.PI;
	
	
	
	//var light = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
	//light.target = scene;
	//scene.add(light);

	scene.add(new THREE.AxesHelper(30));

	
}

// function switchSpotlight(n) {
// 	spotlights[n].on = !spotlights[n].on;
// }

function onKeyDown(e) {
	'use strict';
	
	switch(e.keyCode) {
		
		case 37: //left
			plane.rotateHorizontal(-rotation_h);
			break;
		
		case 38: //up
			plane.rotateVertical(-rotation_v);
			break;
		
		case 39: //right
			plane.rotateHorizontal(rotation_h);
			break;
		
		case 40: //down
			plane.rotateVertical(rotation_v);
			break;
		
		case 49: //1
			//TODO
			switchSpotlight(0);
			break;
		
		case 50: //2
			switchSpotlight(1);
			break;
		
		case 51: //3
			switchSpotlight(2);
			break;
		
		case 52: //4
			switchSpotlight(3);
			break;
		
		case 71: //G
			//TODO
			break;
		
		case 76: //L
			//TODO
			break;
		
		case 78: //N
			//TODO
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
	
	sun = new THREE.DirectionalLight(0xeebbbb);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	
	camera = createCamera(45, renderer.getSize().width/renderer.getSize().height, 10, 200, 50, 50, 50);
	
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}

function animate() {
	'use strict';
	
	render();
	requestAnimationFrame(animate);
}
