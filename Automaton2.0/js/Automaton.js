function Automaton(width, height, arrAutomaton, wB, hB, x, y, mainClass){
	this.mainClass = mainClass;
	this.w = width;
	this.h = height;
	this.x = x;
	this.y = y;
	this.wB = wB;
	this.hB = hB;
	this.scene = this.mainClass.scene;
	this.oldGeneration = arrAutomaton;
	this.newGeneration = this.oldGeneration;
	this.generation = [];
	this.signatures = [];
	this.renderArr = null;

	this.clone = function(a){
		b = [];
		a.forEach(function(subArray) {
		    b.push(subArray.concat());
		});
		return b;
	}

	this.findNeighbors = function(x, y){
		var neighbors = [];
		var maton = this.oldGeneration;

		if(y == 0){
			neighbors.push(maton[this.h-1][x]);
		}else{
			neighbors.push(maton[y-1][x]);
		}

		if(x < this.w-1 && y == 0){
			neighbors.push(maton[this.h-1][x+1]);
		}else if(x == this.w-1 && y == 0){
			neighbors.push(maton[this.h-1][0]);
		}else if(x == this.w-1 && y < this.h-1){
			neighbors.push(maton[y-1][0]);
		}else{
			neighbors.push(maton[y-1][x+1]);
		}

		if(x == this.w-1){
			neighbors.push(maton[y][0]);
		}else{
			neighbors.push(maton[y][x+1]);
		}

		if(x == this.w-1 && y < this.h-1){
			neighbors.push(maton[y+1][0]);
		}else if(x == this.w-1 && y == this.h-1){
			neighbors.push(maton[0][0]);
		}else if(x < this.w-1 && y == this.h-1){
			neighbors.push(maton[0][x+1]);
		}else{
			neighbors.push(maton[y+1][x+1]);
		}

		if(y == this.h-1){
			neighbors.push(maton[0][x]);
		}else{
			neighbors.push(maton[y+1][x]);
		}

		if(x > 0 && y == this.h-1){
			neighbors.push(maton[0][x-1]);
		}else if(x == 0 && y == this.h-1){
			neighbors.push(maton[0][this.w-1]);
		}else if(x == 0 && y < this.h-1){
			neighbors.push(maton[y+1][this.w-1]);
		}else{
			neighbors.push(maton[y+1][x-1]);
		}

		if(x == 0){
			neighbors.push(maton[y][this.w-1]);
		}else{
			neighbors.push(maton[y][x-1]);
		}

		if(x == 0 && y > 0){
			neighbors.push(maton[y-1][this.w-1]);
		}else if(x == 0 && y == 0){
			neighbors.push(maton[this.h-1][this.w-1]);
		}else if(x > 0 && y == 0){
			neighbors.push(maton[this.h-1][x-1]);
		}else{
			neighbors.push(maton[y-1][x-1]);
		}

		return neighbors;
	}

	this.numberLiveNeighbors = function(neigh){
		var number = 0;

		for(var i = 0; i < 8; i++){
			if(neigh[i] == 1)
				number++;
		}

		return number;
	}

	this.step = function(){
		var isUniqueGeneration = this.isUniqueGeneration(this.createSignature(this.oldGeneration));
		var isEmptyGeneration = this.isEmptyGeneration(this.oldGeneration);
		if(isUniqueGeneration == 0 || isEmptyGeneration == 1)
			return 0;
		var neighbors;
		var live;

		this.newGeneration = this.clone(this.oldGeneration);
		for(var i = 0; i < this.h; i++){
			for(var j = 0; j < this.w; j++){
				neighbors = this.findNeighbors(j, i);
				live = this.numberLiveNeighbors(neighbors);
				if(this.oldGeneration[i][j] == 0 && live == 3){
					this.newGeneration[i][j] = 1;
				}
				if(this.oldGeneration[i][j] == 1 && (live < 2 || live > 3)){
					this.newGeneration[i][j] = 0;
				}
			}
		}

		var signature = this.createSignature(this.oldGeneration);
		this.signatures.push(signature);
		var generation = [signature, this.oldGeneration];
		this.generation.push(generation);

		this.oldGeneration = this.clone(this.newGeneration);
		
		return 1;
	}

	this.renderGeneration = function(){
		var x = this.x;
		var y = this.y;
		var wB = this.wB;
		var hB = this.hB;
		var scene = this.scene;
		var colors = ['#FFF', '#000'];
		if(this.renderArr == null){
			this.renderArr = [];
			this.renderArr = new Array(this.h);
			for(var i = 0; i < this.h; i++){
				this.renderArr[i] = new Array(this.w);
				for(var j = 0; j < this.w; j++){
					this.renderArr[i][j] = scene.createObj('rect', {
						'x' : j*wB+wB/2+x,
						'y' : i*hB+hB/2+y,
						'width' : wB,
						'height' : hB,
						'layer' : 1
					});
					this.renderArr[i][j].styles = {'fillC' : colors[this.oldGeneration[i][j]]};
				}
			}
		}else{
			for(var i = 0; i < this.h; i++){
				for(var j = 0; j < this.w; j++){
					this.renderArr[i][j].styles.fillC = colors[this.oldGeneration[i][j]];
				}
			}
		}
	}

	this.createSignature = function(generation){
		var signature = '';
		for(var i = 0; i < generation.length; i++){
			for(var j = 0; j < generation[i].length; j++){
				signature += generation[i][j].toString();
			}
		}

		return signature;
	}

	this.isUniqueGeneration = function(signature){
		for(var i = 0; i < this.generation.length; i++){
			if(this.generation[i][0] == signature)
				return 0;
		}

		return 1;
	}

	this.isEmptyGeneration = function(generation){
		for(var i = 0; i < generation.length; i++){
			for(var j = 0; j < generation[i].length; j++){
				if(generation[i][j] == 1)
					return 0;
			}
		}

		if(generation.length > 0){
			return 1;
		}else{
			return 0;
		}
	}

	this.prevGeneration = function(){
		var length = this.generation.length;
		this.oldGeneration = this.generation[length-1][1];
		this.generation.splice(length-1, 1);
	}
}