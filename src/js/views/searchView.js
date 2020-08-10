import {elements} from './base.js';

export const getInput=()=> elements.searchInput.value;

export const clearInput=()=>{
    elements.searchInput.value='';
};
export const clearResults=()=>{
    elements.searchResList.innerHTML ='';
    elements.searchResPages.innerHTML='';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle=(title,limit=17)=>{
    const newArr=[];
    if(title.length>=limit){
        title.split(" ").reduce((acu,curr)=>{
            if(acu+curr.length<=limit){
                newArr.push(curr);
            }
            return acu+curr.length;
        },0);
        return `${newArr.join(" ")}..)`;
    }
    return title;
};
const renderRecipe=recipe=>{
    const markup=
    `<li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                </div>
            </a>
        </li>
    `;
elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
       
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
       
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
        
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 8) => {
    // render results of currente page
   
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    const pages = Math.ceil(recipes.length / resPerPage);
    if(pages>1){
        renderButtons(page, recipes.length, resPerPage);
    }
};