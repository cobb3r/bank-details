require('dotenv').config();
const sgMail = require('@sendgrid/mail')
const sgKey = process.env.sg_api_key
sgMail.setApiKey(sgKey)

//import modulr from '@api/modulr';
//modulr.auth('process.env.md_api_key');

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

/*function verify(acc, sort, name) {
    modulr.createOutboundCop({
        accountType: 'PERSONAL',
        sortCode: sort,
        accountNumber: acc,
        name: name,
        paymentAccountId: process.env.acc_id
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        if (data.result.code == "MATCHED") {
            return true
        } else {
            return false
        }
    }).catch(function(error) {
         console.error(error)
    })
}
*/

module.exports.send = emails;
//module.exports.verify = verify;