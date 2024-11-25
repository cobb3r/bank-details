function resolve(message, status, valid) {
    switch(status) {
        case 1:
            //No Account
            //Email Displayed, Password Not
            document.getElementById('emCheck').innerHTML = message;
            document.getElementById('emCheck').style.opacity = "1"
            document.getElementById('passCheck').style.opacity = "0"
            if (document.getElementById('numCheck') !== null) {
                document.getElementById('numCheck').style.opacity = "0"
                document.getElementById('sortCheck').style.opacity = "0"
            }
            numberCheck.style.color = 'red'
            lengthCheck.style.color = 'red'
            caseCheck.style.color = 'red'
            break;
        case 2:
            //Logged In
            window.location.replace("/success/signin");
            break;
        case 3:
            //Wrong Password
            document.getElementById('passCheck').innerHTML = message;
            document.getElementById('passCheck').style.opacity = "1"
            document.getElementById('emCheck').style.opacity = "0"
            //Would be good to have this showing if password not valid and info wrong
            if (document.getElementById('numCheck') !== null) {
                document.getElementById('numCheck').style.opacity = "0"
                document.getElementById('sortCheck').style.opacity = "0"
            }
            numberCheck.style.color = 'red'
            lengthCheck.style.color = 'red'
            caseCheck.style.color = 'red'
            break;
        case 4:
            //Account Info Updated
            window.location.replace("/success/updated");
            break;
        case 5:
            //Signed Up
            window.location.replace("/success/signup");
            break;
        case 6:
            //Already Have an Account
            document.getElementById('emCheck').innerHTML = message;
            document.getElementById('emCheck').style.opacity = "1"
            document.getElementById('passCheck').style.opacity = "0"
            document.getElementById('numCheck').style.opacity = "0"
            document.getElementById('sortCheck').style.opacity = "0"
            numberCheck.style.color = 'red'
            lengthCheck.style.color = 'red'
            caseCheck.style.color = 'red'
            break;
        case 7:
            //Delete Account
            window.location.replace("/success/delete")
            break;
        case 8:
            //Invalid Bank Information
            document.getElementById('sortCheck').innerHTML = message;
            document.getElementById('sortCheck').style.opacity = 1;
            document.getElementById('passCheck').style.opacity = 0;
            document.getElementById('emCheck').style.opacity = 0;
            numberCheck.style.color = 'red'
            lengthCheck.style.color = 'red'
            caseCheck.style.color = 'red'
            break;
    }
}