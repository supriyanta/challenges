const URL = `https://www.themealdb.com/api/json/v1/1/random.php`;

const btn = document.querySelector("button");
const ingredients = document.querySelector("#ingred-list");

btn.addEventListener("click", async function getAMeal() {
	fetch(URL)
		.then(data => data.json())
		.then(data => {
			console.log(data);
			let meal = data.meals[0];
			console.log(meal);
			paintUi(meal);
		})
		.catch(err => {
			console.log(err);
		});
});

function makeIngredientItem(itemName, measure) {
	let item = document.createElement("li");
	item.innerText = `${itemName} -- ${measure}`;
	ingredients.appendChild(item);
}

function addVideoIFrame(name, videoLink) {
	let player = document.querySelector("#player");
	player.innerHTML = "";

	let h2Name = document.createElement("h2");
	h2Name.textContent = name;
	h2Name.classList.add("recipe-name");

	player.appendChild(h2Name);

	let videoWrapper = document.createElement("div");
	videoWrapper.classList.add("video-wrapper");

	let IFrame = document.createElement("iframe");
	IFrame.setAttribute("width", "420");
	IFrame.setAttribute("height", "315");
	IFrame.setAttribute(
		"src",
		`https://www.youtube.com/embed/${videoLink.slice(-11)}`
	);
	IFrame.setAttribute("frameborder", "0");
	IFrame.setAttribute("allow", "autoplay; encrypted-media");
	IFrame.setAttribute("allowfullscreen", true);

	videoWrapper.appendChild(IFrame);
	player.appendChild(videoWrapper);
}

function paintUi(meal) {
	document.querySelector(".main").style.visibility = "visible";
	document.querySelector(".recipe-name").textContent = meal.strMeal;
	document.querySelector("#recipe-desc").textContent = meal.strInstructions;
	document.querySelector("img").src = meal.strMealThumb;
	document.querySelector("#category").textContent = meal.strCategory;
	document.querySelector("#area").textContent = meal.strArea;
	document.querySelector("#tags").textContent = !!meal.strTags
		? meal.strTags.split(",").join(", ")
		: "None";

	let i = 1;
	while (true) {
		let attr = `strIngredient${i}`;
		if (!meal[attr]) break;
		let measure = `strMeasure${i}`;
		makeIngredientItem(meal[attr], meal[measure]);
		++i;
	}

	// Adding video
	addVideoIFrame(meal.strMeal, meal.strYoutube);
}
