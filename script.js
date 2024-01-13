// fetching all the elements required for functionality
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateBtn");
const allCheckbox=document.querySelector("input[type=checkbox]");

let password="";
let passwordLength=10; // default value
let checkCount=1;

handleSlider();
// ste strength circle color to grey 
// lets do list of function 
// 1. copy 
// 2. to handle slider 
// 3. we use listener to generate password 
// 4. color set for strength
// 5. function to generate Random integer
// 6. get random integer, getRandomupperCase,getRandomlowerCase, getRandomSymbol, calculate the strength
// User flow : 
// user confirms the password character limit , 
//then select the option like want upper Case ,like lowercase , include symbol 
// then user click on generate password , password will be generated 
// then user if want to copy it then he will copy using copy button
 
// to set password length according to slider
function handleSlider() {
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
};

function setIndicator(color) {
    indicator.style.backgroundColor=color;
    // need to put shadow Homework 
}

function getRndinteger(min,max) {
    return Math.floor(Math.random()*(max-min))+min; 
     // math.random = 0-1 means if max-min multiply with this 
     // we get ==0 - (max-min)==(0+min)-(max-min+min)==min-max; 
     // so here we got value between min to max  
}

function generateRandomNumber() {
    return getRndinteger(0.9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndinteger(97,123)) // these are ASCII numbers 
}

function generateUpperCase(){
    return String.fromCharCode(getRndinteger(65,91)) // these are ASCII numbers 
}