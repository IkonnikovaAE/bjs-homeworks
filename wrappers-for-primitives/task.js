function calculateMortgage() {
    let percent = window.percent.value;
    let contribution = window.contribution.value;
    let amount = window.amount.value;
    let date = window.date.value;

    let result = calculateTotalMortgage(percent, contribution, amount, date);
    let span = window.mortageResult;
    span.textContent = result;
}

function calculateTotalMortgage(percent, contribution, amount, date) {

    // код для задачи №1 писать здесь
    "use strict";
    let totalAmount;
    let errorMark = true;
    if (typeof percent != "number") {
    	if (typeof percent == "string") {
    		percent = parseInt(percent);
    	}
    	else {
    		totalAmount = `“Параметр percent содержит неправильное значение ${percent}”`;
    		console.log (totalAmount);
    		return totalAmount;
    		errorMark = false;
    	}
    }

    if (typeof contribution != "number") {
    	if (typeof contribution == "string") {
    		contribution = parseInt(contribution);
    	}
    	else {
    		totalAmount = `“Параметр contribution содержит неправильное значение ${contribution}”`;
    		console.log (totalAmount);
    		return totalAmount;
    		errorMark = false;
    	}
    }

    if (typeof amount != "number") {
    	if (typeof amount == "string") {
    		amount = parseInt(amount);
    	}
    	else {
    		totalAmount = `“Параметр amount содержит неправильное значение ${amount}”`;
    		console.log (totalAmount);
    		return totalAmount;
    		errorMark = false;
    	}
    }

    if (typeof date != "object") {
    	if (typeof date == "string") {
    		date = new Date(date);
    	}
    	else {
    		totalAmount = `“Параметр date содержит неправильное значение ${date}”`;
    		console.log (totalAmount);
    		return totalAmount;
    		errorMark = false;
    	}
    }
 	
 	if (errorMark) {
 		let startData =  new Date();
 		let monthAmount = date.getYear() * 12 + date.getMonth() - startData.getYear() * 12 - startData.getMonth();
 		let debt = amount - contribution;
		let monthly = amount * ((percent/100 / 12) + (percent/100 / 12) / (((1 + (percent/100 / 12)) ^ monthAmount) - 1));
    	totalAmount = monthly * monthAmount + debt;
    	console.log(totalAmount);
    	return totalAmount;
	}
}

function sayHello() {
    let name = window.personName.value;
    let greeting = getGreeting(name);
    let span = window.helloResult;
    span.textContent = greeting;
}

function getGreeting(name) {
    // код для задачи №2 писать здесь
    if (name === undefined || name === null || name === "") {
    name = 'Аноним';
    }
    greeting = (`“Привет, мир! Меня зовут ${name}”`);
    console.log(greeting);
    return greeting;
}