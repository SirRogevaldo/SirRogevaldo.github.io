
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,
    renderer: null,
};


var key1 = false, key2 = false, key3 = false, key4 = false, turn = 0, rand = 0;
var keyD = false, keyA = false, keyS = false, keyW = false;

helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// Setup Raycaster
const ray = new THREE.Raycaster();
const pointer = new THREE.Vector3();

// Event Listeners
window.addEventListener('resize', resizeWindow);
window.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);


function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onMouseMove(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 87: //w
            keyW = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 68: //d
            keyD = false;
            break;
    }
}

function hoverPieces() {
    ray.setFromCamera(pointer, sceneElements.camera);
    var intersect = ray.intersectObjects(sceneElements.sceneGraph.children);

    if (intersect.length > 0) {

        //if ((intersect[0].object.material.color == "0xaaaaaa" && turn == 0) || (intersect[0].object.material.color == "0x660000" && turn == 1)) {
        intersect[0].object.material.transparent = true;
        intersect[0].object.material.opacity = 0.5;
        //}
    }
}

function resetPieces() {
    for (let i = 0; i < sceneElements.sceneGraph.children.length; i++) {
        if (sceneElements.sceneGraph.children[i].material) {
            sceneElements.sceneGraph.children[i].material.opacity = 1.0;
        }
    }
}

function onDocumentKeyDown(event) {
    var p = sceneElements.sceneGraph.getObjectByName("gray");
    var q = sceneElements.sceneGraph.getObjectByName("blue");
    var r = sceneElements.sceneGraph.getObjectByName("turn");

    switch (event.keyCode) {
        case 49: //1
            if (turn == 0) {
                key1 = true;
                rand = Math.round(Math.random() * 4);
                moveGray(rand, p, q);
                turn = 1;
                r.material.color.setHex(0x000066);
                if (p.pos == 4 || p.pos == 8 || p.pos == 14) {
                    turn = 0;
                    r.material.color.setHex(0xaaaaaa);
                }

                key1 = false;
            }
            break;
        case 51: //3
            if (turn == 1) {
                key3 = true;
                rand = Math.round(Math.random() * 4);
                moveBlue(rand, q, p);
                turn = 0;
                r.material.color.setHex(0xaaaaaa);
                if (q.pos == 4 || q.pos == 8 || q.pos == 14) {
                    turn = 1;
                    r.material.color.setHex(0x000066);
                }
                key3 = false;
            }
            break;
        case 87: //w
            keyW = true;
            break;
        case 65: //s
            keyA = true;
            break;
        case 83: //a
            keyS = true;
            break;
        case 68: //d
            keyD = true;
            break;
    }
}

function collisionBlueTest(p, q) {
    if (p.pos == q.pos && p.pos > 4 && q.pos < 13) {
        q.position.x = 6;
        q.position.y = 1;
        q.position.z = -11;
        q.pos = 0;
    }
}

function collisionGrayTest(p, q) {
    if (p.pos == q.pos && p.pos > 4 && q.pos < 13) {
        q.position.x = 6;
        q.position.y = 1;
        q.position.z = 11;
        q.pos = 0;

    }
}

function onDocumentMouseDown(event) {

    // direction from the camera
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector = vector.unproject(sceneElements.camera);

    var raycaster = new THREE.Raycaster(sceneElements.camera.position, vector.sub(sceneElements.camera.position).normalize());

    var intersects = raycaster.intersectObjects(sceneElements.sceneGraph.children);

    if (intersects.length > 0) {

        //if ((intersects[0].object.name == "gray" && turn == 0) || (intersects[0].object.name == "blue" && turn == 1)) {
        intersects[0].object.material.transparent = true;
        intersects[0].object.material.opacity = 0.5;
        //}
        //console.log(turn); // mostra nome
    }

}

function moveGray(spaces, p, q) {
    if (p.pos + spaces > 15 || (p.pos + spaces == 8 && q.pos == 8))
        return;

    var i = 0;
    while (i < spaces) {
        if (p.pos + i == 0) {
            p.translateX(-11).translateY(6);
        }
        else if ((p.pos + i > 0 && p.pos + i < 4) || (p.pos + i > 12 && p.pos + i < 14)) {
            p.translateX(-11);
        }
        else if (p.pos + i == 4) {
            p.translateZ(-11);
        }
        else if (p.pos + i > 4 && p.pos + i < 12) {
            p.translateX(11);
        }
        else if (p.pos + i == 12) {
            p.translateZ(11);
        }
        else if (p.pos + i == 14) {
            p.translateX(-11).translateY(-6);
        }
        i++;
    }
    p.pos += spaces;
    collisionBlueTest(p, q);
}

