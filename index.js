const apiId = `6bb14405`;
const apiKey = `3eb1b9d476cae6ac0c5bf55310139779`;

let searchBar = document.getElementById("search");
searchBar.focus();

const mainBox = document.querySelector(".innerContainer");
// const page = document.querySelector(".page");

async function api() {
  const search = `https://api.edamam.com/search?q=${
    document.getElementById("search").value
  }&app_id=${apiId}&app_key=${apiKey}`;
  const response = await fetch(search);
  const data = await response.json();
  // console.log(data);
  setTimeout(() => {
    pageData(data.hits);
  }, 500);
  importantData(data.hits);
  // console.log(data.hits[0].recipe.ingredientLines[0]);
}

// main functions caller 👇🏻👇🏻👇🏻

window.addEventListener("keydown", (e) => {
  // api caller function
  if (e.keyCode == 13) {
    recipePage();
    api();
  }

  // result remover functions
  setInterval(() => {
    let valueOfInput = searchBar.value;
    let all = document.querySelectorAll(".images");
    if (valueOfInput == "" || e.keyCode == 32 || e.keyCode == 8) {
      all.forEach((name) =>
        window.addEventListener("keydown", () => name.remove())
      );
    }
  }, 0000001);
});

// main functions of website are below 😁😁😃
function importantData(important) {
  // searcher bar below images link maker (❁´◡`❁)
  important.forEach((name, index) => {
    let calories = Math.round(name.recipe.calories);
    let data1 = `<div class="images">
                       <img id="imagesBox" src=${name.recipe.image} alt="" />
                        <div class="dataBase">
                          <h1 class=headingOfFood>${name.recipe.label}</h1>
                          <p class="description">unencumbered whence there is no other thing to receive, since it is the inventor, the distinction of things through guilt or pain! Pleasure-free will come with respect to exercise.</p>
                          <h3>Calories: ${calories}gm</h3>
                          <button class="recipeButton">Recipe</button>
                        </div>
                      </div>
            `;
    mainBox.innerHTML += data1;
    window.scrollTo(0, 700);
  });
}

// page pop up and cut but functions are below

const cutButton = document.getElementById("cut");
const pageCover = document.querySelector(".pageCover");
const page = document.querySelector(".page");
const sound = new Audio("pageSlide.mp3");
// cut
cutButton.onclick = () => {
  //information remover functions
  let list = document.querySelectorAll(".listOfData");
  let br = document.querySelectorAll("br");
  let hr = document.querySelectorAll("hr");
  list.forEach((name) => name.remove());
  br.forEach((name) => name.remove());
  hr.forEach((name) => name.remove());
  // end

  //page down function
  cutButton.style.transform = "rotate(359deg)";
  setTimeout(() => {
    cutButton.display = "none";
    sound.play();
    page.style.marginTop = "300vh";
    setTimeout(() => {
      pageCover.style.display = "none";
    }, 400);
  }, 200);
  document.body.style.overflow = "visible";
  // end
};

// recipe page functions are below☆*  : .｡. o(≧▽≦)o .｡.:*☆
let allDiv;
let buttons;
function recipePage() {
  setInterval(() => {
    allDiv = document.querySelectorAll(".images");
    buttons = document.querySelectorAll(".recipeButton");
    buttons.forEach((name, index) => {
      name.addEventListener("click", () => {
        // console.log(index);

        // pop up
        setTimeout(() => {
          sound.play();
          cutButton.style.transform = "rotate(0deg)";
          pageCover.style.display = "flex";
          cutButton.display = "block";
          setTimeout(() => {
            page.style.marginTop = "0";
          }, 1);
        }, 10);
        document.body.style.overflow = "hidden";
        // End
      });
    }, 1);
  });
}

// page information shower functions ╰(*°▽°*)╯

let headingOfFood = document.querySelector(".dishName");
function pageData(promise) {
  buttons.forEach((name, index) => {
    name.addEventListener("click", () => {
      for (let a = 0; a < promise[index].recipe.ingredientLines.length; a++) {
        let label = promise[index].recipe.label;
        headingOfFood.innerHTML = label;
        let dataOfRecipe = promise[index].recipe.ingredientLines[a];
        page.innerHTML += `
         <hr>
          <li class="listOfData">${dataOfRecipe}</li>
        <br>`;
      }
    });
  });
}

// Responsive heading code 👇🏻👇🏻
setInterval(() => {
  if (page.style.overflow == "scroll" || page.style.overflow == "") {
    page.style.paddingTop = "4rem";
  } else {
    page.style.paddingTop = "0rem";
  }

  if (
    (window.innerWidth >= 800 && page.style.overflow == "scroll4rf") ||
    page.style.overflow == ""
  ) {
    headingOfFood.style.marginTop = "9rem";
  } else if (window.innerHeight == 1600 && window.innerWidth == 720) {
    headingOfFood.style.marginTop = "0rem";
  } else {
    headingOfFood.style.marginTop = "0rem";
  }
}, 1);
//end
