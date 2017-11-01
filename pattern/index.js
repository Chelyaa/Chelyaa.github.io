var imgs = [['images/0.jpg'],
						['images/1.jpg'],			
						['images/2.jpg'],	
						['images/3.jpg'],	
						['images/4.jpg', 'images/4-1.jpg'],	
						['images/5.jpg', 'images/5-1.jpg']];

var sizeBlock = 30;
var width = Math.floor(window.innerWidth/sizeBlock) - 1;
var height = Math.floor(window.innerHeight/sizeBlock) - 1;
console.log(width + "_" + height);

var pattern = new Pattern(width, height);
var patternData = pattern.createPattern();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
createCanvasPattern(width, height, canvas, ctx, sizeBlock);
paintPattern(width, height, patternData, ctx, sizeBlock);


// var table = document.getElementById('table');
// table.innerHTML = '';
// createPatt(table, width, height, patternData, imgs);
// paintPatt(width, height, patternData, imgs);
