function Rabbit(sex, partner = null) {
	this.age = 0;
	this.sex = sex;
	this.partner = partner;
}

Rabbit.prototype.makeOffspring = function() {
	if(this.partner) {
		let numChild = random(0, 7);
		let offspring = [];
		for(let i = 0; i < numChild; i++) {
			let child = new Rabbit(random(0, 2));
			offspring.push(child);
		}

		return offspring;
	}
}

function Rabbits() {
	this.size = 0;
	this.population = [];
}

Rabbits.prototype.createRabbit = function(sex) {
	let rabbit = new Rabbit(sex);
	this.population.push(rabbit);
}

Rabbits.prototype.makeOffspring = function() {
	this.population.map(rabbit => {
		rabbit.makeOffspring();
	});

	
}