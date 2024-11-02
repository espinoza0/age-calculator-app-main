// Input Elements
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

// Input Errors
const errors = document.querySelectorAll('span.err');

const dayErr = document.querySelector('span.day-err');
const monthErr = document.querySelector('span.month-err');
const yearErr= document.querySelector('span.year-err');

const year = document.querySelector('span.yearCont');
const month = document.querySelector('span.monthCont');
const day = document.querySelector('span.dayCont');

const submit = document.querySelector('button[type="submit"]');


submit.addEventListener('click', function(){
    validate();
    calculate();
});


function validate(){
    
    isInputEmpty();

    // Input Errors
    let numDay = parseInt(dayInput.value.trim());
    if (numDay < 1 || numDay > 31) {
        dayErr.innerHTML = "Must be a valid day";
        errStyles(dayErr);
        
    }else{
        dayErr.innerHTML = "";
        removeErrStyles(dayErr);
    }


    let numMonth = parseInt(monthInput.value.trim());
    if (numMonth < 1 || numMonth > 12) {
        monthErr.innerHTML = "Must be a valid month";
        errStyles(monthErr);
    }else{
        monthErr.innerHTML = "";
        removeErrStyles(monthErr);
    }

    let numYear = parseInt(yearInput.value.trim());
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    if (numYear > currentYear) {
        yearErr.innerHTML = "Must be in the past";
        errStyles(yearErr);
    }else if(numYear < 0){
        yearErr.innerHTML = "Must be 0 or after.";
        errStyles(yearErr);
    }else{
        yearErr.innerHTML = "";
        removeErrStyles(yearErr);
    }
}

function calculate() {
    try {
        let today = new Date();
        let birth = new Date(yearInput.value.trim() + '-' + monthInput.value.trim() + '-' + dayInput.value.trim());
        
        if (dayInput.value.trim()== "" || monthInput.value.trim() == "" || yearInput.value.trim() == "") {
            isInputEmpty();
            throw "Invalid date format";
        }

        if (isNaN(birth)) {
            console.log(birth);
            throw "Invalid date format.";
        }
        console.log(birth)
        
        let currentDay = today.getDate();
        let currentMonth = today.getMonth() + 1;
        let currentYear = today.getFullYear();

        let birthDay = birth.getDate();
        let birthMonth = birth.getMonth() + 1;
        let birthYear = birth.getFullYear();

        let yearsDiff = currentYear - birthYear;
        let monthDiff = currentMonth - birthMonth;
        let dayDiff = currentDay - birthDay;

        // Month
        if (currentMonth <= birthMonth ) {
            yearsDiff--;
            monthDiff = 12 + (currentMonth - birthMonth);
        }else{
            monthDiff = currentMonth - birthMonth;
        }
        // Day
        if (currentDay <= birthDay) {
            monthDiff--;
            dayDiff = 31 + (currentDay - birthDay);
        }else{
            dayDiff = currentDay - birthDay;
        }

        year.innerHTML = yearsDiff;
        month.innerHTML = monthDiff;
        day.innerHTML = dayDiff;   
    } catch (err) {
        console.log(err);
        error();
    }

}
function isInputEmpty() {
    errors.forEach( err =>{
        let input = err.previousElementSibling;
        if (input.value.trim() == ""){
            console.log(input)
            console.log(err.innerHTML)
            err.innerHTML = "The field is required";
            errStyles(err);
        }else{
            err.innerHTML ="";
            removeErrStyles(err);
        }
    });
}

// Error styles functions
function errStyles(element) {
    element.classList.add = "err";
    element.previousElementSibling.classList.add('input-err');
    element.previousElementSibling.previousElementSibling.style.color = "hsl(0, 100%, 67%)";
}
function removeErrStyles(element){
    element.classList.remove = "err"
    element.previousElementSibling.classList.remove('input-err');
    element.previousElementSibling.previousElementSibling.style.color = "hsl(0, 1%, 44%)";
}
function error() {
    year.innerHTML = "--";
    month.innerHTML = "--";
    day.innerHTML = "--";
}