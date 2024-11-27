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
            message: "Successfully Logged In",
            p1: "Welcome Back to Example Fintech Company! We are thrilled to have you back. Your account is now unlocked, and your financial tools are ready to help you make progress toward your goals. Dive into your personalized dashboard to monitor your savings, track investments, or analyze spending habits. Stay in control with real-time updates and insights tailored just for you.",
            p2: "If youre exploring new features or need a refresher, our resources are just a click away, and our support team is always here to assist you. Lets keep building a brighter financial future together, one step at a time. Ready to take on today? Start where you left off or discover something new!",
            image: 'signin'
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/updated', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Successfully Updated Account Information",
            p1: "Your banking information has been updated! The changes you have made are now in effect, and your new details are securely stored in our system. This ensures that all future transactions, transfers, and linked services will use your updated account information seamlessly.",
            p2: "We are committed to keeping your financial data safe and secure, so rest assured that this process adheres to the highest industry standards for encryption and protection. If you need to review or adjust your settings, you can always access them through your profile or dashboard. Need help or have questions? Our team is here to provide support whenever you need it. Thank you for trusting Example Fintech Company with your financial management, we are here to make it easier for you to succeed.",
            image: "update"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/signup', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Successfully Signed Up",
            p1: "Congratulations on creating your account with Example Fintech Company! Youve just taken a significant step toward financial empowerment, and were here to help you every step of the way. Your account is now active, and you can begin exploring everything our platform has to offer—whether its smart savings tools, personalized investment insights, or advanced tracking features to stay on top of your finances.",
            p2: "Take a moment to complete your profile and connect your accounts for a fully customized experience. Our intuitive platform is designed to grow with you, offering insights that adapt as your goals evolve. Need help getting started? Visit our Help Center or reach out to our friendly support team. Welcome aboard—we are excited to partner with you on this journey to financial success!",
            image: "signup"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.get('/success/delete', function(req, res) {
    try {
        res.render('success.ejs', {
            message: "Your Account Has Been Deleted",
            p1: "We are sorry to see you go, but we respect your decision. Your account with Example Fintech Company has been permanently deleted, and all associated data has been securely removed from our system. Please note that any pending transactions or services linked to your account may no longer be processed.",
            p2: "If you change your mind, we would be happy to welcome you back in the future. In the meantime, if there is anything we can do to assist you or provide further clarification, dont hesitate to contact our support team. Thank you for giving us the opportunity to support your financial journey, and we wish you all the best moving forward.",
            image: "delete"
        })
    }catch(error) {
        res.status(500).end()
    }
})

app.post('/signin', async(req, res) => {
    const { eaddress, pass } = req.body
    try {
        const scanCompany = await company_information.findOne({ where: { 'email': eaddress }})
        if (scanCompany === null) {
            res.status(401).send({
                message: 'You Do Not Have An Account With Us Yet, Please Sign Up', 
                statusCode: 1, 
                success: false
            });
        } else {
            if (await bcrypt.compare(pass, scanCompany.password)) {
                mod.send(eaddress, 'Log In Successful', 'Successfully Logged In')
                res.status(201).send({
                    message: 'Success, Logged In',
                    statusCode: 2,
                    success: true 
                });
            } else {
                res.status(401).send({
                    message: 'Wrong Password',
                    statusCode: 3,
                    success: false 
                });
            }
        }
    } catch(error) {
        console.error(error)
        res.status(500).end()
    }
})

app.put('/updated', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    try {
        const account = await bank_information.findOne({ where: { 'email': eaddress }});
        const companyAccount = await company_information.findOne({ where: { 'email': eaddress }});
        if (account === null || companyAccount === null) {
            res.status(401).send({
                message: 'You Do Not Have An Account With Us Yet, Please Sign Up', 
                statusCode: 1, 
                success: false
            });
        } else {
            if (await bcrypt.compare(pass, companyAccount.password)) {
                if (new UkModulusChecking({ accountNumber, sortCode }).isValid() === true /*&& mod.verify(accountNumber, sortCode, accountName) == true */) {
                    const hashedNumber = await bcrypt.hashSync(accountNumber, 10);
                    const hashedSort = await bcrypt.hashSync(sortCode, 10);
                    account.name = accountName
                    account.number = hashedNumber
                    account.sort = hashedSort
                    account.bank = bank
                    await account.save()
                    mod.send(eaddress, 'Account Information Update', 'Successfully Updated Account Information')
                        res.status(201).send({
                            message: 'Account Credentials Updated Succesfully',
                            statusCode: 4,
                            success: true 
                        });
                } else {
                        res.status(401).send({
                            message: 'Invalid Bank Information',
                            statusCode: 8,
                            success: false 
                        });
                }
            } else {
                res.status(401).send({
                    message: 'Wrong Password',
                    statusCode: 3,
                    success: false 
                });
            }
        }
    } catch(error) {
        console.error(error)
        res.status(500).end()
    }
})

app.post('/signup', async(req, res) => {
    const { accountName, accountNumber, sortCode, bank, eaddress, pass } = req.body
    try {
        const scanCompany = await company_information.findOne({where: { email: eaddress }})
        if (scanCompany === null) {
            if (new UkModulusChecking({ accountNumber, sortCode }).isValid() === true /*&& mod.verify(accountNumber, sortCode, accountName) == true */) {
                const hashedPassword = await bcrypt.hashSync(pass, 10);
                const hashedNumber = await bcrypt.hashSync(accountNumber, 10);
                const hashedSort = await bcrypt.hashSync(sortCode, 10);
                await company_information.create({'email': eaddress, 'password': hashedPassword })
                const company = await company_information.findOne({ where: {'email': eaddress} })
                await bank_information.create({'companyId': company.companyId,'email': eaddress,'name': accountName, 'number': hashedNumber, 'sort': hashedSort, 'bank': bank})
                mod.send(eaddress, 'Sign Up Complete', 'All Signed Up!')
                res.status(201).send({
                    message: 'Successfully Signed Up',
                    statusCode: 5,
                    success: true
                });
            } else {
                res.status(401).send({
                    message: 'Invalid Bank Information',
                    statusCode: 8,
                    success: false 
                });
            }
        } else {
            res.status(401).send({
                message: 'You Already Have An Account With Us, Please Sign In',
                statusCode: 6,
                success: false 
            });
        }
    } catch(error) {
        console.error(error)
        res.status(500).end()
    }
})

app.delete('/delete', async(req, res) => {
    const { eaddress, pass } = req.body
    try {
        const scanBank = await bank_information.findOne({ where: { 'email': eaddress,}})
        const scanCompany = await company_information.findOne({ where: { 'email': eaddress,}})
        if (scanCompany === null && scanBank === null) {
            res.status(401).send({
                message: 'You Do Not Have An Account With Us Yet, Please Sign Up', 
                statusCode: 1, 
                success: false
            });
        } else {
            if (await bcrypt.compare(pass, scanCompany.password)) {
                await scanBank.destroy()
                await scanCompany.destroy()
                mod.send(eaddress, 'Account Deleted', 'Successfully Deleted Account')
                res.status(200).send({
                    message: 'Successfully Deleted Account',
                    statusCode: 7,
                    success: true 
                });
            } else {
                res.status(401).send({
                    message: 'Wrong Password',
                    statusCode: 3,
                    success: false 
                });
            }
        }
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
        await sequelize.authenticate()
    }
});