function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPatts(table, width, height, pattern, imgs){
  var tr, td, img;
  for(var i = 0; i < height; i++){
    tr =  document.createElement("tr");
    table.appendChild(tr);
    for(var j = 0; j < width; j++){
      td = document.createElement("td");
      td.id = i + "_" + j;
      tr.appendChild(td);
      img = document.createElement("img");
      img.id = "img_" + i + "_" + j;
      td.appendChild(img);
      img.src = imgs[pattern[i][j][0]][random(0, imgs[pattern[i][j][0]].length - 1)];
      var rot = pattern[i][j][1] == 1 ? 90 : pattern[i][j][1] == 2 ? 180 : pattern[i][j][1] == 3 ? 270 : 0
      img.style.transform = "rotate(" + rot + "deg)";
    }
  }
}

function paintPatts(width, height, pattern, imgs){
  var img;
  for(var i = 0; i < height; i++){
    for(var j = 0; j < width; j++){
      img = document.getElementById("img_" + i + "_" + j);
      img.src = imgs[pattern[i][j][0]][random(0, imgs[pattern[i][j][0]].length - 1)];
      var rot = pattern[i][j][1] == 1 ? 90 : pattern[i][j][1] == 2 ? 180 : pattern[i][j][1] == 3 ? 270 : 0
      img.style.transform = "rotate(" + rot + "deg)";
    }
  }
}

function createCanvasPattern(width, height, canvas, ctx, sizeBlock){
	canvas.width = width * sizeBlock;
	canvas.height = height * sizeBlock;
	// ctx.fillStyle = "#D1E8DE";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, width*sizeBlock, height*sizeBlock);
}
function paintPattern(width, height, pattern, ctx, sizeBlock){
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			paintEl(pattern[i][j][0], pattern[i][j][1], j*sizeBlock, i*sizeBlock, ctx, sizeBlock);
		}
	}
}