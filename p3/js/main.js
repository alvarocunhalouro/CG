const rotation_h = Math.PI / 20;
const rotation_v = Math.PI / 20;

var camera, scene, renderer;

var controls;

var sun;

var spotlights = [];


var plane;

var lightPhongMaterials = [];

var lightLambertMaterials = [];

var planePhongMaterials = [];

var planeLambertMaterials = [];


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
	
	planePhongMaterials [0] = new THREE.MeshPhongMaterial({color: 0x347bed, transparent:true,opacity:0.6, shininess:2}); //glass
	planePhongMaterials [1] = new THREE.MeshPhongMaterial({color: 0x61617a, shininess:2}) //aluminum
	planePhongMaterials [2] = new THREE.MeshPhongMaterial({color: 0xcbcbd6, shininess:2}); //composite

	planeLambertMaterials [0] = new THREE.MeshLambertMaterial({color: 0x92f3ff, transparent:true,opacity:0.6, emissive:0xffffff, emissiveIntensity:0.5}); //glass
	planeLambertMaterials[1] = new THREE.MeshLambertMaterial({color: 0x43464b, emissive:0xffffff, emissiveIntensity:0.5}) //aluminum
	planeLambertMaterials [2] = new THREE.MeshLambertMaterial({color: 0x43464b, emissive:0xffffff, emissiveIntensity:0.5}); //composite

	
	
	lightPhongMaterials[0] = new THREE.MeshPhongMaterial({color: 0x43464b, shininess:40, side:THREE.DoubleSide}); //body
	lightPhongMaterials[1] = new THREE.MeshPhongMaterial({color:0xffffb5,shininess:10});
	
	lightLambertMaterials[0] = new THREE.MeshPhongMaterial({color: 0x43464b, emissive:0xffffff,emissiveIntensity:0.5, side:THREE.DoubleSide}); //body
	lightLambertMaterials[1] = new THREE.MeshLambertMaterial({color:0xffffb5, emissive:0xffffff, emissiveIntensity:0.5})//bulb 
	
	plane = new Plane(0, 0, 0, planePhongMaterials );
	scene.add(plane);
	
	for(var i = 0; i < 4; i++) {
		spotlights[i] = new Spotlight(plane, lightPhongMaterials);
	}
	for(var i = 0; i < 4; i++) {
		scene.add(spotlights[i]);
		scene.add(spotlights[i].target);
	} 	
	var pos = 40; 
	
	spotlights[0].position.set(pos, 0, 0);
	spotlights[1].position.set(-pos, 0, 0);
	spotlights[2].position.set(0, 0, pos);
	spotlights[3].position.set(0, 0, -pos);
	
	spotlights[3].rotation.y = -Math.PI/2;
	spotlights[2].rotation.y = Math.PI/2; 
	spotlights[0].rotation.y = Math.PI;
	
	/*
	for(var i = 0; i < 4; i++) {
 		spHelper[i] =  new THREE.SpotLightHelper(spotlights[i].light);
		spotlights[i].light.add(spHelper[i]);
 		scene.add(spHelper[i]);
 	}*/
	
	sun = new THREE.DirectionalLight(0xffffff, 1, 1000);
	sun.target = scene;
	sun.position.set(60,200,-80);
	scene.add(sun);

	scene.add(new THREE.AxesHelper(30));

	
}

function switchSpotlight(n) {
	if(spotlights[n].light.visible)
			spotlights[n].light.visible=false;
	else
		spotlights[n].light.visible=true;
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
	
	
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	
	camera = createCamera(45, renderer.getSize().width/renderer.getSize().height, 10, 200, 50, 50, 50);
	
	controls = new THREE.TrackballControls( camera );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.keys = [ 65, 83, 68 ];

	controls.addEventListener( 'change', render );
	
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);
}

function animate() {
	'use strict';
	
	controls.update();
	render();
	requestAnimationFrame(animate);
}
