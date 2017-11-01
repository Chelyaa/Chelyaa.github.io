function paintEl(numEl, turnEl, x, y, ctx, sizeBlock){
	// var numEl = numEl.split('-');
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#768C85';
	if(numEl == '0'){
		e0(x, y, ctx, sizeBlock);
	}
	if(numEl == '1'){
		e1(turnEl, ctx, x, y, sizeBlock);
	}
	if(numEl == '2'){
		e2(turnEl, ctx, x, y, sizeBlock);
	}
	if(numEl == '3'){
		e3(turnEl, ctx, x, y, sizeBlock);
	}
	if(numEl == '4'){
		e4(turnEl, ctx, x, y, sizeBlock);
	}
	if(numEl == '5'){
		e5(turnEl, ctx, x, y, sizeBlock);
	}
}

function e0(x, y, ctx, sizeBlock){
	ctx.fillRect(x, y, sizeBlock, sizeBlock);
}
function e1(turn, ctx, x, y, sizeBlock){
	var numEl = 1;
	if(numEl == 1){
		if(turn == 0 || turn == 2){
			ctx.moveTo(x+sizeBlock/2, y);
			ctx.lineTo(x+sizeBlock/2, y+sizeBlock);
		}
		if(turn == 1 || turn == 3){
			ctx.moveTo(x, y+sizeBlock/2);
			ctx.lineTo(x+sizeBlock, y+sizeBlock/2);
		}
		ctx.stroke();
	}
}
function e2(turn, ctx, x, y, sizeBlock){
	var numEl = 1;

	ctx.beginPath();
	var radius = Math.floor(sizeBlock / 4);
  ctx.arc(x+sizeBlock/2, y+sizeBlock/2, radius, 0, 2 * Math.PI, false);
  // ctx.arc(x+sizeBlock/2, y+sizeBlock/2, 1, 0, 2 * Math.PI, false);
	if(numEl == 1){
		var to = (sizeBlock - radius)/2 - 3;
		if(turn == 0){
	  	ctx.moveTo(x+sizeBlock/2, y);
	  	ctx.lineTo(x+sizeBlock/2, y+to);
	  }
	  if(turn == 1){
	  	ctx.moveTo(x+sizeBlock, y+sizeBlock/2);
	  	ctx.lineTo(x+sizeBlock-to, y+sizeBlock/2);
	  }
	  if(turn == 2){
	  	ctx.moveTo(x+sizeBlock/2, y+sizeBlock);
	  	ctx.lineTo(x+sizeBlock/2, y+sizeBlock-to);
	  }
	  if(turn == 3){
	  	ctx.moveTo(x, y+sizeBlock/2);
	  	ctx.lineTo(x+to, y+sizeBlock/2);
	  }
	}
  ctx.stroke();
}
function e3(turn, ctx, x, y, sizeBlock){
	var numEl = 1;
	ctx.beginPath();
	if(numEl == 1){
		if(turn == 0){
			ctx.moveTo(x, y+sizeBlock/2);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y);

			ctx.moveTo(x+sizeBlock/2, y);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock, y+sizeBlock/2);
		}
		if(turn == 1){
			ctx.moveTo(x+sizeBlock/2, y);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock, y+sizeBlock/2);

			ctx.moveTo(x+sizeBlock, y+sizeBlock/2);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y+sizeBlock);
		}
		if(turn == 2){
			ctx.moveTo(x+sizeBlock, y+sizeBlock/2);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y+sizeBlock);

			ctx.moveTo(x+sizeBlock/2, y+sizeBlock);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x, y+sizeBlock/2);
		}
		if(turn == 3){
			ctx.moveTo(x+sizeBlock/2, y+sizeBlock);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x, y+sizeBlock/2);

			ctx.moveTo(x, y+sizeBlock/2);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y);
		}
		ctx.stroke();
	}
}
function e4(turn, ctx, x, y, sizeBlock){
	numEl = 1;
	ctx.beginPath();
	if(numEl == 1){
		ctx.moveTo(x, y+sizeBlock/2);
		ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y);

		ctx.moveTo(x+sizeBlock/2, y);
		ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock, y+sizeBlock/2);

		ctx.moveTo(x+sizeBlock, y+sizeBlock/2);
		ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y+sizeBlock);

		ctx.moveTo(x+sizeBlock/2, y+sizeBlock);
		ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x, y+sizeBlock/2);
	}
	ctx.stroke();
}

function e5(turn, ctx, x, y, sizeBlock){
	var numEl = 1;

	ctx.beginPath();
	if(numEl == 1){
		if(turn == 0){
			ctx.moveTo(x+sizeBlock/2, y);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock, y+sizeBlock/2);
		}
		if(turn == 1){
			ctx.moveTo(x+sizeBlock, y+sizeBlock/2);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y+sizeBlock);
		}
		if(turn == 2){
			ctx.moveTo(x+sizeBlock/2, y+sizeBlock);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x, y+sizeBlock/2);
		}
		if(turn == 3){
			ctx.moveTo(x, y+sizeBlock/2);
			ctx.quadraticCurveTo(x+sizeBlock/2, y+sizeBlock/2, x+sizeBlock/2, y);
		}
	}
	ctx.stroke();
}