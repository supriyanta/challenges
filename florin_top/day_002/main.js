const year = 2019;
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let calendar = document.getElementById("calendar");
const defaultColor = "#fff";
let activeColor = defaultColor;

const moods = document.querySelector("#moods-box");

moods.addEventListener("click", function(e) {
	let target = e.target;
	if (!target.classList.contains("far")) {
		return;
	}

	if (target.classList.contains("clicked")) {
		activeColor = defaultColor;
		target.classList.remove("clicked");
		return;
	}

	document.querySelectorAll(".far").forEach(mood => {
		mood.classList.remove("clicked");
	});

	let color = getComputedStyle(target).getPropertyValue("color");

	activeColor = color;
	target.classList.add("clicked");
});

calendar.addEventListener("click", function(e) {
	let target = e.target;
	if (!target.classList.contains("circle")) {
		return;
	}
	if (target.style.background === activeColor) {
		target.style.background = defaultColor;
		target.style.color = "black";
	} else {
		target.style.background = activeColor;
		target.style.color = activeColor === defaultColor ? "black" : "white";
	}
});

function getAllDays() {
	let firstDay = new Date(`${year}-01-01`);
	let lastDay = new Date(`${year + 1}-01-01`);

	let days = [];

	while (firstDay.getTime() !== lastDay.getTime()) {
		days.push(firstDay);
		let currentDay = new Date(firstDay);
		currentDay.setDate(firstDay.getDate() + 1);

		firstDay = currentDay;
	}
	return days;
}

function createEmptySlot() {
	let div = document.createElement("div");
	div.textContent = "";
	return div;
}

function createDateSlot(date) {
	let div = document.createElement("div");
	div.textContent = date + "";
	div.classList.add("circle");
	return div;
}

function createWeekDaySlot(day) {
	let div = document.createElement("div");
	div.textContent = day;
	div.classList.add("weekday");
	return div;
}

function setDays(days) {
	days.forEach(day => {
		let date = day.getDate();
		let weekDay = day.getDay();
		let month = day.getMonth();
		let monthContainer = document.querySelector(`#month-${month}`);

		while (date === 1 && weekDay--) {
			let emptyEl = createEmptySlot();
			monthContainer.appendChild(emptyEl);
			// console.log(day, months[month]);
		}
		let dateEl = createDateSlot(date);
		monthContainer.appendChild(dateEl);
		// console.log("bb ", day, months[month]);
	});
}

function paintUI() {
	const days = getAllDays();
	let html = "";
	months.forEach((month, index) => {
		html += `<div><div class="month-name">${month}</div> `;
		html += `<div class="month" id=month-${index}></div></div> `;
	});
	calendar.innerHTML = html;
	months.forEach((month, index) => {
		let monthContainer = document.querySelector(`#month-${index}`);
		weekDays.forEach(weekDay => {
			monthContainer.appendChild(createWeekDaySlot(weekDay));
		});
	});
	setDays(days);
}

paintUI();
