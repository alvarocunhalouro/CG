class Chessboard extends THREE.Object3D {
	
	constructor(x, y, z) {
		'use strict';
		
		super();
		
		//FIXME temporary
		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load('textures/boardTexture.png');
		
		var geometry = new THREE.BoxGeometry(50, 4, 50);
		var material = new THREE.MeshPhongMaterial({color: 0xffffff, map:texture});
		var mesh = new THREE.Mesh(geometry, material);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
	}
}