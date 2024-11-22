const express = require('express') 
const app = express()
const port = 5000
const pool = require('./db')
const bcrypt = require('bcryptjs')
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

app.post('/success/signin', async(req, res) => {
    const { eaddress, pass } = req.body
    console.log(pass)
    const scanCompany = await company_information.findOne({
        where: {
            'email': eaddress,
        }
    })
    if (scanCompany === null) {
        console.log("You Do Not Have An Account With Us Yet, Please Sign Up")
    } else {
        if (await bcrypt.compare(pass, scanCompany.password)) {
            console.log("Success")
        } else {
            console.log("Wrong Password")
        }
    }
})

app.put('/success/updated', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    try {
        const account = await bank_information.findOne({ where: { 'email': eaddress }});
        const companyAccount = await company_information.findOne({ where: { 'email': eaddress,}});
        if (account === null || companyAccount === null) {
            console.log("No Account Found, Sign Up Now")
        } else {
            if (await bcrypt.compare(pass, companyAccount.password)) {
                console.log("Success")
                account.name = accountName
                account.number = accountNumber
                account.sort = sortCode
                account.bank = bank
                await account.save()
                return res.json(account)
            } else {
                console.log("Wrong Password")
            }
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
            const hashedPassword = await bcrypt.hashSync(pass, 10);
            const companyInfo = await company_information.create({'email': eaddress, 'password': hashedPassword })
            const company = await company_information.findOne({ where: {'email': eaddress} })
            const accountInfo = await bank_information.create({'companyId': company.companyId,'email': eaddress,'name': accountName, 'number': accountNumber, 'sort': sortCode, 'bank': bank})
            res.json({ message: 'Successfully purchased' })
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