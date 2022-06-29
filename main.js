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
const results = [];
let operation = new Operation()
const mainDisplay = document.getElementById("mainDisplay")
const subDisplay = document.getElementById("subDisplay")
const history = document.getElementById("history")


//Events....
for (let index = 0; index < 10; index++) {
	document.getElementById("num" + index).onclick = () => {addNumerToDisplay(String(index))}
}

document.getElementById("changeSign").onclick = () => {
	let content = mainDisplay.innerHTML
	if (content[0] != "-") {
		mainDisplay.innerHTML = "-" + content
	} else {
		mainDisplay.innerHTML = content.substring(1)
	}
}

document.getElementById("comma").onclick = () => {
	let content = mainDisplay.innerHTML
	if (!content.includes(".")) {
		mainDisplay.innerHTML = content + "."
	}
}

document.getElementById("clear").onclick = () => {mainDisplay.innerHTML = ""}

document.getElementById("plus").onclick = () => {operatorClick("+")}
document.getElementById("substract").onclick = () => {operatorClick("-")}
document.getElementById("multiply").onclick = () => {operatorClick("*")}
document.getElementById("divide").onclick = () => {operatorClick("/")}
document.getElementById("power").onclick = () => {operatorClick("^")}

document.getElementById("clearAll").onclick = () => {clearAll()}

document.getElementById("equal").onclick = () => {equal()}


//Functions....

function addNumerToDisplay (number) {
	if(subDisplay.innerHTML.includes("=")){
		subDisplay.innerHTML = ""
		mainDisplay.innerHTML = ""
	}
	let content = mainDisplay.innerHTML
	content = content + number
	mainDisplay.innerHTML = content
}

function operatorClick (operator) {
	subDisplay.innerHTML = mainDisplay.innerHTML + " " + operator + " "
	operation.num1 = Number(mainDisplay.innerHTML)
	operation.operator = operator
	mainDisplay.innerHTML = ""
}

function clearAll () {
	subDisplay.innerHTML = ""
	operation.num1 = " "
	operation.operator = " "
	mainDisplay.innerHTML = ""
}

function equal() {
	let equation = subDisplay.innerHTML + mainDisplay.innerHTML
	operation.num2 = Number(mainDisplay.innerHTML)
	subDisplay.innerHTML = equation + "="
	const result = eval(equation)
	operation.result = result
	mainDisplay.innerHTML = result

	results.push(operation)
	operation.toHTML(history)
	operation = new Operation()
}