class StudentLog {
  constructor(getName) {
  	this.getName = getName;
	this.list = {};
  };
  

  addGrade(grade, subject) {
    if (this.list[subject] == undefined) {
      this.list[subject] = [];
    }

    if ( grade >= 1 && grade<=5) {
      return this.list[subject].push(grade);
    } else {
      console.log (`Вы попытались поставить оценку ${grade} по предмету ${subject}. Допустимый предел: 0-5`);
    };
      return this.list[subject].length; // Метод возвращает количество поставленных оценок по данному предмету
  };

  getAverageBySubject( subject ) {
    if (typeof (this.list[subject]) != "object") {
      return 0;
    } else {
      let average = 0;
      let disciplineLenght = 0;
      for (let grade in this.list[subject]) {
 	    disciplineLenght++;
	    average = average + this.list[subject][grade]
       }
       if (disciplineLenght == 0) {
         return 0
       } else {
         return average/disciplineLenght;
       }
     }
  };

  getTotalAverage() {
    let data = {};
    let average = 0;
    let quantity = 0;
    for (let discipline in this.list) {
      average = average + this.getAverageBySubject(discipline);
        quantity++;
    }
    if (quantity == 0) {
      return 0;
    } else {
      return average/quantity;
    }
  };
  
  getGradesBySubject( subject ) {
    return this.list[subject];
  }

  getGrades() {
    return this.list;
  };
};


let log = new StudentLog('Олег Никифоров');

console.log(log.getName);

console.log(log.addGrade(2, 'math'));
console.log(log.addGrade(4, 'math'));
console.log(log.addGrade('Отлично!', 'math'));
console.log(log.addGrade(5, 'alg'));
console.log(log.addGrade(4, 'alg'));
console.log(log.addGrade(25, 'geom'));


console.log(log.getAverageBySubject('math'));
console.log(log.getAverageBySubject('alg'));

console.log(log.getTotalAverage());

console.log(log.getGradesBySubject('math'));
console.log(log.getGradesBySubject('alg'));
console.log(log.getGradesBySubject('geom'));

console.log(log.getGrades());


console.log ("\n\n разделитель задач \n\n")


//Задача 2
class Weapon {
	constructor(){
		this.name = 'Рука',
		this.attack= 1,
		this.durability= Infinity,
		this.range= 1
	}

	takeDamage( damage ) {
		this.durability = this.durability - damage;
		if (this.durability < 0) {
			this.durability = 0;
		}
	}
	
	getDamage() {
		if (this.durability >= this.maxDurability * 0.3) {
			return this.attack;
		} else {
			if (this.durability == 0) {
				return 0;
			} else {
				return this.attack / 2;
			}
		}
	}

	isBroken() {
		return (this.durability > 0);
	}
};

class Arm extends Weapon{
	constructor(){
		super();
		this.name = 'Рука',
		this.attack= 1,
		this.durability= Infinity,
		this.range= 1,
		this.maxDurability = this.durability;
	}
};

class Bow extends Weapon{
	constructor(){
		super();
		this.name = 'Лук',
		this.attack= 10,
		this.durability= 200,
		this.range= 3,
		this.maxDurability = this.durability;
	}
};

class Sword extends Weapon{
	constructor(){
		super();
		this.name = 'Меч',
		this.attack= 25,
		this.durability= 500,
		this.range= 1,
		this.maxDurability = this.durability;
	}
};


class Knife extends Weapon{
	constructor(){
		super();
		this.name = 'Нож',
		this.attack= 5,
		this.durability= 300,
		this.range= 1,
		this.maxDurability = this.durability;
	}
};

class Staff extends Weapon{
	constructor(){
		super();
		this.name = 'Посох',
		this.attack = 8,
		this.durability = 300,
		this.range = 2,
		this.maxDurability = this.durability;
	}
};

class LongBow extends Bow{
	constructor(){
		super();
		this.name = 'Длинный Лук',
		this.attack = 15,
		this.range = 4
	}
};

class Axe extends Sword{
	constructor(){
		super();
		this.name = 'Секира',
		this.attack = 27,
		this.durability = 800,
		this.maxDurability = this.durability;
	}
};

class StormStaff extends Staff{
	constructor(){
		super();
		this.name = 'Посох Бури',
		this.attack = 10,
		this.range = 3
	}
};


