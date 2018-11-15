const rotation_h = Math.PI / 20;
const rotation_v = Math.PI / 20;

var camera, scene, renderer;

var sun;

var spotlights = [];

var materials = [];
var lightMats = [];

var lastMaterial = 0;
var currentMaterial = 1;
var otherMaterial = 2; //other = 1-2 when current = 2-1

var plane;

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
	
	//materials -> basic=0 phong=1 lambert=2 AND indexes -> glass=0 aluminum=1 composite=2
	materials[0] = new THREE.MeshBasicMaterial({color: 0x347bed}); //glass
	materials[1] = new THREE.MeshBasicMaterial({color: 0x61617a}); //aluminum
	materials[2] = new THREE.MeshBasicMaterial({color: 0xcbcbd6}); //composite
	materials[3] = new THREE.MeshPhongMaterial({color: 0x347bed, transparent:true,opacity:0.4, shininess: 5});
	materials[4] = new THREE.MeshPhongMaterial({color: 0x61617a, shininess: 5});
	materials[5] = new THREE.MeshPhongMaterial({color: 0xcbcbd6});
	materials[6] = new THREE.MeshLambertMaterial({color: 0x347bed, transparent:true,opacity:0.4});
	materials[7] = new THREE.MeshLambertMaterial({color: 0x61617a});
	materials[8] = new THREE.MeshLambertMaterial({color: 0xcbcbd6});
	
	lightMats[0] = new THREE.MeshBasicMaterial({color: 0x3c5a});
	lightMats[1] = new THREE.MeshBasicMaterial({color: 0xe9e9c8});
	lightMats[2] = new THREE.MeshPhongMaterial({color: 0x3c5a});
	lightMats[3] = new THREE.MeshPhongMaterial({color: 0xe9e9c8});
	lightMats[4] = new THREE.MeshLambertMaterial({color: 0x3c5a});
	lightMats[5] = new THREE.MeshLambertMaterial({color: 0xe9e9c8});
	
	for(var i=0; i<lightMats.length; i++) {
		lightMats[i].side = THREE.DoubleSide;
	}
	
	sun = new THREE.DirectionalLight(0xf8f8b8, 1.5);
	scene.add(sun);
	
	plane = new Plane(0, 0, 0, materials);
	scene.add(plane);
	
	for(var i = 0; i < 4; i++) {
		spotlights[i] = new Spotlight(lightMats);
		spotlights[i].rotateY((Math.PI/2)*i);
		scene.add(spotlights[i]);
	}
	
	spotlights[0].position.set(0,0,35);
	spotlights[1].position.set(35,0,0);
	spotlights[2].position.set(0,0,-35);
	spotlights[3].position.set(-35,0,0);
	
	scene.add(new THREE.AxesHelper(30));
}

function switchSpotlight(n) {
	'use strict';
	
	if(spotlights[n].children[2].intensity != 0) {
		spotlights[n].children[2].intensity = 0;
	}
	else {
		spotlights[n].children[2].intensity = 1.5;
	}
}
//G
function switchShadingCalc() {
	'use strict';
	
	if(currentMaterial != 0) {
		var temp = currentMaterial;
		currentMaterial = otherMaterial;
		otherMaterial = temp;
		
		plane.changeMaterialTo(currentMaterial);
		
		for(var i=0; i<spotlights.length; i++) {
			spotlights[i].changeMaterialTo(currentMaterial);
		}
	}
}
//L
function switchLightingCalc() {
	'use strict';
	
	if(currentMaterial != 0) {
		lastMaterial = currentMaterial;
		currentMaterial = 0;
	}
	else {
		currentMaterial = lastMaterial;
	}
	
	plane.changeMaterialTo(currentMaterial);
	
	for(var i=0; i<spotlights.length; i++) {
		spotlights[i].changeMaterialTo(currentMaterial);
	}
}
//N
function switchMode() {
	'use strict';
	
	if(sun.intensity != 0) {
		sun.intensity = 0;
	}
	else {
		sun.intensity = 1.5;
	}
}

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
		
		case 49: //1, front
			switchSpotlight(0);
			break;
		
		case 50: //2, right
			switchSpotlight(1);
			break;
		
		case 51: //3, back
			switchSpotlight(2);
			break;
		
		case 52: //4, left
			switchSpotlight(3);
			break;
		
		case 71: //G
			switchShadingCalc();
			break;
		
		case 76: //L
			switchLightingCalc();
			break;
		
		case 78: //N
			switchMode();
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
	
	camera = createCamera(45, renderer.getSize().width/renderer.getSize().height, 10, 200, 50, 50, 50);
	
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}

function animate() {
	'use strict';
	
	render();
	requestAnimationFrame(animate);
}