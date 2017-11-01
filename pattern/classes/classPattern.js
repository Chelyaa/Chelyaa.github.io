function Pattern(width, height){
	this.width = width;
	this.height = height;
	this.patternData = [];
	this.aroundPointers = [];
	this.createPattern = function(){
		this.createDataStructure();
		this.generateRandomPattern();
		this.validationByPosition();
		this.validationByTurn();
		return this.patternData;
	}

	this.createDataStructure = function(){
		this.patternData = new Array(this.height);
		for(var i = 0; i < this.height; i++){
			this.patternData[i] = new Array(this.width);
			for(var j = 0; j  < this.width; j++){
				this.patternData[i][j] = [0, 0];
			}
		}

		this.aroundPointers = new Array(this.height);
		for(var i = 0; i < this.height; i++){
			this.aroundPointers[i] = new Array(this.width);
			for(var j = 0; j  < this.width; j++){
				this.aroundPointers[i][j] = [0, 0, 0, 0];
			}
		}
	}

	this.generateRandomPattern = function(){
		for(var i = 0; i < this.height; i++){
	    for(var j = 0; j < this.width; j++){
	      var rand = random(0, 5);
	      this.patternData[i][j][0] = rand < 6 ? rand : 0;
	      this.patternData[i][j][1] = random(0, 3);
	    }
  	}
	}

	this.validationByPosition = function(){
		for(var i = 0; i < this.height; i++){
		  for(var j = 0; j < this.width; j++){
		    var point = this.patternData[i][j][0];
		    switch(point){
		      case 1:
		         if((i == 0 && j == 0) || (i == 0 && j == this.width-1) || (i == this.height-1 && j == 0) || (i == this.height-1 && j == this.width-1)){
		           var rand = random(0, 2);
		           this.patternData[i][j][0] = rand == 0 ? 2 : rand == 1 ? 5 : 0;
		         }
		      break;
		      case 3:
		         if((i == 0 && j == 0) || (i == 0 && j == this.width-1) || (i == this.height-1 && j == 0) || (i == this.height-1 && j == this.width-1)){
		           var rand = random(0, 2);
		           this.patternData[i][j][0] = rand == 0 ? 2 : rand == 1 ? 5 : 0;
		         }
		      break;
		      case 4:
		         if((i == 0 && j == 0) || (i == 0 && j == this.width-1) || (i == this.height-1 && j == 0) || (i == this.height-1 && j == this.width-1)){
		           var rand = random(0, 2);
		           this.patternData[i][j][0] = rand == 0 ? 2 : rand == 1 ? 5 : 0;
		         }
		         if((i == 0 && j != 0 && j != this.width-1) || (i == this.height-1 && j != 0 && j != this.width-1) || (j == 0 && i != 0 && i != this.height-1) || (j == this.width-1 && i != 0 && i != this.height-1)){
		           var rand = random(0, 5);
		           this.patternData[i][j][0] = rand != 4 ? rand : 0;
		         }
		      break;
		    }
		  }
		}

		for(var i = 0; i < this.height; i++){
		  for(var j = 0; j < this.width; j++){
		    var point = this.patternData[i][j][0];
		    var pointTurn = this.patternData[i][j][1];
		    switch(point){
		      case 1:
		        if((i == 0 && j != 0 && j != this.width-1) || (i == this.height-1 && j != 0 && j != this.width-1)){
		          if(pointTurn == 0 || pointTurn == 2){
		            this.patternData[i][j][1] = 1;
		          }
		        }
		        if((j == 0 && i != 0 && i != this.height-1) || (j == this.width-1 && i != 0 && i != this.height-1)){
		          if(pointTurn == 1 || pointTurn == 3){
		            this.patternData[i][j][1] = 0;
		          }
		        }
		      break;
		      case 2:
		        if(i == 0 && j == 0){
		          if(pointTurn == 0 || pointTurn == 3){
		            var rand = random(1, 2);
		            this.patternData[i][j][1] = rand;
		          }
		        }
		        if(i == 0 && j == this.width-1){
		          if(pointTurn == 0 || pointTurn == 1){
		            var rand = random(2, 3);
		            this.patternData[i][j][1] = rand;
		          }
		        }
		        if(i == this.height-1 && j == 0){
		          if(pointTurn == 3 || pointTurn == 2){
		            var rand = random(0, 1);
		            this.patternData[i][j][1] = rand;
		          }
		        }
		        if(i == this.height-1 && j == this.width-1){
		          if(pointTurn == 1 || pointTurn == 2){
		            var rand = random(0, 1);
		            this.patternData[i][j][1] = rand == 0 ? 3 : 0;
		          }
		        }
		        if(i == 0 && j != 0 && j != this.width-1) {
		          if(pointTurn == 0){
		            var rand = random(0, 2);
		            this.patternData[i][j][1] = rand == 0 ? 2 : rand == 1 ? 1 : 3;
		          }
		        }
		        if(i == this.height-1 && j != 0 && j != this.width-1){
		          if(pointTurn == 2){
		            var rand = random(0, 2);
		            this.patternData[i][j][1] = rand == 0 ? 0 : rand == 1 ? 1 : 3;
		          }
		        }
		        if(j == 0 && i != 0 && i != this.height-1){
		          if(pointTurn == 3){
		            var rand = random(0, 2);
		            this.patternData[i][j][1] = rand == 0 ? 0 : rand == 1 ? 1 : 2;
		          }
		        }
		        if(j == this.width-1 && i != 0 && i != this.height-1){
		          if(pointTurn == 1){
		            var rand = random(0, 2);
		            this.patternData[i][j][1] = rand == 0 ? 0 : rand == 1 ? 3 : 2;
		          }
		        }
		      break;
		      case 3:
		        if(i == 0 && j != 0 && j != this.width-1) {
		          if(pointTurn != 2){ this.patternData[i][j][1] = 2; }
		        }
		        if(i == this.height-1 && j != 0 && j != this.width-1){
		          if(pointTurn != 0){ this.patternData[i][j][1] = 0; }
		        }
		        if(j == 0 && i != 0 && i != this.height-1){
		          if(pointTurn != 1){ this.patternData[i][j][1] = 1; }
		        }
		        if(j == this.width-1 && i != 0 && i != this.height-1){
		          if(pointTurn != 3){ this.patternData[i][j][1] = 3; }
		        }
		      break;
		      case 5:
		        if(i == 0 && j == 0){
		          if(pointTurn == 0 || pointTurn == 3){
		            if(pointTurn != 2){ this.patternData[i][j][1] = 1; }
		          }
		        }
		        if(i == 0 && j == this.width-1){
		          if(pointTurn != 1){ this.patternData[i][j][1] = 2; }
		        }
		        if(i == this.height-1 && j == 0){
		          if(pointTurn != 0){ this.patternData[i][j][1] = 0; }
		        }
		        if(i == this.height-1 && j == this.width-1){
		          if(pointTurn != 3){ this.patternData[i][j][1] = 3; }
		        }
		        if(i == 0 && j != 0 && j != this.width-1) {
		          if(pointTurn == 0 || pointTurn == 3){
		            var rand = random(1, 2);
		            this.patternData[i][j][1] = rand;
		          }
		        }
		        if(i == this.height-1 && j != 0 && j != this.width-1){
		          if(pointTurn == 1 || pointTurn == 2){
		            var rand = random(0, 1);
		            this.patternData[i][j][1] = rand == 0 ? 0 : 3;
		          }
		        }
		        if(j == 0 && i != 0 && i != this.height-1){
		          if(pointTurn == 2 || pointTurn == 3){
		            var rand = random(0, 1);
		            this.patternData[i][j][1] = rand;
		          }
		        }
		        if(j == this.width-1 && i != 0 && i != this.height-1){
		          if(pointTurn == 0 || pointTurn == 1){
		            var rand = random(2, 3);
		            this.patternData[i][j][1] = rand;
		          }
		        }
		      break;
		    }
		  }
		}
		this.setAroundPointers();
	}

	this.validationByTurn = function(){
		for(var i = 0; i < this.height; i++){
		  for(var j = 0; j < this.width; j++){
		    point = this.patternData[i][j][0];
		    var around = this.getAroundPointersOfOncePoint(i, j);
		    if(point == 0){
		      /*
		          1       0       0       0
		        0   0   0   1   0   0   1   0
		          0       0       1       0
		      */
		      if(around[0] == 1 && around[1] == 0 && around[2] == 0 && around[3] == 0){
		        this.patternData[i][j][0] = 2;
		        this.patternData[i][j][1] = 0;
		        this.aroundPointers[i][j] = [1, 0, 0, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 0 && around[3] == 0){
		        this.patternData[i][j][0] = 2;
		        this.patternData[i][j][1] = 1;
		        this.aroundPointers[i][j] = [0, 1, 0, 0];
		      }
		      if(around[0] == 0 && around[1] == 0 && around[2] == 1 && around[3] == 0){
		        this.patternData[i][j][0] = 2;
		        this.patternData[i][j][1] = 2;
		        this.aroundPointers[i][j] = [0, 0, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 0 && around[2] == 0 && around[3] == 1){
		        this.patternData[i][j][0] = 2;
		        this.patternData[i][j][1] = 3;
		        this.aroundPointers[i][j] = [0, 0, 0, 1];
		      }
		      /*
		          1       0       0       1       1       0
		        0   1   0   1   1   0   1   0   0   0   1   1
		          0       1       1       0       1       0
		      */
		      if(around[0] == 1 && around[1] == 1 && around[2] == 0 && around[3] == 0){
		        this.patternData[i][j][0] = 5;
		        this.patternData[i][j][1] = 0;
		        this.aroundPointers[i][j] = [1, 1, 0, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 1 && around[3] == 0){
		        this.patternData[i][j][0] = 5;
		        this.patternData[i][j][1] = 1;
		        this.aroundPointers[i][j] = [0, 1, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 0 && around[2] == 1 && around[3] == 1){
		        this.patternData[i][j][0] = 5;
		        this.patternData[i][j][1] = 2;
		        this.aroundPointers[i][j] = [0, 0, 1, 1];
		      }
		      if(around[0] == 1 && around[1] == 0 && around[2] == 0 && around[3] == 1){
		        this.patternData[i][j][0] = 5;
		        this.patternData[i][j][1] = 3;
		        this.aroundPointers[i][j] = [1, 0, 0, 1];
		      }
		      if(around[0] == 1 && around[1] == 0 && around[2] == 1 && around[3] == 0){
		        this.patternData[i][j][0] = 1;
		        this.patternData[i][j][1] = 0;
		        this.aroundPointers[i][j] = [1, 0, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 0 && around[3] == 1){
		        this.patternData[i][j][0] = 1;
		        this.patternData[i][j][1] = 1;
		        this.aroundPointers[i][j] = [0, 1, 0, 1];
		      }
		      /*
		          1       0       1       1 
		        0   1   1   1   1   0   1   1
		          1       1       1       0 
		      */
		      if(around[0] == 1 && around[1] == 1 && around[2] == 1 && around[3] == 0){
		        this.patternData[i][j][0] = 3;
		        this.patternData[i][j][1] = 1;
		        this.aroundPointers[i][j] = [1, 1, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 1 && around[3] == 1){
		        this.patternData[i][j][0] = 3;
		        this.patternData[i][j][1] = 2;
		        this.aroundPointers[i][j] = [0, 1, 1, 1];
		      }
		      if(around[0] == 1 && around[1] == 0 && around[2] == 1 && around[3] == 1){
		        this.patternData[i][j][0] = 3;
		        this.patternData[i][j][1] = 3;
		        this.aroundPointers[i][j] = [1, 0, 1, 1];
		      }
		      if(around[0] == 1 && around[1] == 1 && around[2] == 0 && around[3] == 1){
		        this.patternData[i][j][0] = 3;
		        this.patternData[i][j][1] = 0;
		        this.aroundPointers[i][j] = [1, 1, 0, 1];
		      }
		      /*
		          1
		        1   1
		          1
		      */
		      if(around[0] == 1 && around[1] == 1 && around[2] == 1 && around[3] == 1){
		        this.patternData[i][j][0] = 4;
		        this.patternData[i][j][1] = 0;
		        this.aroundPointers[i][j] = [1, 1, 1, 1];
		      }
		    }
		  }
		}
		for(var i = 0 ; i < this.height; i++){
		  for(var j = 0; j < this.width; j++){
		    point = this.patternData[i][j][0];
		    var around = this.getAroundPointersOfOncePoint(i, j);
		    if(point != 0){
		      /*
		          1       0       0       0
		        0   0   0   1   0   0   1   0
		          0       0       1       0
		      */
		      if(around[0] == 1 && around[1] == 0 && around[2] == 0 && around[3] == 0){
		        if(this.patternData[i][j][0] != 2){
		          this.patternData[i][j][0] = 2;
		          this.patternData[i][j][1] = 0;
		        }else if(this.patternData[i][j][1] != 0){
		          this.patternData[i][j][1] = 0;
		        }
		        this.aroundPointers[i][j] = [1, 0, 0, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 0 && around[3] == 0){
		        if(this.patternData[i][j][0] != 2){
		          this.patternData[i][j][0] = 2;
		          this.patternData[i][j][1] = 1;
		        }else if(this.patternData[i][j][1] != 1){
		          this.patternData[i][j][1] = 1;
		        }
		        this.aroundPointers[i][j] = [0, 1, 0, 0];
		      }
		      if(around[0] == 0 && around[1] == 0 && around[2] == 1 && around[3] == 0){
		        if(this.patternData[i][j][0] != 2){
		          this.patternData[i][j][0] = 2;
		          this.patternData[i][j][1] = 2;
		        }else if(this.patternData[i][j][1] != 2){
		          this.patternData[i][j][1] = 2;
		        }
		        this.aroundPointers[i][j] = [0, 0, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 0 && around[2] == 0 && around[3] == 1){
		        if(this.patternData[i][j][0] != 2){
		          this.patternData[i][j][0] = 2;
		          this.patternData[i][j][1] = 3;
		        }else if(this.patternData[i][j][1] != 3){
		          this.patternData[i][j][1] = 3;
		        }
		        this.aroundPointers[i][j] = [0, 0, 0, 1];
		      }
		      /*
		          1       0       0       1       1       0
		        0   1   0   1   1   0   1   0   0   0   1   1
		          0       1       1       0       1       0
		      */
		      if(around[0] == 1 && around[1] == 1 && around[2] == 0 && around[3] == 0){
		        if(this.patternData[i][j][0] != 5){
		          this.patternData[i][j][0] = 5;
		          this.patternData[i][j][1] = 0;
		        }else if(this.patternData[i][j][1] != 0){
		          this.patternData[i][j][1] = 0;
		        }
		        this.aroundPointers[i][j] = [1, 1, 0, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 1 && around[3] == 0){
		        if(this.patternData[i][j][0] != 5){
		          this.patternData[i][j][0] = 5;
		          this.patternData[i][j][1] = 1;
		        }else if(this.patternData[i][j][1] != 1){
		          this.patternData[i][j][1] = 1;
		        }
		        this.aroundPointers[i][j] = [0, 1, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 0 && around[2] == 1 && around[3] == 1){
		        if(this.patternData[i][j][0] != 5){
		          this.patternData[i][j][0] = 5;
		          this.patternData[i][j][1] = 2;
		        }else if(this.patternData[i][j][1] != 2){
		          this.patternData[i][j][1] = 2;
		        }
		        this.aroundPointers[i][j] = [0, 0, 1, 1];
		      }
		      if(around[0] == 1 && around[1] == 0 && around[2] == 0 && around[3] == 1){
		        if(this.patternData[i][j][0] != 5){
		          this.patternData[i][j][0] = 5;
		          this.patternData[i][j][1] = 3;
		        }else if(this.patternData[i][j][1] != 3){
		          this.patternData[i][j][1] = 3;
		        }
		        this.aroundPointers[i][j] = [1, 0, 0, 1];
		      }
		      if(around[0] == 1 && around[1] == 0 && around[2] == 1 && around[3] == 0){
		        if(this.patternData[i][j][0] != 1){
		          this.patternData[i][j][0] = 1;
		          this.patternData[i][j][1] = 0;
		        }else if(this.patternData[i][j][1] != 0 || this.patternData[i][j][1] != 2){
		          this.patternData[i][j][1] = 0;
		        }
		        this.aroundPointers[i][j] = [1, 0, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 0 && around[3] == 1){
		        if(this.patternData[i][j][0] != 1){
		          this.patternData[i][j][0] = 1;
		          this.patternData[i][j][1] = 1;
		        }else if(this.patternData[i][j][1] != 1 || this.patternData[i][j][1] != 3){
		          this.patternData[i][j][1] = 1;
		        }
		        this.aroundPointers[i][j] = [0, 1, 0, 1];
		      }
		      /*
		          1       0       1       1 
		        0   1   1   1   1   0   1   1
		          1       1       1       0 
		      */
		      if(around[0] == 1 && around[1] == 1 && around[2] == 1 && around[3] == 0){
		        if(this.patternData[i][j][0] != 3){
		          this.patternData[i][j][0] = 3;
		          this.patternData[i][j][1] = 1;
		        }else if(this.patternData[i][j][1] != 1){
		          this.patternData[i][j][1] = 1;
		        }
		        this.aroundPointers[i][j] = [1, 1, 1, 0];
		      }
		      if(around[0] == 0 && around[1] == 1 && around[2] == 1 && around[3] == 1){
		        if(this.patternData[i][j][0] != 3){
		          this.patternData[i][j][0] = 3;
		          this.patternData[i][j][1] = 2;
		        }else if(this.patternData[i][j][1] != 2){
		          this.patternData[i][j][1] = 2;
		        }
		        this.aroundPointers[i][j] = [0, 1, 1, 1];
		      }
		      if(around[0] == 1 && around[1] == 0 && around[2] == 1 && around[3] == 1){
		        if(this.patternData[i][j][0] != 3){
		          this.patternData[i][j][0] = 3;
		          this.patternData[i][j][1] = 3;
		        }else if(this.patternData[i][j][1] != 3){
		          this.patternData[i][j][1] = 3;
		        }
		        this.aroundPointers[i][j] = [1, 0, 1, 1];
		      }
		      if(around[0] == 1 && around[1] == 1 && around[2] == 0 && around[3] == 1){
		       if(this.patternData[i][j][0] != 3){
		          this.patternData[i][j][0] = 3;
		          this.patternData[i][j][1] = 0;
		        }else if(this.patternData[i][j][1] != 0){
		          this.patternData[i][j][1] = 0;
		        }
		        this.aroundPointers[i][j] = [1, 1, 0, 1];
		      }
		      /*
		          1
		        1   1
		          1
		      */
		      if(around[0] == 1 && around[1] == 1 && around[2] == 1 && around[3] == 1){
		        if(this.patternData[i][j][0] != 4){
		          this.patternData[i][j][0] = 4;
		          this.patternData[i][j][1] = 0;
		        }
		        this.aroundPointers[i][j] = [1, 1, 1, 1];
		      }
		      /*
		          0
		        0   0
		          0
		      */
		      if(around[0] == 0 && around[1] == 0 && around[2] == 0 && around[3] == 0){
		        if(this.patternData[i][j][0] != 0){
		          this.patternData[i][j][0] = 0;
		          this.patternData[i][j][1] = 0;
		        }
		        this.aroundPointers[i][j] = [0, 0, 0, 0];
		      }
		    }
		  }
		}
	}

	this.setAroundPointers = function(){
		for(var i = 0; i < this.height; i++){
			for(var j = 0; j < this.width; j++){
				if(this.patternData[i][j][0] == 1 && (this.patternData[i][j][1] == 0 || this.patternData[i][j][1] == 2)){
		      this.aroundPointers[i][j] = [1, 0, 1, 0];
		    }
		    if(this.patternData[i][j][0] == 1 && (this.patternData[i][j][1] == 1 || this.patternData[i][j][1] == 3)){
		      this.aroundPointers[i][j] = [0, 1, 0, 1];
		    }
		    if(this.patternData[i][j][0] == 2 && this.patternData[i][j][1] == 0){
		      this.aroundPointers[i][j] = [1, 0, 0, 0];
		    }
		    if(this.patternData[i][j][0] == 2 && this.patternData[i][j][1] == 1){
		      this.aroundPointers[i][j] = [0, 1, 0, 0];
		    }
		    if(this.patternData[i][j][0] == 2 && this.patternData[i][j][1] == 2){
		      this.aroundPointers[i][j] = [0, 0, 1, 0];
		    }
		    if(this.patternData[i][j][0] == 2 && this.patternData[i][j][1] == 3){
		      this.aroundPointers[i][j] = [0, 0, 0, 1];
		    }
		    if(this.patternData[i][j][0] == 3 && this.patternData[i][j][1] == 0){
		      this.aroundPointers[i][j] = [1, 1, 0, 1];
		    }
		    if(this.patternData[i][j][0] == 3 && this.patternData[i][j][1] == 1){
		      this.aroundPointers[i][j] = [1, 1, 1, 0];
		    }
		    if(this.patternData[i][j][0] == 3 && this.patternData[i][j][1] == 2){
		      this.aroundPointers[i][j] = [0, 1, 1, 1];
		    }
		    if(this.patternData[i][j][0] == 3 && this.patternData[i][j][1] == 3){
		      this.aroundPointers[i][j] = [1, 0, 1, 1];
		    }
		    if(this.patternData[i][j][0] == 4){
		      this.aroundPointers[i][j] = [1, 1, 1, 1];
		    }
		    if(this.patternData[i][j][0] == 5 && this.patternData[i][j][1] == 0){
		      this.aroundPointers[i][j] = [1, 1, 0, 0];
		    }
		    if(this.patternData[i][j][0] == 5 && this.patternData[i][j][1] == 1){
		      this.aroundPointers[i][j] = [0, 1, 1, 0];
		    }
		    if(this.patternData[i][j][0] == 5 && this.patternData[i][j][1] == 2){
		      this.aroundPointers[i][j] = [0, 0, 1, 1];
		    }
		    if(this.patternData[i][j][0] == 5 && this.patternData[i][j][1] == 3){
		      this.aroundPointers[i][j] = [1, 0, 0, 1];
		    }
  		}
		}
	}

	this.getAroundPointersOfOncePoint = function(y, x){
		if(y > 0 && y < this.height-1 && x > 0 && x < this.width-1){
	    return [this.aroundPointers[y-1][x][2], this.aroundPointers[y][x+1][3], this.aroundPointers[y+1][x][0], this.aroundPointers[y][x-1][1]];
	  }else if(y == 0 && x > 0 && x < this.width-1){
	    return [0, this.aroundPointers[y][x+1][3], this.aroundPointers[y+1][x][0], this.aroundPointers[y][x-1][1]];
	  }else if(y == 0 && x == 0){
	    return [0, this.aroundPointers[y][x+1][3], this.aroundPointers[y+1][x][0], 0];
	  }else if(y == 0 && x == this.width-1){
	    return [0, 0, this.aroundPointers[y+1][x][0], this.aroundPointers[y][x-1][1]];
	  }else if(x == this.width-1 && y > 0 && y < this.height-1){
	    return [this.aroundPointers[y-1][x][2], 0, this.aroundPointers[y+1][x][0], this.aroundPointers[y][x-1][1]];
	  }else if(x == this.width-1 && y == 0){
	    return [0, 0, this.aroundPointers[y+1][x][0], this.aroundPointers[y][x-1][1]];
	  }else if(x == this.width-1 && y == this.height-1){
	    return [this.aroundPointers[y-1][x][2], 0, 0, this.aroundPointers[y][x-1][1]];
	  }else if(x == this.width-1 && y == 0){
	    return [0, 0, this.aroundPointers[y+1][x][0], this.aroundPointers[y][x-1][1]];
	  }else if(y == this.height-1 && x > 0 && x < this.width-1){
	    return [this.aroundPointers[y-1][x][2], this.aroundPointers[y][x+1][3], 0, this.aroundPointers[y][x-1][1]];
	  }else if(y == this.height-1 && x == 0){
	    return [this.aroundPointers[y-1][x][2], this.aroundPointers[y][x+1][3], 0, 0];
	  }else if(y == this.height-1 && x == this.width-1){
	    return [this.aroundPointers[y-1][x][2], 0, 0, this.aroundPointers[y][x-1][1]];
	  }else if(x == 0 && y > 0 && y < this.height-1){
	    return [this.aroundPointers[y-1][x][2], this.aroundPointers[y][x+1][3], this.aroundPointers[y+1][x][0], 0];
	  }else if(x == 0 && y == 0){
	    return [0, this.aroundPointers[y][x+1][3], this.aroundPointers[y+1][x][0], 0];
	  }else if(x == 0 && y == this.height-1){
	    return [this.aroundPointers[y-1][x][2], this.aroundPointers[y][x+1][3], 0, 0];
	  }
	}
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}