// fetching all the elements required for functionality
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("data-passwordDisplay");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("[#uppercase]");
const lowercaseCheck=document.querySelector("[#lowercase]");
const numbersCheck=document.querySelector("[#numbers]");
const symbolsCheck=document.querySelector("[#symbols]");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateBtn");
const allCheckbox=document.querySelector("input[type=checkbox]");

let password="";
let passwordLength=10;
let checkCount=1;
// ste strength circle color to grey 
// lets do list of function 
1. copy 
2. to handle slider 
3. we use listener to generate password 
4. color set for strength
5. function to generate Random integer
6. get random integer, getRandomupperCase,getRandomlowerCase, getRandomSymbol, calculate 