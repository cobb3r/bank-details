let passValid = false
let emailValid = false
let numberCheck = document.getElementById("number")
let lengthCheck = document.getElementById("length")
let caseCheck = document.getElementById("upper")

function validate() {
    let password = document.getElementById("pass").value
    let containsUpper = false
    let containsNumber = false

    if (password.length > 8) {
        lengthCheck.style.color = "green";
    } else {
        lengthCheck.style.color = "red";
    }

    for (let x = 0; x < password.length; x++) {
        if (containsUpper == false) { // Numbers would Invalidate On 2nd Run
            if (password[x] == password[x].toUpperCase()) {
                containsUpper = true
                if (password[x] >= 0 && password[x] <= 9) {
                    containsUpper = false
                }
            }
        }
        if (password[x] >= 0 && password[x] <= 9) {
            containsNumber = true;
        }
    } 

    if (containsNumber == true) {
        numberCheck.style.color = "green";
    } else {
        numberCheck.style.color = "red";
    }

    if (containsUpper == true) {
        caseCheck.style.color = "green";
    } else {
        caseCheck.style.color = "red";
    }

    if (containsUpper == true && containsNumber == true && password.length > 8) {
        passValid = true
    } else {
        passValid = false
    }
}

function validateEmail() {
    let email = document.getElementById("eaddress").value
    let containsAt = false

    for (let y = 0; y < email.length; y++) {
        if (email[y] == "@") {
            containsAt = true
        }
    }

    if (containsAt == true) {
        document.getElementById("eaddress").style.color = "green";
        emailValid = true
    } else {
        document.getElementById("eaddress").style.color = "red";
        emailValid = false
    }
}

function numberNumbeic(ccNum) {
    if (+ccNum === +ccNum) {
        return true
    } else {
        return false
    }
}

function sortNumbeic(sort) {
    if (+sort === +sort) {
        return true
    } else {
        return false
    }
}

function emailPassValid() {
    if (passValid == false) {
        document.getElementById('passCheck').style.opacity = '1'
        numberCheck.style.color = 'red'
        lengthCheck.style.color = 'red'
        caseCheck.style.color = 'red'
    } else {
        document.getElementById('passCheck').style.opacity = '0'
        numberCheck.style.color = 'red'
        lengthCheck.style.color = 'red'
        caseCheck.style.color = 'red'
    }
    if (emailValid == false) {
        document.getElementById('emCheck').style.opacity = '1'
    } else {
        document.getElementById('emCheck').style.opacity = '0'
    }
}

function infoValid(accNumber, sortNumber) {
    if (accNumber == false) {
        document.getElementById('numCheck').style.opacity = '1'
    } else {
        document.getElementById('numCheck').style.opacity = '0'
    }
    if (sortNumber == false) {
        document.getElementById('sortCheck').style.opacity = '1'
    } else {
        document.getElementById('sortCheck').style.opacity = '0'
    }
}