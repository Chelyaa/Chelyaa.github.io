var startFlag = true;
var Graphics = PIXI.Graphics;
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x487aa0;
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.render(stage);

var platform = new Graphics(),
		plWidth = 100,
		plHeight = 20,
		plX = window.innerWidth/2-plWidth/2,
		plY = window.innerHeight-50,
		platformObj = {
			centerX: plX+plWidth/2,
			centerY: plY+plHeight/2,
			x: plX,
			y: plY,
			halfWidth: plWidth/2,
			halfHeight: plHeight/2,
			width: plWidth,
			height: plHeight
		}
stage.addChild(platform);

var ball = new Graphics();
		bRadius = 20,
		bX = window.innerWidth/2;
		bY = plY-bRadius-2,
		bVx = 0;
		bVy = 0,
		ballObj = {
			centerX: bX,
			centerY: bY,
			x: bX-bRadius,
			y: bY-bRadius,
			halfWidth: bRadius,
			halfHeight: bRadius,
			width: bRadius*2,
			height: bRadius*2
		}
stage.addChild(ball);

var blocks = new Graphics(),
		blStartX = 20,
		blStartY = 20,
		blMarginH = 20,
		blMarginV = 40,
		blM = 13,
		blN = 5,
		blWidth = 80,
		blHeight = 40,
		blocksObj = new Array(blN);
stage.addChild(blocks);
for(var i = 0; i < blN; i++) {
	blocksObj[i] = new Array(blM);
	for(var j = 0; j < blM; j++) {
		blocksObj[i][j] = {
			centerX: blStartX+(blWidth/2+blMarginH)*j,
			centerY: blStartY+(blHeight/2+blMarginV)*i,
			x: blStartX+(blWidth+blMarginH)*j,
			y: blStartY+(blHeight/2+blMarginV)*i,
			halfWidth: blWidth/2,
			halfHeight: blHeight/2,
			width: blWidth,
			height: blHeight,
			destroy: false
		}
	}
}

function update() {
	renderBlocks();
	platform.clear();
	platform.beginFill(0x66CCFF);
	platform.drawRect(plX, plY, plWidth, plHeight);
	platform.endFill();

	if(bX + bVx > window.innerWidth-bRadius || bX + bVx < bRadius) {
		bVx = -bVx;
	}
	if(bY + bVy > window.innerHeight-bRadius || bY + bVy < bRadius) {
		bVy = -bVy;
	}
	bX += bVx;
	bY += bVy;
	ball.clear();
	ball.beginFill(0xd35d5d);
	ball.drawCircle(0, 0, bRadius);
	ball.endFill();
	ball.x = bX;
	ball.y = bY;
	ballObj.x = bX-bRadius;
	ballObj.y = bY-bRadius;
	ballObj.centerX = bX;
	ballObj.centerY = bY;

	if(hitTestRectangle(platformObj, ballObj)) {
	  bVy = -bVy;
	}
	var block;
	for(var i = 0; i < blocksObj.length; i++) {
		for(var j = 0; j < blocksObj[i].length; j++) {
			block = blocksObj[i][j];
			if(!block.destroy && hitTestRectangle(block, ballObj)) {
			  blocksObj[i][j].destroy = true;
			  if(block.y+block.height > ballObj.centerY+bRadius || block.y+block.height < ballObj.y+bRadius) {
			  	bVy = -bVy;
			  } else if((block.x+blWidth < ballObj.x+bRadius || block.x+blWidth > ballObj.centerX+bRadius) && block.y < ballObj.centerY+bRadius) {
			  	bVx = -bVx;
			  }
			}
		}
	}

	blocks.clear();
	renderBlocks();

	renderer.render(stage);
	requestAnimationFrame(update);
}
update();

function renderBlocks() {
	var block;
	for(var i = 0; i < blN; i++) {
		for(var j = 0; j < blM; j++) {
			block = blocksObj[i][j];
			if(!block.destroy) {
				blocks.beginFill(0x66CCFF);
				blocks.drawRect(block.x, block.y, block.width, block.height);
				blocks.endFill();
			}
		}
	}
}

document.addEventListener("keypress", function(e) {
	var code = e.charCode || e.keyCode,
			step = 20;
	switch(code) {
		case 100:
			if(plX + step < window.innerWidth-plWidth) {
				plX += step;
			} else {
				plX = window.innerWidth-plWidth;
			}
			break;
		case 97:
			if(plX - step > 0) {
				plX -= step;
			} else {
				plX = 0;
			}
			break;
		case 32:
			if(startFlag) {
				bVx = random(3, 6);
				bVy = -random(3, 6);
				startFlag = false;
			}
			break;
	}
	platformObj.x = plX;
	platformObj.y = plY;
	platformObj.centerX = plX+plWidth/2;
	platformObj.centerY = plY+plHeight/2;
});

function random(min, max) {
	return Math.floor(Math.random() * (max-min) + min);
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