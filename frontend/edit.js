const form = document.getElementById("form")

form.addEventListener('submit', function(submitted) {
    submitted.preventDefault();
    const fData = new FormData(form);
    const encodedData = new URLSearchParams(fData).toString()
    fetch('http://localhost:5000/success/updated', {
        method: "PUT",
        body: encodedData,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        }
    })
    form.reset()
    window.location.replace("/success/updated");
});