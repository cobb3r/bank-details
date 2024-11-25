require('dotenv').config();

const express = require('express') 
const app = express()
const port = 5000
const pool = require('./db')
const mod = require('./modules')
const bcrypt = require('bcryptjs')
const { sequelize, bank_information, company_information } = require('./sequelize/models')
const { where } = require('sequelize')
const UkModulusChecking = require('uk-modulus-checking')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('frontend'))

app.use(express.urlencoded({
    extended: true,
    parameterLimit: 6
}))

app.get('/success/signin', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Successfully Logged In"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/updated', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Successfully Updated Account Information"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/signup', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Successfully Signed Up"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/delete', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Successfully Deleted Account"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.post('/signin', async(req, res) => {
    const { eaddress, pass } = req.body
    const scanCompany = await company_information.findOne({ where: { 'email': eaddress }})
    if (scanCompany === null) {
        res.json(
            { 
                message: 'You Do Not Have An Account With Us Yet, Please Sign Up', 
                statusCode: 1, 
                success: false
            });
    } else {
        if (await bcrypt.compare(pass, scanCompany.password)) {
            mod.send(eaddress, 'Log In Successful', 'Successfully Logged In')
            res.json(
                { 
                    message: 'Success, Logged In',
                    statusCode: 2,
                    success: true 
                })
        } else {
            res.json(
                { 
                    message: 'Wrong Password',
                    statusCode: 3,
                    success: false 
                })
        }
    }
})

app.put('/updated', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    try {
        const account = await bank_information.findOne({ where: { 'email': eaddress }});
        const companyAccount = await company_information.findOne({ where: { 'email': eaddress }});
        if (account === null || companyAccount === null) {
            res.json(
                { 
                    message: 'You Do Not Have An Account With Us Yet, Please Sign Up',
                    statusCode: 1,
                    success: false 
                })
        } else {
            if (await bcrypt.compare(pass, companyAccount.password)) {
                if (new UkModulusChecking({ accountNumber, sortCode }).isValid() === true) {
                    const hashedNumber = await bcrypt.hashSync(accountNumber, 10);
                    const hashedSort = await bcrypt.hashSync(sortCode, 10);
                    account.name = accountName
                    account.number = hashedNumber
                    account.sort = hashedSort
                    account.bank = bank
                    await account.save()
                    mod.send(eaddress, 'Account Information Update', 'Successfully Updated Account Information')
                    res.json(
                        { 
                            message: 'Account Credentials Updated Succesfully',
                            statusCode: 4,
                            success: true 
                        })
                } else {
                    res.json(
                        { 
                            message: 'Invalid Bank Information',
                            statusCode: 8,
                            success: false 
                        })
                }
            } else {
                res.json(
                    { 
                        message: 'Wrong Password',
                        statusCode: 3,
                        success: false 
                    })
            }
        }
    } catch(error) {
        console.error(error)
        res.status(500).end()
    }
})

app.post('/signup', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    const scanCompany = await company_information.findOne({where: { email: eaddress }})
    if (scanCompany === null) {
        try {
            if (new UkModulusChecking({ accountNumber, sortCode }).isValid() === true) {
                const hashedPassword = await bcrypt.hashSync(pass, 10);
                const hashedNumber = await bcrypt.hashSync(accountNumber, 10);
                const hashedSort = await bcrypt.hashSync(sortCode, 10);
                /*const companyInfo =*/ await company_information.create({'email': eaddress, 'password': hashedPassword })
                const company = await company_information.findOne({ where: {'email': eaddress} })
                /*const accountInfo =*/await bank_information.create({'companyId': company.companyId,'email': eaddress,'name': accountName, 'number': hashedNumber, 'sort': hashedSort, 'bank': bank})
                mod.send(eaddress, 'Sign Up Complete', 'All Signed Up!')
                res.json(
                    { 
                        message: 'Successfully Signed Up',
                        statusCode: 5,
                        success: true
                    })
            } else {
                res.json(
                    { 
                        message: 'Invalid Bank Information',
                        statusCode: 8,
                        success: false 
                    })
            }
        } catch(error) {
            console.error(error)
            res.status(500).end()
        }
    } else {
        res.json(
            { 
                message: 'You Already Have An Account With Us, Please Sign In',
                statusCode: 6,
                success: false 
            })
    }
})

app.delete('/delete', async(req, res) => {
    const { eaddress, pass } = req.body
    const scanBank = await bank_information.findOne({ where: { 'email': eaddress,}})
    const scanCompany = await company_information.findOne({ where: { 'email': eaddress,}})
    if (scanCompany === null && scanBank === null) {
        res.json(
            { 
                message: 'You Do Not Have An Account With Us Yet, Please Sign Up', 
                statusCode: 1,
                success: false
            });
    } else {
        if (await bcrypt.compare(pass, scanCompany.password)) {
            await scanBank.destroy()
            await scanCompany.destroy()
            mod.send(eaddress, 'Account Deleted', 'Successfully Deleted Account')
            res.json(
                { 
                    message: 'Successfully Deleted Account',
                    statusCode: 7,
                    success: true 
                })
        } else {
            res.json(
                { 
                    message: 'Wrong Password',
                    statusCode: 3,
                    success: false 
                })
        }
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