function moveBlue(spaces, p, q) {
    if (p.pos + spaces > 15 || (p.pos + spaces == 8 && q.pos == 8))
        return;

    var i = 0;
    while (i < spaces) {
        if (p.pos + i == 0) {
            p.translateX(-11).translateY(6);
        }
        else if ((p.pos + i > 0 && p.pos + i < 4) || (p.pos + i > 12 && p.pos + i < 14)) {
            p.translateX(-11);
        }
        else if (p.pos + i == 4) {
            p.translateZ(11);
        }
        else if (p.pos + i > 4 && p.pos + i < 12) {
            p.translateX(11);
        }
        else if (p.pos + i == 12) {
            p.translateZ(-11);
        }
        else if (p.pos + i == 14) {
            p.translateX(-11).translateY(-6);
        }
        i++;
    }
    p.pos += spaces;
    collisionGrayTest(p, q);
}

function load3DObjects(sceneGraph) {

    // ************************** //
    // Create the Board (Bottom)
    const board = createBoard();
    sceneGraph.add(board);

    // ************************** //
    // Create the Plane
    const plane = createPlane(250);
    board.add(plane);
    sceneGraph.add(board);

    // ************************** //
    // Create the TABLE 

    const table = createTable();
    sceneGraph.add(table);

    // ************************** //
    // Create rosetta Spaces
    const rosetta = new THREE.Group();

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
    var safeMaterial = new THREE.MeshPhongMaterial({ color: 0x660000 });
    var safe = new THREE.Mesh(safeGeometry, safeMaterial);
    rosetta.add(safe);

    safe.translateX(-38).translateY(6.2).translateZ(11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
    var safe = new THREE.Mesh(safeGeometry, safeMaterial);
    rosetta.add(safe);

    safe.translateX(-38).translateY(6.2).translateZ(-11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
    var safe = new THREE.Mesh(safeGeometry, safeMaterial);
    rosetta.add(safe);

    safe.translateX(28).translateY(6.2).translateZ(-11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
    var safe = new THREE.Mesh(safeGeometry, safeMaterial);
    rosetta.add(safe);


    safe.translateX(28).translateY(6.2).translateZ(11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
    var safe = new THREE.Mesh(safeGeometry, safeMaterial);
    rosetta.add(safe);


    safe.translateX(-5).translateY(6.2).translateZ(0);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    sceneGraph.add(rosetta);

    // ************************** //
    // Create the Pieces
    var pieceGeometry = new THREE.CylinderGeometry(3.5, 3.5, 2, 64);
    var pieceMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    var grayPiece = new THREE.Mesh(pieceGeometry, pieceMaterial);
    sceneGraph.add(grayPiece);

    grayPiece.translateX(6).translateY(1).translateZ(11);
    grayPiece.castShadow = true;
    grayPiece.receiveShadow = true;

    grayPiece.name = "gray";
    grayPiece.pos = 0;

    var pieceGeometry = new THREE.CylinderGeometry(3.5, 3.5, 2, 64);
    var pieceMaterial = new THREE.MeshLambertMaterial({ color: 0x000066 });
    var bluePiece = new THREE.Mesh(pieceGeometry, pieceMaterial);
    sceneGraph.add(bluePiece);

    bluePiece.translateX(6).translateY(1).translateZ(-11);
    bluePiece.castShadow = true;
    bluePiece.receiveShadow = true;

    bluePiece.name = "blue";
    bluePiece.pos = 0;

    // ************************** //
    // Create the Turn Order Block
    // ************************** //

    var turnGeometry = new THREE.BoxGeometry(10, 6, 10);
    var turnMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    var turn = new THREE.Mesh(turnGeometry, turnMaterial);
    sceneGraph.add(turn);

    turn.translateX(-60).translateY(3).translateZ(0);
    turn.name = "turn";
}

function computeFrame(time) {

    const cube = sceneElements.sceneGraph.getObjectByName("turn");

    resetPieces();
    hoverPieces();


    if (keyD && cube.position.x < -50) {
        cube.translateX(0.2);
    }
    if (keyW && cube.position.z > -100) {
        cube.translateZ(-0.2);
    }
    if (keyA && cube.position.x > -100) {
        cube.translateX(-0.2);
    }
    if (keyS && cube.position.z < 100) {
        cube.translateZ(0.2);
    }

    helper.render(sceneElements);
    //renderer.render(sceneElements.sceneGraph, sceneElements.camera);

    sceneElements.control.update();

    requestAnimationFrame(computeFrame);
} 