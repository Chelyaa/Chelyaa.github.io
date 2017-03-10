var Functions = function(mainClass){
	this.mainClass = mainClass;

	this.setBgc = function(color){
		var scene = this.mainClass.scene;
		var width = this.mainClass.tmp.wW;
		var height = this.mainClass.tmp.hW;
		var bgc = scene.createObj('rect', {
			'x' : width/2,
			'y' : height/2,
			'w' : width,
			'h' : height,
			'layer' : 0
		});
		bgc.styles = {
			'fillC' : color,
		}
		this.mainClass.graphEngine.renderCanvas();
	}

	this.createStats = function(){
		var stats = new Stats;
		var width = stats.domElement.offsetWidth;
		stats.setMode(0);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = window.innerWidth - 80 + 'px';
		stats.domElement.style.top = 0 + 'px';
		document.body.appendChild(stats.domElement);

		return stats;
	}

	this.generateRandArr = function(width, height, prob){
		var chProb;

		var arr = new Array(height);
		for(var i = 0; i < height; i++){
			arr[i] = new Array(width);
			for(var j = 0; j < width; j++){
				chProb = Math.random();
				arr[i][j] = chProb > prob ? 0 : 1;
			}
		}

		return arr;
	}

	this.generateArrByStartPattern = function(width, height, startPatt){
		var widthStart = startPatt[0].length;
		var heightStart = startPatt.length;

		if(width < widthStart || height < heightStart){
			return startPatt;
		}

		var arr = [];
		arr = new Array(height);
		for(var i = 0; i < height; i++){
			arr[i] = new Array(width);
			for(var j = 0; j < width; j++){
				arr[i][j] = 0;
			}
		}

		var startX = Math.ceil(width/2) - Math.ceil(widthStart/2);
		var startY = Math.ceil(height/2) - Math.ceil(heightStart/2);
		
		for(var i = startY; i < heightStart + startY; i++){
			for(var j = startX; j < widthStart + startX; j++){
				arr[i][j] = startPatt[i-startY][j-startX];
			}
		}

		return arr;
	}

}