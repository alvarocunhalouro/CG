class Spotlight extends THREE.Object3D{
	
	constructor(target, materials){
		'use strict';
		
		super();
		
		var materialC = materials[0];
		var materialB = materials[1];
		
		this.addBody(materialC);
		this.addBulb(materialB);
		
		this.light = new THREE.SpotLight(0xffffff,2.0,400,0.2);
		
		this.lightHelp = new THREE.SpotLightHelper(this.light);
		this.light.add(this.lightHelp)
		
		//light.position.set( 0, 0, 0);
		
		var geometry = new THREE.SphereGeometry( 200, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		this.sphere = new THREE.Mesh( geometry, material );
		this.sphere.position.set(this.light.position);
		this.add( this.sphere );
		this.add(this.light);
	}
	
	addBody(material){
		var geometry = new THREE.ConeGeometry(5, 10, 35, 1, true);
		
		var mesh = new THREE.Mesh(geometry, material);
		
		//mesh.rotation.z=Math.PI/2;
		//mesh.position.set(0, 0, 0);
		
		this.add(mesh);
	}
	
	addBulb(material){
		var geometry = new THREE.SphereGeometry(2.5, 21, 28);
		
		var mesh = new THREE.Mesh(geometry, material);
		
		//mesh.position.set(3, 0, 0);
		this.add(mesh);
	}
	
	
	
}
