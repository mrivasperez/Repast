// BUILT MY MRIVASPEREZ RELEASED UNDER UNLICENSE
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    resultHeading = document.getElementById('result-heading'),
    mealsEl = document.getElementById('meals'),
    single_mealEl = document.getElementById('single-meal');


// Search meal and get from API
function searchMeals(e) {
    // make sure submit action doesn't actually try to submit to a file
    e.preventDefault();
     
    // clear single meal
    single_mealEl.innerHTML = '';

    //get search term
    const term = search.value;

    // Check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h3>Search results for "${term}"</h3>`;
            
            if(data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results for "${term}"</p>`
            } else {
                mealsEl.innerHTML = data.meals
                    .map(
                    meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                `
                  )
                  .join('');
              }
            });
            //Clear search text
            search.value='';
    } else {
        alert('Please enter a search term.');
    }
}

// Fetch meal by ID
function getMealByID(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}

// RANDOM BUTTON

function randomMeal() {
    // Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}

// ADD MEAL TO THE DOM
function addMealToDOM(meal) {
    const ingredients = [];
    for(let i = 1; i<= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else{
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<h2>Categories: ${meal.strCategory},` : ''}
                ${meal.strArea ? `${meal.strArea}</h2>` : ''}
            </div>
            <div class="main">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
            <h3>Ingredients</h3>
            <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            </div>
        </div>
    `;
}

// Event listeners
submit.addEventListener('submit', searchMeals);
mealsEl.addEventListener('click', e => {
    // find if meal info div belongs to element we clicked
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
})

random.addEventListener('click', randomMeal);

// BUILT MY MRIVASPEREZ RELEASED UNDER UNLICENSE