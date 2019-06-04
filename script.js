const month = document.querySelector("#month");
const day = document.querySelector("#day");
const year = document.querySelector("#year");

const rememberCheckBox = document.querySelector(".rememberCheckBox")
const rememberMe = document.querySelector(".rememberMe")

const submitBtn = document.querySelector(".submitBtn");

const success = document.querySelector("#success-text");
const error = document.querySelector("#error-text");

var date = new Date();

var months = ['January', 'Feburary', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'
]

function populateBirthdayHandler() {
    success.innerHTML = " "
    error.innerHTML = " "
    var numOfMonth = 1
    for(var i = 1; i <= daysInMonth(month.value, year.value); i++) {
        day.innerHTML += '<option value="' + i + '">' + i + '</option>'
    }
    months.forEach(m => {
        month.innerHTML += '<option value="' + numOfMonth++ + '">' + m + '</option>'
    });

    for(var i = date.getFullYear() - 100; i <= date.getFullYear(); i++) {
        year.innerHTML += '<option value="' + i + '">' + i + '</option>'
    }
}       

function submitFormHandler() {
    checkCookie()
    var userDate = new Date()
    userDate.setMonth(month.value - 1)
    userDate.setFullYear(year.value)
    userDate.setDate(day.value)
    var dateDifference = Math.abs(date - userDate)
    var someYearsOld = Math.floor(dateDifference / 31536000000)
    if (someYearsOld >= 21) {
        success.innerHTML = "Welcome!"
        error.innerHTML = " "
        month.style.display = 'none'
        day.style.display = 'none'
        year.style.display = 'none'
        rememberMe.style.display = 'none'
    } else {
        error.innerHTML = "Sorry, you are not old enough to enter this website."
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

month.addEventListener('change', function() {
    day.innerHTML = ""
    for(var i = 1; i <= daysInMonth(month.value, year.value); i++) {
        day.innerHTML += '<option value="' + i + '">' + i + '</option>'
    }
})

window.addEventListener('load', populateBirthdayHandler())

submitBtn.addEventListener('click', submitFormHandler)

