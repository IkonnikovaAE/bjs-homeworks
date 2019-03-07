function initCheckBirthday() {
    const birthday = document.getElementById('birthday').value;

    const result = checkBirthday(birthday) ? "Да" : "Нет";

    document.getElementById('disclaimer').innerHTML = result;   
}

function checkBirthday(birthday) {
    // код для задачи №1 писать здесь
    birthday = new Date(birthday);
    let date = new Date();
    let diff = date.getTime() - birthday.getTime();
    let age = diff / (3,154e+10 + 2,16e+7);
    if (age >= 18) {
    	return "да"
    }

}

function initPrintAnimalSound() {
    const animal = {
        sound: 'grrrr',
    };

    const result = getAnimalSound(animal);

    document.getElementById('sound').innerHTML = result;   
}

function getAnimalSound(animal) {
    // код для задачи №2 писать здесь
    let sound = animal.sound;
    if (animal = undefined) {
    	return null;
    } else {
    	return sound;
    }
}

function initCalculateStatement() {
    for (let idx = 0; idx < 3; idx++) {
        const marks = document.getElementById('learner-' + idx).value.split(',');

        const average = getAverageMark(marks);

        document.getElementById('learner-' + idx + '-average').innerHTML = average;
    }
}

function getAverageMark(marks) {
    // код для задачи №3 писать здесь
    let average = 0;
    for (let i=0; i < marks.length; i++) {
    	average = average + parseInt(marks[i]);
    }
    average = average / marks.length;
    let roundedAverage = Math.round(average);
    return roundedAverage;
}