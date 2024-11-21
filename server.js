const express = require('express') 
const app = express()
const port = 5000
const pool = require('./db')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('frontend'))

app.use(express.urlencoded({
    extended: true,
    parameterLimit: 4
}))

app.get('/success', function(req, res) {
    try {
        res.render('success.ejs')
    }catch(error) {
        res.status(500).end()
    }
})

app.post('/success', function(req, res) {
    console.log(req.body)
})

app.listen(port, function(error) {
    if (error) {
        console.log("Something Went Wrong", error)
    } else {
        console.log("Server is listening on port " + port)
    }
});