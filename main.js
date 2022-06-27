//Classes....
class Operation {
	constructor(num1, num2, operator, result) {
		this.num1 = num1;
		this.num2 = num2;
		this.operator = operator;
		this.result = result;
	}
	toHTML(parent) {
		let element = document.createElement("p");
		element.innerHTML =
			this.num1 +
			" " +
			this.operator +
			" " +
			this.num2 +
			" = " +
			this.result;
		parent.appendChild(element);
	}
}

//Main....
const results = [];
newOperation();

//Functions....
function newOperation() {
	let number1 = prompt("Ingresa un numero:");
	number1 = Number(number1);
	number1 = validateNumber(number1);

	let number2 = prompt("Ingresa un segundo numero:");
	number2 = Number(number2);
	number2 = validateNumber(number2);

	let operator = prompt(
		"Ingresa que operacion quiere realizar: \n1) Suma \n2) Resta \n3) Multiplicacion \n4) Division \n5) Potencia (se tomara el segundo numero como indice)"
	);
	operator = Number(operator);

	const answer = calculate(number1, number2, operator);
	alert("El resultado es: " + answer);
	operator = operatorCharacter(operator);
	results.push(new Operation(number1, number2, operator, answer));

	if (window.confirm("Desea realizar otra operacion?")) {
		newOperation();
	} else {
		let parent = document.getElementById("history");
		results.forEach((operation) => {
			operation.toHTML(parent);
		});
	}
}

function validateNumber(number) {
	while (isNaN(number)) {
		console.log(isNaN(number));
		alert("Numero no valido");
		number = prompt("Ingresa un numero valido:");
		number = Number(number);
	}
	return number;
}

function calculate(number1, number2, operator) {
	switch (operator) {
		case 1:
			return addition(number1, number2);

		case 2:
			return subtraction(number1, number2);

		case 3:
			return multiplication(number1, number2);

		case 4:
			return division(number1, number2);

		case 5:
			return power(number1, number2);

		default:
			alert("Operacion no valida");
			operator = prompt(
				"Ingresa que operacion quiere realizar: \n1 = suma \n2 = resta \n3 = multiplicacion \n4 = division \n5 = potencia (se tomara el segundo numero como indice)"
			);
			operator = Number(operator);
			return calculate(number1, number2, operator);
	}
}

function operatorCharacter(operator) {
	switch (operator) {
		case 1:
			return "+";
		case 2:
			return "-";
		case 3:
			return "*";
		case 4:
			return "/";
		case 5:
			return "^";
	}
}

//Operations....
function addition(number1, number2) {
	return number1 + number2;
}

function subtraction(number1, number2) {
	return number1 - number2;
}

function multiplication(number1, number2) {
	return number1 * number2;
}

function division(number1, number2) {
	if (number2 != 0) {
		return number1 / number2;
	} else {
		return "Infinito";
	}
}

function power(number, exponent) {
	let result = 1;
	for (i = 0; i < exponent; i++) {
		result = result * number;
	}
	return result;
}
