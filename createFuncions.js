//createPlane
function createPlane(size) {

    const plane = new THREE.Mesh(new THREE.BoxGeometry(size, 0.1, size), new THREE.MeshPhongMaterial({ color: 0x35654D }));
    plane.translateX(0).translateY(-0.05).translateZ(0);
    plane.receiveShadow = true;

    return plane;
}

function createBoard() {

    const board = new THREE.Group();

    const boardMaterial = new THREE.MeshPhongMaterial({ color: 0x98633B });
    createBox(45, 6, 34, boardMaterial, -21.5, 3, 0, board);
    createBox(21, 6, 12, boardMaterial, 11.5, 3, 0, board);
    createBox(23, 6, 34, boardMaterial, 33.5, 3, 0, board);

    var gridMaterial = new THREE.MeshPhongMaterial({ color: 0xDEB886 });

    // horizontal lines
    createBox(44, 1, 1, gridMaterial, -21.5, 6.5, -16.5, board);
    createBox(44, 1, 1, gridMaterial, -21.5, 6.5, 16.5, board);
    createBox(88, 1, 1, gridMaterial, 0, 6.5, -5.5, board);
    createBox(88, 1, 1, gridMaterial, 0, 6.5, 5.5, board);
    createBox(23, 1, 1, gridMaterial, 33.5, 6.5, -16.5, board);
    createBox(23, 1, 1, gridMaterial, 33.5, 6.5, 16.5, board);

    // vertical lines
    createBox(1, 1, 34, gridMaterial, -43.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, -32.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, -21.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, -10.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, 0.5, 6.5, 0, board);
    createBox(1, 1, 12, gridMaterial, 11.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, 22.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, 33.5, 6.5, 0, board);
    createBox(1, 1, 34, gridMaterial, 44.5, 6.5, 0, board);

    return board;
}

function createTable() {
    const table = new THREE.Group();

    var tableMaterial = new THREE.MeshPhongMaterial({ color: 0x764119 });
    //table.receiveShadow = true;

    createBox(250, 10, 250, tableMaterial, 0, -5.1, 0, table);
    createBox(25, 14, 300, tableMaterial, 136.5, -3.1, 0, table);
    createBox(25, 14, 300, tableMaterial, -136.5, -3.1, 0, table);
    createBox(250, 14, 35, tableMaterial, 0, -3.1, -132.5, table);
    createBox(250, 14, 35, tableMaterial, 0, -3.1, 132.5, table);

    var tableGeometry = new THREE.CylinderGeometry(20, 10, 200, 4);
    var leg = new THREE.Mesh(tableGeometry, tableMaterial);
    table.add(leg);

    leg.translateX(132.5).translateY(-104.5).translateZ(132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    var tableGeometry = new THREE.CylinderGeometry(20, 10, 200, 4);
    var leg = new THREE.Mesh(tableGeometry, tableMaterial);
    table.add(leg);

    leg.translateX(-132.5).translateY(-104.5).translateZ(132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    var tableGeometry = new THREE.CylinderGeometry(20, 10, 200, 4);
    var leg = new THREE.Mesh(tableGeometry, tableMaterial);
    table.add(leg);

    leg.translateX(132.5).translateY(-104.5).translateZ(-132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    var tableGeometry = new THREE.CylinderGeometry(20, 10, 200, 4);
    var leg = new THREE.Mesh(tableGeometry, tableMaterial);
    table.add(leg);

    leg.translateX(-132.5).translateY(-104.5).translateZ(-132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    return table;
}

function createBox(width, height, depth, material, x, y, z, obj) {
    var boxGeometry = new THREE.BoxGeometry(width, height, depth);
    var box = new THREE.Mesh(boxGeometry, material);

    box.position.set(x, y, z);
    box.castShadow = true;
    box.receiveShadow = true;

    obj.add(box);
}