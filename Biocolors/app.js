function $(selector) {
	return document.querySelectorAll(selector);
}

function log(m) {
	console.log(m);
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

var hexAlphabet = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

init();

function init() {
	// document.body.style.backgroundColor = $('input[type=color]')[0].value;
	var field = document.createElement('table');
	document.body.appendChild(field);

	for(var i = 0; i < 8; i++) {
		var tr = document.createElement('tr');
		for(var j = 0; j < 20; j++) {
			var td = document.createElement('td');
			tr.appendChild(td);
		}
		field.appendChild(tr);
	}

	$('input[type=color]')[0].onchange = function() {
		document.body.style.backgroundColor = this.value;
	};

	$('button')[0].onclick = function() {
		var color = $('input[type=color]')[0].value.slice(1);
		bioColors = new GeneticAlgorithm(color);
		bioColors.init();

		step();
	}
}
var a = 0;
function step() {
	document.getElementById('info').innerHTML = "#" + a++;
	bioColors.step();

	var field = $('table')[0];
	var trs = field.children;
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 20; j++) {
			var td = trs[i].children[j];
			td.style.backgroundColor = '#' + bioColors.population[i*20+j].person;
		}
	}

	bioColors.generateNewPopulation();
	requestAnimationFrame(step);
	// setTimeout(function() {
	// 	step();
	// }, 500);
}

function GeneticAlgorithm(color) {
	this.color = color;

	this.init = function() {
		this.population = this.generatePopulation();
	}

	this.generatePopulation = function() {
		var population = [];

		for(var i = 0; i < 160; i++) {
			population.push({
				person: this.generateRandomColor(), 
				fitness: 0
			});
		}

		return population;
	}

	this.generateRandomColor = function() {
		var color = [], char;

		for(var i = 0; i < 6; i++) {
			color.push(hexAlphabet[random(0, 17)]);
		}

		return color.join('');
	}

	this.calculateFitness = function(person) {
		var goalColor = this.color.split('');
		var goalRGB = {
			r: parseInt(goalColor[0]+goalColor[1], 16),
			g: parseInt(goalColor[2]+goalColor[3], 16),
			b: parseInt(goalColor[4]+goalColor[5], 16),
		}

		var personColor = person.split('');
		var personRGB = {
			r: parseInt(personColor[0]+personColor[1], 16),
			g: parseInt(personColor[2]+personColor[3], 16),
			b: parseInt(personColor[4]+personColor[5], 16),
		}
		


		return Math.abs(goalRGB.r-personRGB.r) + Math.abs(goalRGB.g-personRGB.g) + Math.abs(goalRGB.b-personRGB.b);
	}

	this.step = function() {
		for(var i = 0; i < 160; i++) {
			this.population[i].fitness = this.calculateFitness(this.population[i].person);
		}
	}

	this.generateNewPopulation = function() {
		var bestPersons = this.selection(this.population);
		var newPopulation = [];

		for(var i = 0; i < 160; i++) {
			newPopulation.push({
				person: this.crossing(bestPersons[random(0, 64)].person, bestPersons[random(0, 64)].person), 
				fitness: 0
			});
		}

		// for(var i = 0; i < 64; i++) {
		// 	newPopulation.push({
		// 		person: this.inverse(bestPersons[i].person),
		// 		fitness: 0
		// 	});
		// }

		for(var i = 0; i < 8; i++) {
			var index = random(0, 160);
			newPopulation[index].person = this.mutation(newPopulation[index].person);
		}

		this.population = newPopulation;
	}

	this.mutation = function(person) {
		person = person.split('');
		person[random(0, person.length-1)] = hexAlphabet[random(0, 16)];

		return person.join('');
	}

	this.selection = function(population) {
		population.sort(function(a, b) {
			return a.fitness - b.fitness;
		});

		return population.slice(0, 64);
	}

	this.crossing = function(p1, p2) {
		var crossingPoint = random(1, p1.length-1);
		p1 = p1.split('');
		p2 = p2.split('');

		p1.splice(crossingPoint);
		
		return p1.concat(p2.slice(crossingPoint)).join('');
	}

	this.inverse = function(person) {
		var inversePoint = random(1, person.length-1);
		person = person.split('');

		return person.concat(person.splice(0, inversePoint)).join('');
	}
}