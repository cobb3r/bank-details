require('dotenv').config();
const sgMail = require('@sendgrid/mail')
const sgKey = process.env.sg_api_key
sgMail.setApiKey(sgKey)

function emails(addr, subj, mess) {
    let email = {
        to: addr,
        from: 'tylerannis131@gmail.com',
        subject: subj,
        text: mess,
        html: '<h1>' + mess +'</h1>'
    }
    sgMail.send(email).then(response => console.log("Email Sent")).catch(error => console.log(error.message))
}

module.exports.send = emails;