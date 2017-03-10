// (function(){
var App = function(tmpD){
	this.tmp = {
		"wW" : tmpD.wW,
		"hW" : tmpD.hW,
		"speed" : tmpD.speed,
		"play" : 0,
		"meter" : 0,
		"lastTime" : 0,
		"firstPlay" : 1
	}
	this.graphEngine = new SimpleGE('canvas');
	this.scene = this.graphEngine.Scene.createScene();
	this.GUI = new GUI(this, {"play" : 'play', "prev" : 'prev', "next" : 'next'});
	this.server = new ServerClass(this);
	this.startPatts = this.server.getStartPatts();
	this.functions = new Functions(this);
	this.stats = this.functions.createStats();
	this.automatons = [];
	this.colors = ['#96A63E', '#D22344', '#005D61', '#34854F'];

	this.update = function(dt){
		var a = 1/this.tmp.speed;
		if(this.tmp.meter >= a){
			for(var i = 0; i < this.automatons.length; i++){
				var Automaton = this.automatons[i].automaton;
				var generation = this.automatons[i].generation;
				
				var isEnd = Automaton.step();
				Automaton.renderGeneration();

				if(!isEnd && !this.automatons[i].end){
					console.log("End: " + generation);
					this.automatons[i].end = 1;
				}

				if(!this.automatons[i].end){
					this.automatons[i].generation++;
					this.automatons[i].generationEl.innerHTML = '#' + this.automatons[i].id + ': ' + this.automatons[i].generation;
				}

				this.tmp.meter = 0;
			}
		}
	}

	this.Animate = function(){
		this.stats.begin();

		var now = Date.now();
		
		var dt = (now - this.tmp.lastTime) / 1000.0;

		this.tmp.meter += dt;

		if(this.tmp.firstPlay){
			for(var i = 0; i < this.automatons.length; i++){
				var Automaton = this.automatons[i].automaton;
				var generation = this.automatons[i].generation;
				
				Automaton.renderGeneration();

				this.automatons[i].generationEl.innerHTML = '#' + this.automatons[i].id + ': ' + this.automatons[i].generation;
			}
			this.graphEngine.renderCanvas();
			this.tmp.firstPlay = 0;

			var play = document.getElementById("play");
			if(this.tmp.play){
				play.innerHTML = 'pause';
			}else{
				play.innerHTML = 'play';
			}
		}
		if(this.tmp.play){
			this.update(dt);
			this.graphEngine.renderCanvas();
		}

		this.tmp.lastTime = now;
		this.stats.end();
		requestAnimationFrame(this.Animate.bind(this));
	}
	requestAnimationFrame(this.Animate.bind(this));

	this.createAutomaton = function(data){
		var automaton = new Automaton(data.width, data.height, data.arr, data.wB, data.hB, data.x, data.y, this);

		var idColor = this.getRandomRange(0, this.colors.length-1);
		var color = this.colors[idColor];
		this.colors.splice(idColor, 1);
		
		var border = this.createBorder(data.x, data.y, data.wB, data.hB, data.width, data.height, color);
		var inf = this.createInfAutomaton(data);

		var automaton = {
			"id" : this.automatons.length,
			"automaton" : automaton,
			"end" : 0,
			"generation" : 0,
			"generationEl" : inf,
			"border" : border,
			"color" : color
		}

		this.automatons.push(automaton);

		var select = document.createElement('option');
		select.value = "#" + automaton.id;
		select.innerHTML = select.value;
		document.getElementById("selectAut").appendChild(select);
	}

	this.createInfAutomaton = function(data){
		var infEl = document.createElement('div');
		document.body.appendChild(infEl);
		infEl.className = 'infEls';
		infEl.style.top = data.y+data.hB*data.height+5 + 'px';
		infEl.style.left = data.x + 'px';
		// infEl.style.left = data.x+data.wB*data.width/2-20 + 'px';

		infEl.innerHTML = '#' + this.automatons.length + ': 0';
		return infEl;
	}

	this.createBorder = function(x, y, wB, hB, width, height, color){
		var border = this.scene.createObj('rect', {
			"x" : x+wB*width/2,
			"y" : y+hB*height/2,
			"w" : wB*width,
			"h" : hB*width,
			"l" : 2
		});

		border.styles = {'borderColor' : color, 'borderWidth' : wB}
		return border;
	}

	this.nextGeneration = function(){
		for(var i = 0; i < this.automatons.length; i++){
			var aut = this.automatons[i];
			var Automaton = this.automatons[i].automaton;
			var generation = this.automatons[i].generation;
			
			var isEnd = Automaton.step();
			Automaton.renderGeneration();

			this.graphEngine.renderCanvas();

			if(!isEnd && !this.automatons[i].end){
				console.log("End: " + generation);
				this.automatons[i].end = 1;
			}

			if(!this.automatons[i].end){
				this.automatons[i].generation++;
				this.automatons[i].generationEl.innerHTML = '#' + this.automatons[i].id + ': ' + this.automatons[i].generation;
			}
		}
	}

	this.prevGeneration = function(){
		for(var i = 0; i < this.automatons.length; i++){
			var aut = this.automatons[i];
			if(aut.end == 1){
				aut.end = 0;
			}
			if(aut.generation > 0){
				aut.automaton.prevGeneration();
				aut.automaton.renderGeneration();
				this.graphEngine.renderCanvas();
				aut.generation--;
				aut.generationEl.innerHTML = '#' + this.automatons[i].id + ': ' + this.automatons[i].generation;
			}
		}
	}

	this.getRandomRange = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

// })();