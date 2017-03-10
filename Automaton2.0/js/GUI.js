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

