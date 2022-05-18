"use strict";

const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,
    renderer: null,
};

var key1 = false, key2 = false, key3 = false, key4 = false, turn = 0, rand = 0;

helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// Event Listeners
window.addEventListener('resize', resizeWindow);
document.addEventListener('keydown', onDocumentKeyDown, false);

function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    var p = sceneElements.sceneGraph.getObjectByName("gray");
    var q = sceneElements.sceneGraph.getObjectByName("blue");
    var r = sceneElements.sceneGraph.getObjectByName("turn");

    switch (event.keyCode) {
        case 49: //1
            if(turn == 0){
                key1 = true;
                rand = Math.round(Math.random()*4);
                moveGray(rand,p,q);
                turn = 1;
                r.material.color.setHex(0x000066);
                if(p.pos == 4 || p.pos == 8 || p.pos == 14){
                    turn = 0;
                    r.material.color.setHex(0xaaaaaa);
                }
                
                key1 = false;  
            }
            break;
        case 51: //3
            if(turn == 1){
                key3 = true;
                rand = Math.round(Math.random()*4);
                moveBlue(rand,q,p);
                turn = 0;
                r.material.color.setHex(0xaaaaaa);
                if(q.pos == 4 || q.pos == 8 || q.pos == 14){
                    turn = 1;
                    r.material.color.setHex(0x000066);
                }
                key3 = false;
            }
            break;
    }
}

function collisionBlueTest(p,q){
    if(p.pos == q.pos && p.pos > 4 && q.pos < 13){
        q.position.x = 6;
        q.position.y = 1;
        q.position.z = -11;
        q.pos = 0;
    }
}

function collisionGrayTest(p,q){
    if(p.pos == q.pos && p.pos > 4 && q.pos < 13){
        q.position.x = 6;
        q.position.y = 1;
        q.position.z = 11;
        q.pos = 0;
        
    }
}

function moveGray(spaces,p,q){
    if(p.pos + spaces > 15 || (p.pos + spaces == 8 && q.pos == 8))
        return;

    var i = 0;
    while(i < spaces){
        if(p.pos + i == 0){
            p.translateX(-11).translateY(6);
        }
        else if((p.pos + i  > 0 && p.pos + i < 4) || (p.pos + i > 12 && p.pos + i < 14)){
            p.translateX(-11);  
        }
        else if(p.pos + i == 4){
            p.translateZ(-11);
        }
        else if(p.pos + i > 4 && p.pos + i < 12){
            p.translateX(11);
        }
        else if(p.pos + i == 12){
            p.translateZ(11);
        }
        else if(p.pos + i == 14){
            p.translateX(-11).translateY(-6);
        }
        i++;
    }
    p.pos += spaces;
    collisionBlueTest(p,q);
}

function moveBlue(spaces,p,q){
    if(p.pos + spaces > 15 || (p.pos + spaces == 8 && q.pos == 8))
        return;

    var i = 0;
    while(i < spaces){
        if(p.pos + i == 0){
            p.translateX(-11).translateY(6);
        }
        else if((p.pos + i  > 0 && p.pos + i < 4) || (p.pos + i > 12 && p.pos + i < 14)){
            p.translateX(-11);
        }
        else if(p.pos + i == 4){
            p.translateZ(11);
        }
        else if(p.pos + i > 4 && p.pos + i < 12){
            p.translateX(11);
        }
        else if(p.pos + i == 12){
            p.translateZ(-11);
        }
        else if(p.pos + i == 14){
            p.translateX(-11).translateY(-6);
        }
        i++;
    }
    p.pos += spaces;
    collisionGrayTest(p,q);   
}

function makeBox(width,height,depth,material,x,y,z,obj){
	var boardGeometry = new THREE.BoxGeometry(width, height, depth);
    var board = new THREE.Mesh( boardGeometry, material );
	
	board.translateX(x).translateY(y).translateZ(z);
    board.castShadow = true;
    board.receiveShadow = true;
	
    obj.add(board);
}

