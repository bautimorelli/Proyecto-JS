//Classes....
class Operation {
	constructor(num1 = " ", num2 = " ", operator = " ", result) {
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
const historyStorage = localStorage.getItem("history");
const history = JSON.parse(historyStorage) ?? [];
let operation = new Operation();
const mainDisplay = document.getElementById("mainDisplay");
const subDisplay = document.getElementById("subDisplay");
const historyContainer = document.getElementById("historyContainer");
const historyContent = document.getElementById("historyContent");
const historyIcon = document.getElementById("iconHistory");

history.forEach((operation) => {
	operationToHTML(operation, historyContent);
});

//Events....
for (let index = 0; index < 10; index++) {
	document.getElementById("num" + index).onclick = () => {
		addNumerToDisplay(String(index));
	};
}

document.getElementById("changeSign").onclick = () => {
	let content = mainDisplay.innerHTML;
	if (content[0] != "-") {
		mainDisplay.innerHTML = "-" + content;
	} else {
		mainDisplay.innerHTML = content.substring(1);
	}
};

document.getElementById("comma").onclick = () => {
	let content = mainDisplay.innerHTML;
	if (!content.includes(".")) {
		mainDisplay.innerHTML = content + ".";
	}
};

document.getElementById("clear").onclick = () => {
	mainDisplay.innerHTML = "0";
};

document.getElementById("plus").onclick = () => {
	operatorClick("+");
};
document.getElementById("substract").onclick = () => {
	operatorClick("-");
};
document.getElementById("multiply").onclick = () => {
	operatorClick("*");
};
document.getElementById("divide").onclick = () => {
	operatorClick("/");
};
document.getElementById("power").onclick = () => {
	operatorClick("^");
};

document.getElementById("clearAll").onclick = () => {
	clearAll();
};

document.getElementById("equal").onclick = () => {
	equal();
};

historyIcon.onclick = () => {
	collapsableHistory();
};

//Functions....

function addNumerToDisplay(number) {
	if (subDisplay.innerHTML.includes("=")) {
		subDisplay.innerHTML = "";
		mainDisplay.innerHTML = "";
	}
	if (mainDisplay.innerHTML == "0") {
		mainDisplay.innerHTML = "";
	}
	let content = mainDisplay.innerHTML;
	content = content + number;
	mainDisplay.innerHTML = content;
}

function operatorClick(operator) {
	subDisplay.innerHTML = mainDisplay.innerHTML + " " + operator + " ";
	operation.num1 = Number(mainDisplay.innerHTML);
	operation.operator = operator;
	mainDisplay.innerHTML = "0";
}

function clearAll() {
	subDisplay.innerHTML = "";
	operation.num1 = " ";
	operation.operator = " ";
	mainDisplay.innerHTML = "0";
}

function equal() {
	if (subDisplay.innerHTML.includes("=")) {
		subDisplay.innerHTML = "";
	}
	let equation = subDisplay.innerHTML + mainDisplay.innerHTML;
	operation.num2 = Number(mainDisplay.innerHTML);
	subDisplay.innerHTML = equation + " =";
	const result = eval(equation);
	operation.result = result;
	mainDisplay.innerHTML = result;

	history.push(operation);
	if (history.length >= 15) {
		history.shift();
		historyContent.removeChild(historyContent.firstChild);
	}
	const historyJSON = JSON.stringify(history);
	localStorage.setItem("history", historyJSON);
	operation.toHTML(historyContent);
	operation = new Operation();

	Swal.fire({
		title: 'Felicidades',
		text: 'Has hecho una operacion!',
		icon: 'success',
		confirmButtonText: 'Gracias Gracias'

	})
}

function collapsableHistory() {
	if (historyContainer.style.maxWidth) {
		historyContainer.style.maxWidth = null;
		historyContainer.style.maxHeight = null;
	} else {
		historyContainer.style.maxWidth = "90vw";
		historyContainer.style.maxHeight = "90vh";
	}
}

function operationToHTML(operation, parent) {
	let element = document.createElement("p");
	element.innerHTML =
		operation.num1 +
		" " +
		operation.operator +
		" " +
		operation.num2 +
		" = " +
		operation.result;
	parent.appendChild(element);
}
