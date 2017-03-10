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
var GUI = function(mainClass, btns){
	this.btns = btns;
	this.play = document.getElementById(this.btns.play);
	this.prev = document.getElementById(this.btns.prev);
	this.next = document.getElementById(this.btns.next);
	this.flagPlay = mainClass.tmp.play;

	this.playClick = function(){console.log(this);
		mainClass.tmp.play = this.flagPlay == 1 ? 0 : 1;
		this.flagPlay = this.flagPlay == 1 ? 0 : 1;
		this.play.innerHTML = this.flagPlay == 1 ? 'pause' : 'play';
	}

	this.play.onclick = this.playClick.call(this);

	this.next.onclick = function(){
		mainClass.nextGeneration();
	}

	this.prev.onclick = function(){
		mainClass.prevGeneration();
	}
}


var SimpleGE=function(t){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.width=600,this.height=600,null!=t&&(this.canvas.style.position="absolute",this.canvas.style.top=0,this.canvas.style.left=0,this.canvas.width=this.width,this.canvas.height=this.height),this.Scene=new Scenes(this.ctx),this.render=new Render(this.ctx,this.Scene),this.renderCanvas=function(){this.render.render()}},ObjectClass=function(){this.id,this.type,this.props={},this.styles={}},Objects=function(t){this.counter=0,this.objects=[],this.ctx=t,this.createObj=function(t,e){var i=new ObjectClass;return i.type=t,i.id=this.counter,this.counter++,i.props=e,this.objects.push(i),i.props.layer=e.layer||0,i}},Render=function(t,e){this.ctx=t,this.scenes=e,this.render=function(){var t=this.scenes.nowScene;for(var e in t.layers)for(var i in t.layers[e]){var s=t.layers[e][i],r=s.type;switch(r){case"rect":this.renderRect(s.props,s.styles);break;case"circle":this.renderCircle(s.props,s.styles);break;case"ellipse":this.renderEllipse(s.props,s.styles);break;case"line":this.renderLine(s.props,s.styles);break;case"curveLine":this.renderCurveLine(s.props,s.styles)}}},this.renderRect=function(t,e){var i=t.x||0,s=t.y||0,r=t.width||t.w||0,h=t.height||t.h||0;i-=r/2,s-=h/2;var c=e.borderWidth||e.borderW||0,l=e.fillColor||e.fillC||-1,n=e.borderColor||e.borderC||"black",o=e.rotate*Math.PI/180||0,a=e.alpha||1;this.ctx.globalAlpha=a,this.ctx.save(),this.ctx.translate(i+r/2,s+h/2),this.ctx.rotate(o),c>0&&(this.ctx.lineWidth=c,this.ctx.strokeStyle=n,this.ctx.strokeRect(-(r+c)/2,-(h+c)/2,r+c,h+c)),l!=-1&&(this.ctx.fillStyle=l,this.ctx.fillRect(-r/2,-h/2,r,h)),this.ctx.restore()},this.renderCircle=function(t,e){var i=t.x||0,s=t.y||0,r=t.radius||0,h=e.borderWidth||e.borderW||0,c=e.fillColor||e.fillC||-1,l=e.borderColor||e.borderC||"black",n=e.alpha||1;this.ctx.globalAlpha=n,this.ctx.beginPath(),this.ctx.arc(i,s,r+h/2,0,2*Math.PI,!1),c!=-1&&(this.ctx.fillStyle=c,this.ctx.fill()),h>0&&(this.ctx.lineWidth=h,this.ctx.strokeStyle=l,this.ctx.stroke())},this.renderEllipse=function(t,e){var i=t.x||0,s=t.y||0,r=t.width||t.w,h=t.height||t.h,c=e.borderWidth||e.borderW||0,l=e.fillColor||e.fillC||-1,n=e.borderColor||e.borderC||"black",o=e.rotate*Math.PI/180,a=e.alpha||1;this.ctx.globalAlpha=a,this.ctx.beginPath(),this.ctx.ellipse(i,s,r+c/2,h+c/2,o,0,2*Math.PI),l!=-1&&(this.ctx.fillStyle=l,this.ctx.fill()),c>0&&(this.ctx.lineWidth=c,this.ctx.strokeStyle=n,this.ctx.stroke())},this.renderLine=function(t,e){var i=t.x||0,s=t.y||0,r=t.endX||0,h=t.endY||0,c=t.width||t.w,l=e.borderWidth||e.borderW||0,n=e.fillColor||e.fillC||-1,o=e.borderColor||e.borderC||"black",a=e.alpha||1;this.ctx.globalAlpha=a,n!=-1&&(this.ctx.beginPath(),this.ctx.moveTo(i-l,s-l),this.ctx.lineTo(r+l,h+l),this.ctx.strokeStyle=o,this.ctx.lineWidth=c+2*l,this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(i,s),this.ctx.lineTo(r,h),this.ctx.strokeStyle=n,this.ctx.lineWidth=c,this.ctx.stroke())},this.renderCurveLine=function(t,e){var i=t.points,s=t.width||t.w,r=t.layer||t.l||0,h=(e.borderWidth||e.borderW||0,e.fillColor||e.fillC||-1);e.borderColor||e.borderC||"black",e.alpha||1;if(h!=-1){var c=[];for(var l in i){var n=i[l].x,o=i[l].y;c.push(n),c.push(o)}for(var a=0;a<c.length-3;a+=2){var d=c[a],x=c[a+1],b=c[a+2],p=c[a+3];this.renderLine({x:d,y:x,endX:b,endY:p,w:s,l:r},e)}}}},Scene=function(t){this.id,this.ctx=t,this.objects=new Objects(this.ctx),this.layers={},this.createObj=function(t,e){var i=this.objects.createObj(t,e),s=i.props.layer||i.props.l||0,r=i.id;return this.layers[s]=this.layers[s]||{},this.layers[s][r]=i,i}},Scenes=function(t){this.ctx=t,this.counter=0,this.scenes=[],this.nowScene,this.createScene=function(){var t=new Scene(this.ctx);return t.id=this.counter,0==this.counter&&(this.nowScene=t),this.counter++,t}};
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
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);