function load3DObjects(sceneGraph) {

    // ************************** //
    // Create the Plane
    // ************************** //
	
    var planeGeometry = new THREE.BoxGeometry( 250,0.1, 250 );
    var planeMaterial = new THREE.MeshPhongMaterial( {color: 0x35654D} );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.translateX(0).translateY(-0.05).translateZ(0);
    sceneGraph.add( plane );

    plane.receiveShadow = true;
	
    // ************************** //
    // Create the Board (Bottom)
    // ************************** //

    var boardMaterial = new THREE.MeshPhongMaterial( {color: 0x98633B} );
	makeBox(45,6,34,boardMaterial,-21.5,3,0,sceneGraph);
	makeBox(21,6,12,boardMaterial,11.5,3,0,sceneGraph);
	makeBox(23,6,34,boardMaterial,33.5,3,0,sceneGraph);

    // ************************** //
    // Create the TABLE 
    // ************************** //
	
    var tableGeometry = new THREE.BoxGeometry(250, 10, 250);
    var tableMaterial = new THREE.MeshPhongMaterial( {color: 0x764119} );
    var table = new THREE.Mesh( tableGeometry, tableMaterial );
    sceneGraph.add(table);

    table.translateX(0).translateY(-5.1).translateZ(0);
    table.receiveShadow = true;
	
	makeBox(25,14,300,tableMaterial,-136.5,-3.1,0,sceneGraph);
	makeBox(25,14,300,tableMaterial,136.5,-3.1,0,sceneGraph);
	makeBox(250,14,35,tableMaterial,0,-3.1,-132.5,sceneGraph);
	makeBox(250,14,35,tableMaterial,0,-3.1,132.5,sceneGraph);

    var tableGeometry = new THREE.CylinderGeometry( 20, 10, 200, 4 );
    var leg = new THREE.Mesh( tableGeometry, tableMaterial );
    sceneGraph.add( leg );

    leg.translateX(132.5).translateY(-104.5).translateZ(132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    var tableGeometry = new THREE.CylinderGeometry( 20, 10, 200, 4 );
    var leg = new THREE.Mesh( tableGeometry, tableMaterial );
    sceneGraph.add( leg );

    leg.translateX(-132.5).translateY(-104.5).translateZ(132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    var tableGeometry = new THREE.CylinderGeometry( 20, 10, 200, 4 );
    var leg = new THREE.Mesh( tableGeometry, tableMaterial );
    sceneGraph.add( leg );

    leg.translateX(132.5).translateY(-104.5).translateZ(-132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    var tableGeometry = new THREE.CylinderGeometry( 20, 10, 200, 4 );
    var leg = new THREE.Mesh( tableGeometry, tableMaterial );
    sceneGraph.add( leg );

    leg.translateX(-132.5).translateY(-104.5).translateZ(-132.5);
    leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    leg.castShadow = true;
    leg.receiveShadow = true;

    // ************************** //
    // Create the Board (Grid)
    // ************************** //

	var gridMaterial = new THREE.MeshPhongMaterial( {color: 0xDEB886} );
	makeBox(44,1,1,gridMaterial,-21.5,6.5,-16.5,sceneGraph);
	makeBox(44,1,1,gridMaterial,-21.5,6.5,16.5,sceneGraph);
	makeBox(88,1,1,gridMaterial,0,6.5,-5.5,sceneGraph);
	makeBox(88,1,1,gridMaterial,0,6.5,5.5,sceneGraph);
	makeBox(23,1,1,gridMaterial,33.5,6.5,-16.5,sceneGraph);
	makeBox(23,1,1,gridMaterial,33.5,6.5,16.5,sceneGraph);

    // vertical lines
	
	makeBox(1,1,34,gridMaterial,-43.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,-32.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,-21.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,-10.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,0.5,6.5,0,sceneGraph);
	makeBox(1,1,12,gridMaterial,11.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,22.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,33.5,6.5,0,sceneGraph);
	makeBox(1,1,34,gridMaterial,44.5,6.5,0,sceneGraph);

    // ************************** //
    // Create Safe Spots
    // ************************** //

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
	var safeMaterial = new THREE.MeshPhongMaterial( {color: 0x660000} );
	var safe = new THREE.Mesh( safeGeometry, safeMaterial );
	sceneGraph.add( safe );

    safe.translateX(-38).translateY(6.2).translateZ(11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    
    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
	var safe = new THREE.Mesh( safeGeometry, safeMaterial );
	sceneGraph.add( safe );

    safe.translateX(-38).translateY(6.2).translateZ(-11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
	var safe = new THREE.Mesh( safeGeometry, safeMaterial );
	sceneGraph.add( safe );

    safe.translateX(28).translateY(6.2).translateZ(-11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
	var safe = new THREE.Mesh( safeGeometry, safeMaterial );
	sceneGraph.add( safe );

   
    safe.translateX(28).translateY(6.2).translateZ(11);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    var safeGeometry = new THREE.BoxGeometry(5, 1, 5);
	var safe = new THREE.Mesh( safeGeometry, safeMaterial );
	sceneGraph.add( safe );

    
    safe.translateX(-5).translateY(6.2).translateZ(0);
    safe.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4);

    // ************************** //
    // Create the Pieces
    // ************************** //

    var pieceGeometry = new THREE.CylinderGeometry( 3.5, 3.5, 2, 64 );
    var pieceMaterial = new THREE.MeshPhongMaterial( {color: 0xaaaaaa} );
    var grayPiece = new THREE.Mesh( pieceGeometry, pieceMaterial );
    sceneGraph.add( grayPiece );

    grayPiece.translateX(6).translateY(1).translateZ(11);
    grayPiece.castShadow = true;
    grayPiece.receiveShadow = true;

    grayPiece.name = "gray";
    grayPiece.pos = 0;

    var pieceGeometry = new THREE.CylinderGeometry( 3.5, 3.5, 2, 64 );
    var pieceMaterial = new THREE.MeshLambertMaterial( {color: 0x000066} );
    var bluePiece = new THREE.Mesh( pieceGeometry, pieceMaterial );
    sceneGraph.add( bluePiece );

    bluePiece.translateX(6).translateY(1).translateZ(-11);
    bluePiece.castShadow = true;
    bluePiece.receiveShadow = true;

    bluePiece.name = "blue";
    bluePiece.pos = 0;

    // ************************** //
    // Create the Turn Order Block
    // ************************** //

    var turnGeometry = new THREE.BoxGeometry(10, 6, 10);
	var turnMaterial = new THREE.MeshPhongMaterial( {color: 0xaaaaaa} );
	var turn = new THREE.Mesh( turnGeometry, turnMaterial );
	sceneGraph.add( turn );

    turn.translateX(-60).translateY(3).translateZ(0);
    turn.name = "turn";
}

function computeFrame(time) {

    helper.render(sceneElements);

    sceneElements.control.update();

    requestAnimationFrame(computeFrame);
}



