var ServerClass = function(mainClass){
	this.mainClass = mainClass;

	this.getStartPatts = function(){
		var startPatt1  = [[0, 1, 0],
									 		 [0, 0, 1],
									 		 [1, 1, 1]];

		var startPatt2 = [[0, 1, 1],
											[1, 1, 0],
											[0, 1, 0]];

		var startPatt3 = [[0, 1, 0, 0, 0, 0, 0],
											[0, 0, 0, 1, 0, 0, 0],
											[1, 1, 0, 0, 1, 1, 1]];

		var startPatt4 = [[0, 1, 0],
											[1, 1, 1],
											[0, 1, 0],
											[0, 1, 0]];

		var startPatt5 = [[1, 0, 1],
											[1, 1, 1],
											[1, 0, 1]];

		var startPatts = [startPatt1, startPatt2, startPatt3, startPatt4, startPatt5];

		return startPatts;
	}
}