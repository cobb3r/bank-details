function resolve(message, status, valid) {
    switch(status) {
        case 1:
            //No Account 
            document.getElementById('emCheck').innerHTML = message;
            document.getElementById('emCheck').style.opacity = "1"
            break;
        case 2:
            //Logged In
            window.location.replace("/success/signin");
            break;
        case 3:
            //Wrong Password
            document.getElementById('passCheck').innerHTML = message;
            document.getElementById('passCheck').style.opacity = "1"
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
            break;
    }
}