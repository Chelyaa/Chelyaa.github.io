function $(selector) {
	return document.querySelectorAll(selector);
}

function log(m) {
	console.log(m);
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

$('#start-btn')[0].addEventListener('click', function() {
	var str = $('#string')[0].value;

	bioWords = new GeneticAlgorithm(str);

	evolution(bioWords);
});

function evolution(bioWords) {
	bioWords.init();

	$('.show')[0].classList.remove('invis');
	$('#goal')[0].innerHTML = bioWords.str;

	var table = document.createElement('table');
	$('.table')[0].appendChild(table);

	$('#step')[0].addEventListener('click', function() {
		step();
	});

	step();
}

function step() {
	bioWords.step();
	var tr = document.createElement('tr');

	for(var i = 0; i < bioWords.population.length; i++) {
		var td = document.createElement('td');
		var pers = bioWords.population[i];

		td.innerHTML = pers.person + "</br>fitness: " + pers.fitness;
		tr.appendChild(td);
	}

	table.appendChild(tr);
	$('.table')[0].scrollTop = $('.table')[0].scrollHeight;

	bioWords.generateNewPopulation();
	requestAnimationFrame(step);
}

function GeneticAlgorithm(str) {
	var self = this;
	this.str = str;

	this.init = function() {
		this.population = this.generatePopulation();
	}

	this.generatePopulation = function() {
		var population = [];

		for(var i = 0; i < 10; i++) {
			population.push({
				person: this.generateRandomString(this.str.length), 
				fitness: 0
			});
		}

		return population;
	}

	this.generateRandomString = function(n) {
		var str = [], char;

		for(var i = 0; i < n; i++) {
			char = String.fromCharCode(random(97, 123));
			char =  random(0, 2) < 1 ? char.toUpperCase() : char;
			str.push(char);
		}

		return str.join('');
	}

	this.calculateFitness = function(person) {
		var charCodesStr = this.str.split('').map(function(ch) {
			return ch.charCodeAt(0);
		});
		var charCodesPerson = person.split('').map(function(ch) {
			return ch.charCodeAt(0);
		});

		var preFitness = 0;
		for(var i = 0; i < charCodesStr.length; i++) {
			if(charCodesPerson[i] == charCodesStr[i])
				preFitness++;
		}

		return preFitness / this.str.length;
	}

	this.step = function() {
		for(var i = 0; i < 10; i++) {
			this.population[i].fitness = this.calculateFitness(this.population[i].person);
		}
	}

	this.generateNewPopulation = function() {
		var bestPersons = this.selection(this.population);
		var newPopulation = [];

		for(var i = 0; i < 6; i++) {
			newPopulation.push({
				person: this.crossing(bestPersons[random(0, 3)].person, bestPersons[random(0, 3)].person), 
				fitness: 0
			});
		}

		for(var i = 0; i < 4; i++) {
			newPopulation.push({
				person: this.inverse(bestPersons[i].person),
				fitness: 0
			});
		}

		newPopulation[0].person = this.mutation(newPopulation[5].person);
		newPopulation[1].person = this.mutation(newPopulation[0].person);

		this.population = newPopulation;
	}

	this.mutation = function(person) {
		person = person.split('');
		person[random(0, person.length-1)] = random(0, 2) < 1 ? String.fromCharCode(random(97, 123)).toUpperCase() : String.fromCharCode(random(97, 123)).toLowerCase();

		return person.join('');
	}

	this.selection = function(population) {
		population.sort(function(a, b) {
			return b.fitness - a.fitness;
		});

		return population.slice(0, 4);
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