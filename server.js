const express = require('express') 
const app = express()
const port = 5000
const pool = require('./db')
const { sequelize, bank_information } = require('./sequelize/models')

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

app.post('/success', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank } = req.body
    try {
        const accountInfo = await bank_information.create({'name': accountName, 'number': accountNumber, 'sort': sortCode, 'bank': bank})
        return accountInfo
    } catch(error) {
        console.error(error)
        res.status(500).end()
    }
})

app.listen(port, async(error)=> {
    if (error) {
        console.log("Something Went Wrong", error)
    } else {
        console.log("Server is listening on port " + port)
        await sequelize.sync({ force: true })
    }
});