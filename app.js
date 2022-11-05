//varables
const button = document.querySelector("#btn");

// Create Dino Constructor
/**
 * @description Represents a Dino object
 * @constructor
 * @param {string} species - The species of Dino
 * @param {string} weight - The weight of Dino
 * @param {string} height - The height of Dino
 * @param {string} diet -   what diet of Dino
 * @param {string} where -  The place that found taht kind of Dino in
 * @param {string} when -   The Dino's era
 * @param {string} fact - The fact about Dino
 */
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;

    dinoObjects.push(this);
}
//array of Dino Objects
let dinoObjects = [];
// Create Dino Objects

const Triceratops = new Dino(
    "Triceratops",
    13000,
    114,
    "herbavor",
    "North America",
    "Late Cretaceous",
    "First discovered in 1889 by Othniel Charles Marsh"
);
const TyrannosaurusRex = new Dino(
    "Tyrannosaurus Rex",
    11905,
    144,
    "carnivor",
    "North America",
    "Late Cretaceous",
    "The largest known skull measures in at 5 feet long."
);
const Anklyosaurus = new Dino(
    "Anklyosaurus",
    10500,
    55,
    "herbavor",
    "North America",
    "Late Cretaceous",
    "Anklyosaurus survived for approximately 135 million years."
);
const Brachiosaurus = new Dino(
    "Brachiosaurus",
    13000,
    372,
    "herbavor",
    "North America",
    "Late Jurasic",
    "An asteroid was named 9954 Brachiosaurus in 1991."
);
const Stegosaurus = new Dino(
    "Stegosaurus",
    11600,
    79,
    "herbavor",
    ["North America", "Europe", "Asia"],
    "Late Jurasic to Early Cretaceous",
    "The Stegosaurus had between 17 and 22 seperate places and flat spines."
);
const Elasmosaurus = new Dino(
    "Elasmosaurus",
    16000,
    59,
    "carnivor",
    "North America",
    "Late Cretaceous",
    "Elasmosaurus was a marine reptile first discovered in Kansas."
);
const Pteranodon = new Dino(
    "Pteranodon",
    44,
    20,
    "carnivor",
    "North America",
    "Late Cretaceous",
    "Actually a flying reptile, the Pteranodon is not a dinosaur."
);
const Pigeon = new Dino(
    "Pigeon",
    0.5,
    9,
    "herbavor",
    "World Wide",
    "Holocene",
    "All birds are living dinosaurs."
);

