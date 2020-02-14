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