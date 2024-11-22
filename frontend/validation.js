function validate() {
    let password = document.getElementById("pass").value
    let containsUpper = false
    let containsNumber = false

    if (password.length > 8) {
        document.getElementById("length").style.color = "green";
    } else {
        document.getElementById("length").style.color = "red";
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
        document.getElementById("number").style.color = "green";
    } else {
        document.getElementById("number").style.color = "red";
    }

    if (containsUpper == true) {
        document.getElementById("upper").style.color = "green";
    } else {
        document.getElementById("upper").style.color = "red";
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
    } else {
        document.getElementById("eaddress").style.color = "red";
    }
}