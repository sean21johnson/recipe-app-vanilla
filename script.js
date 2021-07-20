const favoritesList = document.getElementById("favorites_list");
const mealsSearchList = document.getElementById("meal_search_list");
const additionalDetails = document.getElementById("meal_additional_details");
const ingredientsList = document.getElementById("meals_additional_details_list")

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
                <button class="recipe_button" id="recipe_button">Recipe</button>
            </div>
        </li>
    </ul>`;

	const recipeButton = document.getElementById("recipe_button");
	recipeButton.addEventListener("click", () => showMealInfo(meal));
}

function getIngredientsHtml(meal) {

    console.log(meal)

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
        console.log(ingredientNumber)
	}

    console.log(listText)

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

// create functions that handle all events

// add event listeners
