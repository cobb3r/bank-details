const express = require('express') 
const app = express()
const port = 5000
const pool = require('./db')
const { sequelize, bank_information, company_information } = require('./sequelize/models')
const { where } = require('sequelize')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('frontend'))

app.use(express.urlencoded({
    extended: true,
    parameterLimit: 6
}))

app.get('/success/signup', function(req, res) {
    try {
        res.render('success.ejs')
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/updated', function(req, res) {
    try {
        res.render('success.ejs')
    }catch(error) {
        res.status(500).end()
    }
})

app.put('/success/updated', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    try {
        const account = await bank_information.findOne({ where: { 'email': eaddress }});
        const companyAccount = await company_information.findOne({
            where: {
                'email': eaddress,
                'password': pass
            }
        });
        if (account === null || companyAccount === null) {
            console.log("No Account Found, Sign Up Now")
        } else {
            console.log("Found Bank")
            account.name = accountName
            account.number = accountNumber
            account.sort = sortCode
            account.bank = bank
            await account.save()
            return res.json(account)
        }
    } catch(error) {
        console.error(error)
        res.status(500).end()
    }
})

app.post('/success/signup', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    const scanCompany = await company_information.findOne({where: { email: eaddress }})
    if (scanCompany === null) {
        try {
            const companyInfo = await company_information.create({'email': eaddress, 'password': pass })
            const company = await company_information.findOne({ where: {'email': eaddress} })
            const accountInfo = await bank_information.create({'companyId': company.companyId,'email': eaddress,'name': accountName, 'number': accountNumber, 'sort': sortCode, 'bank': bank})
            return companyInfo, accountInfo
        } catch(error) {
            console.error(error)
            res.status(500).end()
        }
    } else {
        console.log("You Already Have an Account With Us")
    }
})

app.listen(port, async(error)=> {
    if (error) {
        console.log("Something Went Wrong", error)
    } else {
        console.log("Server is listening on port " + port)
        await sequelize.authenticate()
    }
});