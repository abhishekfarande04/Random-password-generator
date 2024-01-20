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
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
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


// after generating password we need all random letters and numbers and Symbols 
function  shufflePassword() {
    // Fisher Yates method 
    let array=Array.from(password);
    for(let i=array.length-1;i>0;i--) {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }

    let str="";
    array.forEach((el)=> (str+=el));
    return str;
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (numbersCheck.checked) {
        hasNum = true;

    }
    if (symbolsCheck.checked) {
        hasSym = true;
    }
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}



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
    if(checkCount<=0) {
        return ;
    }

    if(passwordLength<checkCount) {
        passwordLength=checkCount;
        handleSlider();
    }
    // lets find new password
    // lets start tje journey to find new password 
    console.log("Starting the journey");
    // remove old password
    password="";
    // lets put the stuff mentioned by Checkboxes 

    // if(uppercaseCheck.checked) {
    //     password+=generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password+=generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password+=generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password+=generateSymbol();
    // }
    // above is low level 

    let funcArr=[];

    if(uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    } 

    if(lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }

    if(numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked) {
        funcArr.push(generateSymbol );
    }

    // compulsory addition 
    for(let i=0;i<funcArr.length;i++) {
        password+=funcArr[i]();
    }
    console.log("Compulsory  addtion done ")
    // remaining position 
    for(let i=0;i<passwordLength-funcArr.length;i++) {
        let randIndex=getRndinteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    } 
    console.log("remaining  addtion done ")

    // shuffle the password 
    password=shufflePassword(Array.from(password));

    // show in UI 
    passwordDisplay.value=password;

    //calculate Strength
    calcStrength();



 


    
}) 