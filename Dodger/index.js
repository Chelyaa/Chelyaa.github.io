var Graphics = PIXI.Graphics,
		renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x487aa0;
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.render(stage);

var player = new Graphics(),
		plStep = 15,
		plWidth = 24,
		plHeight = 24,
		plX = window.innerWidth/2-plWidth/2,
		plY = window.innerHeight-50,
		plObj = {
			centerX: plX+plWidth/2,
			centerY: plY+plHeight/2,
			x: plX,
			y: plY,
			halfWidth: plWidth/2,
			halfHeight: plHeight/2,
			width: plWidth,
			height: plHeight
		}
stage.addChild(player);

var blocks = new Graphics(),
		blocksArr = [],
		seed = 0.9,
		speed = 2;
stage.addChild(blocks);

update();
function update() {
	renderBlocks();
	player.clear();
	player.beginFill(0x66CCFF);
	player.drawRect(plX, plY, plWidth, plHeight);
	player.endFill();

	for(var i = 0; i < blocksArr.length; i++) {
		var block = blocksArr[i];
		if(block.y > window.innerHeight) {
			blocksArr.splice(i, 1);
			continue;
		}
		block.y += speed;
	}

	// if(detectColision())
		// lose();

	if(Math.random() > seed) 
		createBlock();

	renderer.render(stage);
	requestAnimationFrame(update);
}

function lose() {
	alert("You lose");
	window.location.reload();
}

function renderBlocks() {
	blocks.clear();
	blocks.beginFill(0xF14232);
	for(var i = 0; i < blocksArr.length; i++) {
		var block = blocksArr[i];
		blocks.drawRect(block.x, block.y, block.width, block.height);
	}
	blocks.endFill();
}

function createBlock() {
	seed = seed > 0 ? seed - 0.0001 : 0;
	var block = {
		width: random(20, 30),
		height: random(20, 30),
		x: random(0, window.innerWidth-30),
		y: -30
	}
	blocksArr.push(block);
}

document.addEventListener("keypress", function(e) {
	var code = e.charCode || e.keyCode;
	switch(code) {
		case 119://up
			if(plY - plStep < window.innerHeight-plHeight) {
				plY -= plStep;
			} else {
				plY = window.innerHeight-plHeight;
			}
			break;
		case 115://down
			if(plY + plStep < window.innerHeight-plHeight) {
				plY += plStep;
			} else {
				plY = window.innerHeight-plHeight;
			}
			break;
		case 100://right
			if(plX + plStep < window.innerWidth-plWidth) {
				plX += plStep;
			} else {
				plX = window.innerWidth-plWidth;
			}
			break;
		case 97://left
			if(plX - plStep > 0) {
				plX -= plStep;
			} else {
				plX = 0;
			}
			break;
	}
	plObj.x = plX;
	plObj.y = plY;
	plObj.centerX = plX+plWidth/2;
	plObj.centerY = plY+plHeight/2;
});

function detectColision() {
	for(var i = 0; i < blocksArr.length; i++) {
		if(hitTestRectangle(plObj, blocksArr[i]))
			return true;
	}

	return false;
}

function hitTestRectangle(r1, r2) {
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  hit = false;

  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }
  return hit;
}

function random(min , max) {
	return Math.floor(Math.random() * (max - min) + min);
}