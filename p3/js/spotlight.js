class Spotlight extends THREE.Object3D{
	
	constructor(target, materials){
		'use strict';
		
		super();
		
		var materialC = materials[0];
		var materialB = materials[1];
		
		this.addBody(materialC);
		this.addBulb(materialB);
		
		var light = new THREE.SpotLight(0xffffff,2.0,400,0.2);
		
		light.position.set( 0, 0, 0);
		
		
		light.target = target;
		
		this.add(light);
	}
	
	addBody(material){
		var geometry = new THREE.ConeGeometry(5, 10, 35, 1, true);
		
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.rotation.z=Math.PI/2;
		mesh.position.set(0, 0, 0);
		
		this.add(mesh);
	}
	
	addBulb(material){
		var geometry = new THREE.SphereGeometry(2.5, 21, 28);
		
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.position.set(3, 0, 0);
		this.add(mesh);
	}
	
	
	
}