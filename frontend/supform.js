const form = document.getElementById("form")

form.addEventListener('submit', function(submitted) {
    submitted.preventDefault();
    const fData = new FormData(form);
    const encodedData = new URLSearchParams(fData).toString()
    form.reset()
    if (passValid == true && numberNumbeic(form.accountNumber.value) && sortNumbeic(form.sortCode.value)) {
        fetch('http://localhost:5000/signup', {
            method: "POST",
            body: encodedData,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        }).then(function(res) {
            return res.json()
        }).then(function(data) {
            resolve(data.message, data.statusCode, data.success)
        }).catch(function(error) {
            console.error(error)
        })
    } else {
        passwordValid()
        infoValid(form.accountNumber.value, form.sortCode.value)
    }
});