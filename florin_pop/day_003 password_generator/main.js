// Generating Random Integer
const randInt = (frequency = 1, start = 0) =>
	Math.floor(Math.random() * frequency + start);

// Shuffle the Array

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

const generator = {};

generator.numbers = () => randInt(10);

generator.lowercaseCharacters = () => String.fromCharCode(randInt(26, 97));

generator.uppercaseCharacters = () => String.fromCharCode(randInt(26, 65));

let symbols = ["!", "@", "$", "#", "*"];

generator.symbols = () => symbols[randInt(symbols.length)];

let result = document.getElementById("result");
let length = document.getElementById("length");

// checkboxes
let lower = document.querySelector("#lower");
let upper = document.querySelector("#upper");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");

// Generate Button
let generateBtn = document.getElementById("generate-btn");

// Copy Button
let copyBtn = document.getElementById("copy-btn");

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyToClipboard);

// Copy To ClipBoard
function copyToClipboard() {
	const el = document.createElement("textarea");
	el.value = result.textContent;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
	alert("Password Copied");
}

// Generate The Password
function generatePassword() {
	let checkers = [];
	if (lower.checked) {
		checkers.push("lowercaseCharacters");
	}
	if (upper.checked) {
		checkers.push("uppercaseCharacters");
	}
	if (number.checked) {
		checkers.push("numbers");
	}
	if (symbol.checked) {
		checkers.push("symbols");
	}

	if (checkers.length === 0) {
		console.log("nothing checked");
		alert("No item is checked!!!");
		return;
	}

	let len = length.value;
	let rawPassword = "";

	for (let checker of checkers) {
		for (let i = 0; i < len; ++i) {
			rawPassword += generator[checker]();
		}
	}
	rawPassword = shuffle(rawPassword.split("")).join("");
	result.textContent = rawPassword.slice(0, len);
}
