const month = document.querySelector("#month");
const day = document.querySelector("#day");
const year = document.querySelector("#year");

const rememberCheckBox = document.querySelector(".rememberCheckBox")
const rememberMe = document.querySelector(".rememberMe")

const submitBtn = document.querySelector(".submitBtn");

const success = document.querySelector("#success-text");
const error = document.querySelector("#error-text");

var date = new Date();

var isOldEnough = false;

var months = ['January', 'Feburary', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'
]

// When we first load the page we want to populate our select tag with options for the user to pick
function populateBirthdayHandler() {
    success.innerHTML = " "
    error.innerHTML = " "
    var numOfMonth = 1
    for(var i = 1; i <= daysInMonth(month.value, year.value); i++) {
        day.innerHTML += '<option value="' + i + '">' + i + '</option>' // populate days
    }
    months.forEach(m => {
        month.innerHTML += '<option value="' + numOfMonth++ + '">' + m + '</option>' // populate months
    });

    for(var i = date.getFullYear() - 100; i <= date.getFullYear(); i++) {
        year.innerHTML += '<option value="' + i + '">' + i + '</option>' // populate 100 years.
    }
}       

/* 
  Make a submit form handler that keeps track of user select data,
  check if the user is >= 21, if they are, show Welcome message
  if user is < 21 then show an error message that they are too young
  and a checkbox to remember the user every time they check the "remember me checkbox"
*/

function submitFormHandler() {
    var userDate = new Date()
    userDate.setMonth(month.value - 1) 
    userDate.setFullYear(year.value)
    userDate.setDate(day.value)
    var dateDifference = Math.abs(date - userDate) // subtract todays date with user birthday
    var someYearsOld = Math.floor(dateDifference / 31536000000) // convert miliseconds to age
    if (rememberCheckBox.checked) {
      checkCookie(someYearsOld)
    }
    if (someYearsOld >= 21) {
        success.innerHTML = "Welcome!"
        error.innerHTML = " " 
        month.style.display = 'none'
        day.style.display = 'none'
        year.style.display = 'none'
        rememberMe.style.display = 'none'
        submitBtn.style.display = 'none'
        isOldEnough = true
    } else {
        error.innerHTML = "Sorry, you are not old enough to enter this website."
        isOldEnough = false
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate() // gives the days of a certain month
}

/* 
everytime we select a particular month the days 
select tag will repopulate with the appropriate days in that month
*/
month.addEventListener('change', function() {
    day.innerHTML = ""
    for(var i = 1; i <= daysInMonth(month.value, year.value); i++) { 
        day.innerHTML += '<option value="' + i + '">' + i + '</option>' 
    }
})

window.addEventListener('load', populateBirthdayHandler())

submitBtn.addEventListener('click', submitFormHandler)

function setCookie(cname, cvalue1, cage, cvalue2, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue1 + ";" + cage + "=" + cvalue2 + ";" + expires + ";path=/";
}

function getCookie(cname, cage) {
    var name = cname + "=";
    var age = cage + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
      if (c.indexOf(age) == 1) {
        return c.substring(age.length, c.length);
      }
    }
    return "";
  }

  function checkCookie(age) {
    var username = getCookie("username", age);
    if (username != "") {
     alert("Welcome again " + username);
    } else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        setCookie("username", username, "age", age, 365);
      }
    }
  }