// Create Human Object
const human = {};
//find the middel of dinoObjects Array ,for insert the human object
const middel = Math.floor(dinoObjects.length / 2);
dinoObjects.splice(middel, 0, human);
// Use IIFE to get human data from form
const humanData = function () {
    const name = document.querySelector("#name");
    const heightFeet = document.querySelector("#feet");
    const heightInches = document.querySelector("#inches");
    const weight = document.querySelector("#weight");
    const diet = document.querySelector("#diet");

    const _this = this;
    return function () {
        (_this.name = name.value),
            (_this.heightInches = Number(heightInches.value)),
            (_this.heightFeet = Number(heightFeet.value)),
            (_this.weight = Number(weight.value)),
            (_this.diet = diet.value);
    };
}.call(human);

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.CompareDite = function () {
    if (this.diet === human.diet)
        return `${this.species}  eating the same as your diet `;
    if (this.diet === "carnivor")
        return `Be careful, The ${this.species} eats meat,so maybe will eating you `;
    if (this.diet === "herbavor")
        return `The ${this.species} is just eating plants, so he will not eat you`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.Compareheight = function () {
    const heightDiff = this.height - human.heightInches;
    if (heightDiff === 0)
        return `The ${this.species} has the same as your height`;
    if (heightDiff < 0) return `You are talle then ${this.species} `;
    if (heightDiff > 0) return `The ${this.species} taller than you`;
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.CompareWeight = function () {
    const weightDiff = this.weight - human.weight;
    if (weightDiff === 0)
        return `The ${this.species} has the same as your weight test3`;
    if (weightDiff < 0)
        return `You have more Weight then ${this.species} test2`;
    if (weightDiff > 0)
        return `The ${this.species} has more Weight  than you,the diffrent is ${weightDiff} lbs test1`;
};
// Generate Tiles for each Dino in Array
let template = "";
/**
* @description generate tiles for each Dino in Array 
then add that tiles to tamplate
*
*/
function generateTiles() {
    let speciesNmae;
    let imgName;
    dinoObjects.forEach((curr, i) => {
        speciesNmae = curr.species;

        if (i === middel) {
            template += `${htmlTemplate("human", curr.name)}
        </div>`;
        } else {
            //if the specise that pased to replaceLitter content 2 words then we add it together
            //after convert the first litter for both them to LowerCase ,we will put space between them
            if (replaceCharacter(0, 1, speciesNmae).length !== 0) {
                imgName =
                    replaceCharacter(0, 0, speciesNmae) +
                    " " +
                    replaceCharacter(0, 1, speciesNmae);
            } else {
                //if the species just content one word
                imgName = replaceCharacter(0, 0, speciesNmae);
            }

            //use switch to manipulation of the facts appear in tiles
            let factRandome;

            const key = randomFact(6);
            switch (key) {
                case 0:
                    factRandome = curr.CompareDite();
                    break;
                case 1:
                    factRandome = curr.Compareheight();
                    break;
                case 2:
                    factRandome = curr.CompareWeight();
                case 3:
                    factRandome = `${curr.species} has total weight is ${curr.weight} lbs, and total height is ${curr.height} inches`;
                    break;
                case 4:
                    factRandome = `Its era is in the  ${curr.when} period, While the place that found it in ${curr.where}`;
                    break;
                case 5:
                    factRandome = curr.fact;
                    break;
            }
            //to examine  the species ,if it is equal pigeon then return its fact, which is"All birds are living dinosaurs."
            curr.species === "Pigeon" ? (factRandome = curr.fact) : factRandome;

            template += `${htmlTemplate(imgName, speciesNmae)}
     <div><p>${factRandome}</p></div>
     </div>`;
        }
    });
}

// Add tiles to DOM
function addTiles() {
    document.querySelector("#grid").insertAdjacentHTML("beforeend", template);
}
// Remove form from screen
function remvoeForm() {
    document.querySelector("#dino-compare").style.display = "none";
}

// On button click, prepare and display infographic

button.addEventListener("click", function () {
    //asing the data from from to humane object
    humanData();
    //create Tiles after click button
    generateTiles();

    addTiles();

    remvoeForm();
});

/// this function to see if the species of Dino content tow parts
//  then function will convert the firt character  of both to small character
// if just the species content just one name then ll convert the firt character  of to small character
/**
 * @description replace the the first Captel Character withe small Character
 * @param {number} indexL
 * @param {number} indexW
 * @param {string} speciesName
 * @returns {string} speciesName1 of replace   the first Captel Character withe small Character from speciesName
 */
function replaceCharacter(indexL, indexW, speciesName) {
    let speciesName1;
    speciesName1 = speciesName.split(" ");

    if (speciesName1[indexW] !== undefined) {
        speciesName1 = speciesName1[indexW].replace(
            speciesName1[indexW][indexL],
            speciesName1[indexW][indexL].toLowerCase()
        );
        return speciesName1;
    } else return "";
}

// this function will create html tags those, will help to generate tiles dino or tile human
/**
 * @description htmlTemplate ues to create html tags for img name  and human name or  din species
 * @param {string} img
 * @param {string} name
 * @returns {number} Sum of a and b
 */
function htmlTemplate(img, name) {
    return `<div class="grid-item">
<h2>${name}</h2>
<img src="images/${img}.png">`;
}

//create random number that use to displayed  fact randomly
/**
 * @description Random number form 0 to max
 * @param {number} max
 * @returns {number} intger random number
 */
function randomFact(max) {
    return Math.trunc(Math.random() * max);
}
