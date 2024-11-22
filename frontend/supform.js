const form = document.getElementById("form")

form.addEventListener('submit', function(submitted) {
    submitted.preventDefault();
    const fData = new FormData(form);
    const encodedData = new URLSearchParams(fData).toString()
    form.reset()
    fetch('http://localhost:5000/success/signup', {
        method: "POST",
        body: encodedData,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        }
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        alert(data.message)
    }).catch(function(error) {
        console.error(error)
    })
});