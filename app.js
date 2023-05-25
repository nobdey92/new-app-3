let buttonAllParametersCheckerExercises = document.querySelector(
  "#buttonAllParametersCheckerExercises"
);

let checkboxTypeExercise = document.querySelectorAll(
  'input[name="typeOfExercises"]:checked'
);

//Define checked checkboxes values

let valuesTypeOfMussles = [];
let valuesTypeOfExercises = [];
let valuesTypeOfDifficulty = [];

//Made 3 arrays of checked checkboxes values

let valuesTypeOfMusslesAll = [];
let valuesTypeOfExercisesAll = [];
let valuesTypeOfDifficultyAll = [];

let apiKey = "e2tk2aVVqC7JgZSqYZMu0w==XUAmhHQElchlx6Fi";

// Get Exercises For The Input Checkbox Values

const fetchExerciseByAllCheckboxes = () => {
  document.querySelector("#resultNameExercise").innerHTML = "";

  //receive checked checkboxes

  let checkboxesTypeOfDifficulty = document.querySelectorAll(
    'input[name="typeOfDifficulty"]:checked'
  );
  let checkboxesTypeOfMussles = document.querySelectorAll(
    'input[name="typeOfMussles"]:checked'
  );
  let checkboxesTypeOfExercises = document.querySelectorAll(
    'input[name="typeOfExercises"]:checked'
  );

  // receive checkboxes for fetch

  checkboxesTypeOfExercises.forEach((checkbox) => {
    valuesTypeOfExercises.push(checkbox.value);
  });

  checkboxesTypeOfMussles.forEach((checkbox) => {
    valuesTypeOfMussles.push(checkbox.value);
  });

  checkboxesTypeOfDifficulty.forEach((checkbox) => {
    valuesTypeOfDifficulty.push(checkbox.value);
  });

  //fetch an arrays of exersises for all chosen types

  valuesTypeOfExercises.forEach((type) =>
    fetch("https://api.api-ninjas.com/v1/exercises?type=" + `${type}`, {
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
    })
      .then((res) => res.json())
      .then((resultType) => {
        for (let i = 0; i < resultType.length; i++) {
          valuesTypeOfExercisesAll.push(resultType[i]);
          cardConstructor("name", resultType[i]);
        }
      })
      .catch((error) => console.log(error))
  );

  //fetch an array of exersises for all chosen groups of mussles

  valuesTypeOfMussles.forEach((muscle) =>
    fetch("https://api.api-ninjas.com/v1/exercises?muscle=" + `${muscle}`, {
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
    })
      .then((res) => res.json())
      .then((resultMuscle) => {
        for (let i = 0; i < resultMuscle.length; i++) {
          valuesTypeOfMusslesAll.push(resultMuscle[i]);
          cardConstructor("name", resultMuscle[i]);
        }
      })

      .catch((error) => console.log(error))
  );

  //fetch an array of exersises for all chosen difficulties

  valuesTypeOfDifficulty.forEach((difficulty) =>
    fetch(
      "https://api.api-ninjas.com/v1/exercises?difficulty=" + `${difficulty}`,
      {
        headers: { "X-Api-Key": apiKey },
        contentType: "application/json",
      }
    )
      .then((res) => res.json())
      .then((resultdifficulty) => {
        for (let i = 0; i < resultdifficulty.length; i++) {
          valuesTypeOfDifficultyAll.push(resultdifficulty[i]);
          cardConstructor("name", resultdifficulty[i]);
        }
      })
      .catch((error) => console.log(error))
  );
};

let cardConstructor = (property, value) => {
  let cardArticle = document.createElement("article");
  cardArticle.innerHTML = `
                          <div class="exerciseCard">
                            <h4 class="nameExercise">${value.name}</h4>
 <p class="typeExercise"><span class="property-exercise">${"Type of exercises:"}</span> <span class="value-exercise">${
    value.type
  }</span></p>
                            <p class="muscleExercise"><span class="property-exercise">${"Mussles:"}</span> <span class="value-exercise">${
    value.muscle
  }</span></p>
                            <p class="equipmentExercise"><span class="property-exercise">${"Equipment you need:"}</span>  <span class="value-exercise">${
    value.equipment
  }</span></p>
                            <p class="difficultyExercise"><span class="property-exercise">${"Level of difficulty:"}</span><span class="value-exercise">${
    value.difficulty
  }</span></p>
                            <p class="instructionsExercise"><span class="property-exercise">${"What to do:"}</span> <span class="value-exercise">${
    value.instructions
  }</span></p>
                          </div>`;

  const resultBox = document.querySelector("#resultNameExercise");
  resultBox.appendChild(cardArticle);
};

// Handle the button after the checkboxes were completed

buttonAllParametersCheckerExercisesHandler = (event) => {
  event.preventDefault();
  fetchExerciseByAllCheckboxes();
};

// Add eventlistener

buttonAllParametersCheckerExercises.addEventListener(
  "click",
  buttonAllParametersCheckerExercisesHandler
);