class Player {
	constructor({name, position}){
		this.life = 100;
		this.magic = 20;
		this.speed = 1;
		this.attack = 10;
		this.agility = 5;
		this.luck = 10;
		this.description = 'Игрок';
		this.weapon = new Arm;
		this.name = name;
		this.position = position;
	}



	getLuck(){
		let randomNumber = Math.random()*100;
		return (randomNumber + this.luck)/100;
	}

	getDamage(distance){
		if (distance <= this.weapon.range) {
			return (this.attack + this.weapon.getDamage())*this.getLuck() / distance;
		} else {
			return 0;
		}
	}

	takeDamage( damage ) {
		if (damage > this.life) {
			this.life = 0
		} else {
			this.life = this.life - damage
		}
	}

	isDead() {
		return (this.life == 0);		
	}


	moveLeft( distance ) {
		if (distance > this.speed) {
			distance = this.speed;
		}

		this.position = this.position - distance;
	}
	moveRight( distance ) {
		if (distance > this.speed) {
			distance = this.speed;
		}

		this.position = this.position + distance;
	}

	move (distance) {
		if (distance < 0) {
			this.moveLeft(distance*(-1)) 
			/*
			из задания дано, что distance может быть меньше 0. "Если distance меньше нуля, вызывается moveLeft( distance ), иначе и moveRight( distance )."
			
			Ввиду отрицательного значения параметра distance выполнение строки "this.position = this.position - distance" из метода moveLeft	
			приведёт к фактическому изменению позиции вправо.

			Можно было или взять модуль или умножить отрицательное значение на -1
			*/
		} else {
			this.moveRight(distance)
		}
	}

	isAttackBlocked(){
		return (this.getLuck() > (100 - this.luck)/100)
	}

	dodged(){
		return (this.getLuck() > (100 - this.agility - this.speed*3)/100)
	}

	takeAttack (damage) {
		if (this.isAttackBlocked()) {
			this.weapon.takeDamage(damage);
			return ('--->атака блокирована');
		} else {
			if (!(this.dodged())) {
				this.takeDamage(damage);
				return (`--->нанесённый урон: ${damage}`);
			} else {
				return (`--->противник уклонился`);
			}
		}

	}

	checkWeapon () {
		if (this.weapon.isBroken()) {
			if (this.weapon.name == 'Нож') {
				this.weapon = new Arm();
			} else {
				this.weapon = new Knife();
			}
		}
	}

	tryAttack (enemy) {

		let distanceDifference = Math.abs(this.position - enemy.position);
		let damageForMessage;
		if (distanceDifference <= this.weapon.range) {
			this.weapon.takeDamage(10*this.getLuck());
			if (distanceDifference == 0) {
				enemy.moveRight(1);
				damageForMessage = enemy.takeAttack(this.getDamage(1)*2);	
			} else {
				damageForMessage = enemy.takeAttack(this.getDamage(distanceDifference));
			}
			console.log(damageForMessage);
		}

	}

	chooseEnemy (players) {
		let playerId = 0;
		let minimumLife = players[0].life;

		if (players[0].name == this.name) {
			minimumLife = players[1].life;
			playerId = 1;
		}

		for (let i = 1; i < players.length; i++) {
			if (players[i].life < minimumLife && players[i].name != this.name && players[i].life !=0) {
				playerId = i;
				minimumLife = players[i].life;
			};
		};
		console.log(`Игрок ${this.name} выбрал целью игрока ${players[playerId].name} `);
		console.log(`Цель: ${players[playerId].name}, зд: ${players[playerId].life}, поз: ${players[playerId].position}`)
		return players[playerId];
	}

	moveToEnemy(enemy) {
		this.move(enemy.position - this.position);
	}

	turn (players) {
		let choosedEnemy = this.chooseEnemy(players);
		this.moveToEnemy(choosedEnemy);
		this.tryAttack(choosedEnemy);
		if (choosedEnemy.life === 0) {
			console.log(`Игрок ${this.name} убил игрока ${choosedEnemy.name} `);
		}
	return players.indexOf(choosedEnemy);
	}
};

class Warrior extends Player{
	constructor({name, position}){
		super({name, position});
		this.life = 120,
		this.speed = 2,
		this.attack = 10,
		this.description = 'Воин',
		this.weapon = new Sword(),
		this.maxLife = this.life;

	}

