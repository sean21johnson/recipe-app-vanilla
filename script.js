const favoritesListEl = document.getElementById("favorites_list");
const mealsSearchList = document.getElementById("meal_search_list");
const additionalDetails = document.getElementById("meal_additional_details");
const ingredientsList = document.getElementById(
	"meals_additional_details_list"
);

const favoriteMealIds = window.localStorage.setItem("favoriteMealIds", [])

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
// mealById: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
// searchForMeal: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term

// target the elements which we will need to traverse and manipulate

// test fetch functionality
async function getRandomMeal() {
	const response = await fetch(randomMealUrl);
	const responseJson = await response.json();
	const theMeal = responseJson.meals[0];

	setRandomMeal(theMeal);
}

function setRandomMeal(meal) {
	mealsSearchList.innerHTML = `<ul>
        <li class="random_meal_item" id="random_meal_item">
            <div>
                <img class="meal" src="${meal.strMealThumb}" alt="random_meal">
            </div>
            <div class="random_meal_additional" id="random_meal_additional">
                <h3>${meal.strMeal}</h3>
                <div class="meal_buttons">
                    <button class="recipe_button" id="recipe_button">Recipe</button>
                    <button class="fav_button" id="fav_button">
                        <i class="far fa-heart" id="heart"></i>
                    </button>
                </div>
            </div>
        
        </li>
    </ul>`;

	const recipeButton = document.getElementById("recipe_button");
	recipeButton.addEventListener("click", () => showMealInfo(meal));

	/*
    target the favorite button and add a click event listener
        callback function should pass the meal to the favorites array, call it setFavoriteMeals()
            setFavoriteMeals will take a meal argument
            will need to use localStorage to store the favorite meals array
                favorite meals array will likely need to reference the meals by the mealId
    */

	const favoriteButton = document.getElementById("fav_button");

	const heart = document.getElementById("heart");
	heart.addEventListener("click", () => {
		setHeartStatus();
		setLocalStorage(meal.idMeal);
	});

	// change the classes within the heart to reflect a filled in heart instead of an empty heart
}

function setHeartStatus() {
	if (heart.classList.contains("far")) {
		heart.classList.remove("far");
		heart.classList.add("fas");
	} else {
		heart.classList.remove("fas");
		heart.classList.add("far");
	}
}

function setLocalStorage(idMeal) {
	console.log(idMeal);

	let localStorageMeals = window.localStorage.getItem(
		"favoriteMealIds",
		favoriteMealIds
	);

	if (localStorageMeals === null) {
		favoriteMealIds.push(idMeal);
		window.localStorage.setItem("favoriteMealIds", favoriteMealIds);
    }
}

function removeFromLocalStorage(idMeal) {
	console.log(idMeal);
}

// get the list of items from local storage
// loop through the ids and fetch each meal from the API endpoint and add them to an array
// loop through the array of meals that was just created
// target the favoritesListEl and add them into the list with similar functionality in place
// that is in the getRandomMeal
function displayFavoriteMeals() {
	let mealIdList = window.localStorage;
}

function getIngredientsHtml(meal) {
	let ingredientNumber = 1;
	let currentIngredient = "strIngredient";
	let currentMeasurement = "strMeasure";
	let listText = "";

	let currentIngredientString = `${currentIngredient}${ingredientNumber.toString()}`;
	let currentMeasurementString = `${currentMeasurement}${ingredientNumber.toString()}`;

	while (meal[currentIngredientString] !== "" && ingredientNumber < 21) {
		currentIngredientString = `${currentIngredient}${ingredientNumber.toString()}`;
		currentMeasurementString = `${currentMeasurement}${ingredientNumber.toString()}`;

		listText += `
            <li>
                ${meal[currentIngredientString]} - ${meal[currentMeasurementString]}
            </li>
        `;

		ingredientNumber++;
	}

	return listText;
}

function showMealInfo(meal) {
	// set a count variable to 0 to start out
	// iterate through the ingredients properties until it returns the value of an empty string
	// dynamically change the property it needs to look at in each iteration too

	additionalDetails.innerHTML = `
        <div>
            <p>${meal.strInstructions}</p>
            <ul>
                ${getIngredientsHtml(meal)}
            </ul>
        </div>

    `;
}

getRandomMeal();
displayFavoriteMeals();

// create functions that handle all events

// add event listeners
