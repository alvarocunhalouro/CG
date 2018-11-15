class Plane extends THREE.Object3D {
	
	constructor(x, y, z, materials) {
		'use strict';
		
		super();
		
		this.geometry = new THREE.Geometry();
		
		this.addFuselage();
		this.addCockpit();
		this.addWing(1);
		this.addWing(-1);
		this.addStabilizer();
		this.addMiniWing(1);
		this.addMiniWing(-1);
		
		this.geometry.computeFaceNormals();
		this.geometry.computeVertexNormals();
		
		this.mesh = new THREE.Mesh(this.geometry, materials);
		this.changeMaterialTo(1);
		
		this.add(this.mesh);
		
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
	}
	
	addFuselage() {
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(5, -2.5, 15); //front right
		vertices[1] = new THREE.Vector3(5, -2.5, -15); //back right
		vertices[2] = new THREE.Vector3(-5, -2.5, -15); //back left
		vertices[3] = new THREE.Vector3(-5, -2.5, 15); // front left
		//top 4
		vertices[4] = new THREE.Vector3(5, 2.5, 15);
		vertices[5] = new THREE.Vector3(5, 2.5, -15);
		vertices[6] = new THREE.Vector3(-5, 2.5, -15);
		vertices[7] = new THREE.Vector3(-5, 2.5, 15);
		
		for(var i=0; i<8; i++) {
			geometry.vertices.push(vertices[i]);
		}
		
		//bottom
		geometry.faces.push(new THREE.Face3(0,2,1)); //face using vertices 0,2,1
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
			geometry.faces[i].materialIndex = 1;
		}
		
		var mesh = new THREE.Mesh(geometry);
		//mesh.updateMatrix();
		this.geometry.merge(mesh.geometry, mesh.matrix);
	}
	
	addCockpit() {
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(5, 2.5, 9);
		vertices[1] = new THREE.Vector3(5, 2.5, -10);
		vertices[2] = new THREE.Vector3(-5, 2.5, -10);
		vertices[3] = new THREE.Vector3(-5, 2.5, 9);
		//top 2
		vertices[4] = new THREE.Vector3(5, 7, 3);
		vertices[5] = new THREE.Vector3(-5, 7, 3);
		
		for(var i=0; i<6; i++) {
			geometry.vertices.push(vertices[i]);
		}
		
		//walls
		geometry.faces.push(new THREE.Face3(0,1,4));
		geometry.faces.push(new THREE.Face3(2,3,5));
		//front
		geometry.faces.push(new THREE.Face3(0,4,3));
		geometry.faces.push(new THREE.Face3(3,4,5));
		//back
		geometry.faces.push(new THREE.Face3(1,2,5));
		geometry.faces.push(new THREE.Face3(1,5,4));
		
		for(var i=0; i<4; i++) {
			geometry.faces[i].materialIndex = 0;
		}
		
		geometry.faces[4].materialIndex = 1;
		geometry.faces[5].materialIndex = 1;
		
		var mesh = new THREE.Mesh(geometry);
		//mesh.updateMatrix();
		this.geometry.merge(mesh.geometry, mesh.matrix);
		
	}
	
	addWing(lr) { //lr = -1 if left wing and lr = 1 if right wing
		
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
	
	addStabilizer() {
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(1, 2.5,-10);
		vertices[1] = new THREE.Vector3(1, 2.5,-15);
		vertices[2] = new THREE.Vector3(-1, 2.5,-15);
		vertices[3] = new THREE.Vector3(-1, 2.5,-10);
		
		//top 4
		vertices[4] = new THREE.Vector3(1, 7.5,-15);
		vertices[5] = new THREE.Vector3(1, 7.5,-18);
		vertices[6] = new THREE.Vector3(-1, 7.5,-18);
		vertices[7] = new THREE.Vector3(-1, 7.5,-15);
		
		for(var i=0; i<8; i++) {
			geometry.vertices.push(vertices[i]);
		}
		
		geometry.faces.push(new THREE.Face3(0,1,5));
		geometry.faces.push(new THREE.Face3(0,5,4));
		geometry.faces.push(new THREE.Face3(0,4,7));
		geometry.faces.push(new THREE.Face3(0,7,3));
		geometry.faces.push(new THREE.Face3(2,3,7));
		geometry.faces.push(new THREE.Face3(2,7,6));
		geometry.faces.push(new THREE.Face3(4,5,6));
		geometry.faces.push(new THREE.Face3(4,6,7));
		geometry.faces.push(new THREE.Face3(2,6,5));
		geometry.faces.push(new THREE.Face3(2,5,1));
		
		for(var i=0; i<10; i++) {
			geometry.faces[i].materialIndex = 2;
		}
		
		var mesh = new THREE.Mesh(geometry);
		//mesh.updateMatrix();
		this.geometry.merge(mesh.geometry, mesh.matrix);
	}
	
	addMiniWing(lr) { //lr = -1 if left wing and lr = 1 if right wing
		
		var geometry = new THREE.Geometry();
		
		var vertices = [];
		
		//bottom 4
		vertices[0] = new THREE.Vector3(lr*1, 4.5, -13);
		vertices[1] = new THREE.Vector3(lr*1, 4.5, -15.8);
		vertices[2] = new THREE.Vector3(lr*6, 4.5, -15.8);
		vertices[3] = new THREE.Vector3(lr*6, 4.5, -14.5);
		//top 4
		vertices[4] = new THREE.Vector3(lr*1, 5.5, -13);
		vertices[5] = new THREE.Vector3(lr*1, 5.5, -15.8);
		vertices[6] = new THREE.Vector3(lr*6, 5.5, -15.8);
		vertices[7] = new THREE.Vector3(lr*6, 5.5, -14.5);
		//mini wing 2
		vertices[8] = new THREE.Vector3(lr*7, 5, -14.5);
		vertices[9] = new THREE.Vector3(lr*7, 5, -15.8);
		
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
			geometry.faces[i].materialIndex = 1;
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
	
	changeMaterialTo(material) {
		this.geometry.faces.forEach(function(element) {
			element.materialIndex = 3*material + element.materialIndex%3;
		});
		
		this.geometry.groupsNeedUpdate = true;
	}
}