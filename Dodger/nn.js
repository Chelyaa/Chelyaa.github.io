//var net = new brain.NeuralNetwork();
var points = 11,
		fieldWidth = points*plStep,
		idNode = 0,
		vPos,
		hPos,
		tr = new Graphics();
stage.addChild(tr);

step();
function step() {
	var tree = [[{x: plX+plWidth/2, y: plY+plHeight/2, id: idNode}, []]];
	tree = buildTree(tree);
	renderTree(tree);
	// console.log(tree);
	requestAnimationFrame(step);
}

function buildTree(tree) {//console.log(tree[0][0].x-plStep, tree[0][0].x+plStep);
	vPos = tree[0][0].y;
	hPosLeft = tree[0][0].x-plStep;
	hPosRight = tree[0][0].x+plStep;

	while(vPos > 0 ) {//console.log(hPosLeft, hPosRight, vPos);
		traverseDF(tree, function(node, deepLevel) {//console.log(deepLevel);
			if(node[1].length == 0) {
				var firstChild = {
					x: node[0].x-plStep,
					y: node[0].y
				};
				var secondChild = {
					x: node[0].x,
					y: node[0].y-plStep
				}
				var thirdChild = {
					x: node[0].x+plStep,
					y: node[0].y
				}

				addNode(tree, node[0].id, [firstChild, []]);
				addNode(tree, node[0].id, [secondChild, []]);
				addNode(tree, node[0].id, [thirdChild, []]);
				vPos = vPos - plStep*deepLevel;
				hPosLeft -= plStep;
				hPosRight += plStep;
			}
		});
	}

	return tree;
}

function traverseDF(tree, callback) {
	var deepLevel = 0;
	(function recurse(currentNode) {
    for (var i = 0, length = currentNode[1].length; i < length; i++) {
      recurse(currentNode[1][i]);
      if(i == length-1) {
      	deepLevel++;
      }
    }

  	callback(currentNode, deepLevel);
  })(tree[0]);
}

function addNode(tree, id, node) {
	(function recurse(currentNode) {
    for (var i = 0, length = currentNode[1].length; i < length; i++) {
      recurse(currentNode[1][i]);
    }

  	if(currentNode[0].id == id) {
  		idNode++;
			node[0].id = idNode;
			currentNode[1].push(node);
  	}
  })(tree[0]);
}

function renderTree(tree) {
	tr.clear();
	tr.beginFill(0x0000FF);
	tr.lineStyle(1, 0xFFFF00, 1);
	(function recurse(currentNode) {
    for (var i = 0, length = currentNode[1].length; i < length; i++) {
			tr.moveTo(currentNode[0].x, currentNode[0].y);
			tr.lineTo(currentNode[1][i][0].x, currentNode[1][i][0].y);
			// tr.x = currentNode[0].x;
			// tr.y = currentNode[0].y;
			tr.drawRect(currentNode[0].x-2, currentNode[0].y-2, 3, 3);
			recurse(currentNode[1][i]);
    }
 
  })(tree[0]);
  tr.endFill();
}