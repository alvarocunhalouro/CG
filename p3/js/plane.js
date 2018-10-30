class Plane extends THREE.Object3D {
	
	constructor(x, y, z) {
		'use strict';
		
		super();
		
		var materials = []
		
		materials[0] = new THREE.MeshBasicMaterial({color: 0x92f3ff, transparent:true, opacity: 0.3}); //glass
		materials[1] = new THREE.MeshBasicMaterial({color: 0x848789}); //aluminum
		materials[2] = new THREE.MeshBasicMaterial({color: 0x43464b}); //composite
		
		this.geometry = new THREE.Geometry();
		
		this.addFuselage(1);
		this.addCockpit(2);
		this.addWing(1, 1);
		this.addWing(1, -1);
		
		this.mesh = new THREE.Mesh(this.geometry, materials);
		
		this.add(this.mesh);
		
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
	}
	
	addFuselage(index) {
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(5, -2.5, 15);
		vertices[1] = new THREE.Vector3(5, -2.5, -15);
		vertices[2] = new THREE.Vector3(-5, -2.5, -15);
		vertices[3] = new THREE.Vector3(-5, -2.5, 15);
		//top 4
		vertices[4] = new THREE.Vector3(5, 2.5, 15);
		vertices[5] = new THREE.Vector3(5, 2.5, -15);
		vertices[6] = new THREE.Vector3(-5, 2.5, -15);
		vertices[7] = new THREE.Vector3(-5, 2.5, 15);
		
		for(var i=0; i<8; i++) {
			geometry.vertices.push(vertices[i]);
		}
		
		//bottom
		geometry.faces.push(new THREE.Face3(0,2,1));
		geometry.faces.push(new THREE.Face3(0,3,2));
		//top
		geometry.faces.push(new THREE.Face3(4,5,6));
		geometry.faces.push(new THREE.Face3(4,6,7));
		//walls
		geometry.faces.push(new THREE.Face3(0,1,4));
		geometry.faces.push(new THREE.Face3(1,5,4));
		geometry.faces.push(new THREE.Face3(1,2,5));
		geometry.faces.push(new THREE.Face3(2,6,5));
		geometry.faces.push(new THREE.Face3(2,7,6));
		geometry.faces.push(new THREE.Face3(2,3,7));
		geometry.faces.push(new THREE.Face3(0,7,3));
		geometry.faces.push(new THREE.Face3(0,4,7));
		
		for(var i=0; i<12; i++) {
			geometry.faces[i].materialIndex = index;
		}
		
		var mesh = new THREE.Mesh(geometry);
		//mesh.updateMatrix();
		this.geometry.merge(mesh.geometry, mesh.matrix);
	}
	
	addCockpit(index) {
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(5, 2.5, 5);
		vertices[1] = new THREE.Vector3(5, 2.5, -15);
		vertices[2] = new THREE.Vector3(-5, 2.5, -15);
		vertices[3] = new THREE.Vector3(-5, 2.5, 5);
		//top 2
		vertices[4] = new THREE.Vector3(5, 7.5, 0);
		vertices[5] = new THREE.Vector3(-5, 7.5, 0);
		
		for(var i=0; i<6; i++) {
			geometry.vertices.push(vertices[i]);
		}
		
		//bottom
		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(0,2,3));
		//walls
		geometry.faces.push(new THREE.Face3(0,1,4));
		geometry.faces.push(new THREE.Face3(2,3,5));
		//composite
		geometry.faces.push(new THREE.Face3(1,2,4));
		geometry.faces.push(new THREE.Face3(2,5,4));
		//glass
		geometry.faces.push(new THREE.Face3(0,4,3));
		geometry.faces.push(new THREE.Face3(3,4,5));
		
		for(var i=0; i<6; i++) {
			geometry.faces[i].materialIndex = index;
		}
		
		geometry.faces[2].materialIndex = 0;
		geometry.faces[3].materialIndex = 0;
		geometry.faces[6].materialIndex = 0;
		geometry.faces[7].materialIndex = 0;
		
		var mesh = new THREE.Mesh(geometry);
		//mesh.updateMatrix();
		this.geometry.merge(mesh.geometry, mesh.matrix);
		
	}
	
	addWing(index, lr) { //lr = -1 if left wing and lr = 1 if right wing
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(lr*5, -1, 5);
		vertices[1] = new THREE.Vector3(lr*5, -1, -5);
		vertices[2] = new THREE.Vector3(lr*25, -1, -5);
		vertices[3] = new THREE.Vector3(lr*25, -1, 0);
		//top 4
		vertices[4] = new THREE.Vector3(lr*5, 1, 5);
		vertices[5] = new THREE.Vector3(lr*5, 1, -5);
		vertices[6] = new THREE.Vector3(lr*25, 1, -5);
		vertices[7] = new THREE.Vector3(lr*25, 1, 0);
		//mini wing 2
		vertices[8] = new THREE.Vector3(lr*27, 3, 0);
		vertices[9] = new THREE.Vector3(lr*27, 3, -5);
		
		for(var i=0; i<10; i++) {
			geometry.vertices.push(vertices[i]);
		}
		
		if(lr == 1) {
			//bottom
			geometry.faces.push(new THREE.Face3(0,1,2));
			geometry.faces.push(new THREE.Face3(0,2,3));
			//top
			geometry.faces.push(new THREE.Face3(4,6,5));
			geometry.faces.push(new THREE.Face3(4,7,6));
			//walls
			geometry.faces.push(new THREE.Face3(0,3,7));
			geometry.faces.push(new THREE.Face3(0,7,4));
			geometry.faces.push(new THREE.Face3(2,1,5));
			geometry.faces.push(new THREE.Face3(2,5,6));
			//mini wing top
			geometry.faces.push(new THREE.Face3(6,7,8));
			geometry.faces.push(new THREE.Face3(6,8,9));
			//mini wing bottom
			geometry.faces.push(new THREE.Face3(2,8,3));
			geometry.faces.push(new THREE.Face3(2,9,8));
			//mini wing walls
			geometry.faces.push(new THREE.Face3(3,8,7));
			geometry.faces.push(new THREE.Face3(2,6,9));
		}
		else {
			//bottom
			geometry.faces.push(new THREE.Face3(0,2,1));
			geometry.faces.push(new THREE.Face3(0,3,2));
			//top
			geometry.faces.push(new THREE.Face3(4,5,6));
			geometry.faces.push(new THREE.Face3(4,6,7));
			//walls
			geometry.faces.push(new THREE.Face3(0,7,3));
			geometry.faces.push(new THREE.Face3(0,4,7));
			geometry.faces.push(new THREE.Face3(1,2,5));
			geometry.faces.push(new THREE.Face3(2,6,5));
			//mini wing top
			geometry.faces.push(new THREE.Face3(7,6,8));
			geometry.faces.push(new THREE.Face3(6,9,8));
			//mini wing bottom
			geometry.faces.push(new THREE.Face3(2,3,8));
			geometry.faces.push(new THREE.Face3(2,8,9));
			//mini wing walls
			geometry.faces.push(new THREE.Face3(3,7,8));
			geometry.faces.push(new THREE.Face3(2,9,6));
		}
		
		for(var i=0; i<14; i++) {
			geometry.faces[i].materialIndex = 2;
		}
		
		var mesh = new THREE.Mesh(geometry);
		//mesh.updateMatrix();
		this.geometry.merge(mesh.geometry, mesh.matrix);
	}
	
	rotateHorizontal(angle) {
		this.rotateY(angle);
	}
	
	rotateVertical(angle) {
		this.mesh.rotateX(angle);
	}
	
}