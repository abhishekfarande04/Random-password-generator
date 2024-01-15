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
const symbols='`~!@#$%^&*()_+-=[]\{}|;,./<>?';

let password="";
let passwordLength=10; // default value
let checkCount=0;

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
    return getRndinteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndinteger(97,123)) // these are ASCII numbers 
}

function generateUpperCase(){
    return String.fromCharCode(getRndinteger(65,91)) // these are ASCII numbers 
}

function generateSymbol() {
    //created string contains all the symbols  
    //generate Random number from string using getRndinteger(0,string.length)
    const randNum=getRndinteger(0,symbols.length)
    return symbols.charAt(randNum)
};

function calcStrength() {

    //in the beginning all checkboxed are not checked
    let hasUpper=false;
    let hasLower=false
    let hasNumber=false
    let hasSymbol=false

    // if user marked it as correct 
   if(uppercaseCheck.checked) {
    hasUpper=true
   };

   if(lowercaseCheck.checked) {
    hasLower=true
   };

   if(numbersCheck.checked) {
    hasNumber=true
   };

   if(symbolsCheck.checked) {
     hasSymbol=true
   }

   // Criteria for Strength
   if((hasUpper && hasLower) && passwordLength <=6) {
       setIndicator("#ff0000"); // red
   }  else if((hasUpper && hasLower)&& hasNumber && passwordLength <=10) {
       setIndicator("#ffff00");  // yellow
   }  else if(hasUpper && hasLower && hasNumber && hasSymbol && passwordLength >=10) {
    setIndicator("#008000 ");  // Green
   } else {
    setIndicator("#ff0000");
   };
}

// to count the number of boxes checked 
function handleCheckBoxChange() {
    checkCount=0;
    allCheckbox.forEach((checkbox)=> { 
        if(checkbox.checked) {
            checkCount++;
        } 
    });
    // if password length is less than Checkbox checked then it should generate password atleast of count of checkbox checked 
    if (passwordLength<checkCount) {
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});
 // function to copy 
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText= "copied";
    } catch(e) {
        copyMsg.innerText= "Failed";
    }
    // to make copy span visible
    copyMsg.classList.add("active");
    
    // set timeout for Copy message

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000); 
 
}

// added eventlisteners
inputSlider.addEventListener('input',(e) => {
 passwordLength = e.target.value;
 handleSlider();
});
// for copy button 
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value) {
        copyContent();
    }   
})
//for generate Button 
generateBtn.addEventListener('click',() => {
    // none of checkboxes are checked 
    
}) 