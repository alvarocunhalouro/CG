class Spotlight extends THREE.Object3D {
	
	constructor(materials) {
		'use strict';
		
		super();
		
		this.materials = materials;
		
		this.addBody();
		this.addBulb();
		
		var light = new THREE.SpotLight();
		light.angle = Math.PI/6;
		light.penumbra = 0.8;
		light.intensity = 1.5;
		
		this.add(light);
		
		this.changeMaterialTo(1);
	}
	
	addBody() {
		
		var geometry = new THREE.ConeGeometry(4, 10, 25, 1, true);
		
		var mesh = new THREE.Mesh(geometry);
		
		mesh.rotateX(Math.PI/2);
		
		mesh.position.set(0,0,2);
		
		this.add(mesh);
	}
	
	addBulb() {
		
		var geometry = new THREE.SphereGeometry(2, 25, 25);
		
		var mesh = new THREE.Mesh(geometry);
		
		this.add(mesh);
	}
	
	changeMaterialTo(material) {
		this.children[0].material = this.materials[2*material];
		this.children[1].material = this.materials[2*material + 1];
	}
}