	takeDamage (damage) {
		if ( this.life < this.maxLife*0.5 && this.getLuck() > 0.8) {
			if (damage > this.magic) {
				damage = damage - this.magic;
				this.magic = 0;
			} else {
				this.magic = this.magic - damage;
				damage = 0;
			}
		}
		
		if (damage > this.life) {
			this.life = 0
		} else {
			this.life = this.life - damage
		}
	
	}

};

class Archer extends Player{
	constructor({name, position}){
		super({name, position});
		this.life = 80,
		this.magic = 35,
		this.attack = 5,
		this.agility = 10,
		this.description = 'Лучник',
		this.weapon = new Bow();
	}

	getDamage(distance) {
		return (this.attack + this.weapon.getDamage())*this.getLuck() * distance / this.weapon.range;
	}
};

class Mage extends Player{
	constructor({name, position}){
		super({name, position});
		this.life = 70,
		this.magic = 100,
		this.attack = 5,
		this.agility = 8;
		this.description = 'Маг',
		this.weapon = new Staff(),
		this.maxMagic = this.magic;
	}

	takeDamage (damage) {
		if ( this.magic > this.maxMagic*0.5 ) {
			this.magic = this.magic - 12;
			damage = damage / 2;
		} 

		if (damage > this.life) {
			this.life = 0
		} else {
			this.life = this.life - damage
		}
	}
};

class Dwarf extends Warrior{
	constructor({name, position}){
		super({name, position});
		this.life = 130,
		this.attack = 15,
		this.luck = 20,
		this.description = 'Гном',
		this.weapon = new Axe(),
		this.maxLife = this.life,
		this.hitCounter = 0;

	}

	takeDamage( damage ) {
		this.hitCounter++;	

		if (this.hitCounter == 6) {
			this.hitCounter = 0;
			if (this.getLuck() > 0.5) {
				damage = damage / 2;
			}
		}

		if (damage > this.life) {
			this.life = 0
		} else {
			this.life = this.life - damage
		}
	}
};

class Crossbowman extends Archer{
	constructor({name, position}){
		super({name, position});
		this.life = 85,
		this.attack = 8,
		this.agility = 20,
		this.luck = 15,
		this.description = 'Арбалетчик',
		this.weapon = new LongBow();
	}
};

class Demiurge extends Mage{
	constructor({name, position}){
		super({name, position});
		this.life = 80,
		this.magic = 120,
		this.attack = 6,
		this.luck = 12,
		this.description = 'Демиург',
		this.weapon = new StormStaff(),
		this.maxMagic = this.magic;
	}
	getDamage(distance){
		if (distance <= this.weapon.range) {
			if (this.magic > 0 && this.getLuck() > 0.6) {
				return 1.5 * (this.attack + this.weapon.getDamage())*this.getLuck() / distance;
			} else {
				return  (this.attack + this.weapon.getDamage())*this.getLuck() / distance;
			}
		} else {
			return 0;
		}
	}
};





function play (players) {

	let turnCount = 1;

	while (players.length != 1) {
		console.log(`\nХод ${turnCount}, активные игроки: ${players.length}`);


		for (let i = 0; i < players.length; i++) {
			if (players[i].life != 0) {
				console.log(`Ходит ${players[i].name}`)
				console.log(`${players[i].name}, зд: ${players[i].life}, поз: ${players[i].position}`)
				
				players[i].turn(players);
			}
		};

		for (let playerId in players) {
				if (players[playerId].isDead()) {
				players.splice(playerId, 1);
			}
		}

		if (players.length > 1) {
			turnCount++;
		}
	}

	console.log(`Игрок ${players[0].name} победил! Ура! Всего ходов: ${turnCount} `);

}
play ([
	new Warrior({ name: 'Первый', position: 20}),
	new Dwarf({ name: 'Второй', position: 15}),	
	new Archer({ name: 'Третий', position: 1}),
	new Demiurge({ name: 'Четвертый', position: 30}),
	new Crossbowman({ name: 'Пятый', position: -6}),
	new Warrior({ name: 'Шестой', position: 50}),	
	new Archer({ name: 'Седьмой', position: 10})
])
