const express = require('express') 
const app = express()
const port = 5000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('frontend'))

app.get('/success', function(req, res) {
    try {
        res.render('success.ejs')
    }catch(error) {
        res.status(500).end()
    }
})

app.listen(port, function(error) {
    if (error) {
        console.log("Something Went Wrong", error)
    } else {
        console.log("Server is listening on port " + port)
    }
});