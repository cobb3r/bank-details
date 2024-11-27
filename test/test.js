const modules = require('../server')
const feModules = require('../frontend/validation')
const {describe, it} = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')('http://localhost:5000');
/*
describe("Sign In Route", () => {
    it('Should Say You Do Not Have An Account Yet', async () => {
        let user = {
            eaddress: 'tylerannis131@gmail.com',
            pass: 'Toronto123'
        }

        await request
            .post('/signin')
            .send(user)
            .expect(401)
    });

    it('Should Log In', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Tyler1111'
        }

        await request
            .post('/signin')
            .send(user)
            .expect(201)
    });
    
    it('Should Say Wrong Password', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Toronto123'
        }

        await request
            .post('/signin')
            .send(user)
            .expect(401)
    });

    it('Should Throw a Server Error', async () => {
        let user = {
        }

        await request
            .post('/signin')
            .send(user)
            .expect(500)
    });
});

describe("Edit Information Route", () => {
    it('Should Say You Do Not Have An Account Yet', async () => {
        let user = {
            eaddress: 'tylerannis131@gmail.com',
            pass: 'Toronto123',
            accountName: "Tyler", 
            accountNumber: "11111111", 
            sortCode: "111111", 
            bank: "HSBC"
        }

        await request
            .put('/updated')
            .send(user)
            .expect(401)
    });

    it('Should Update Account Credentials', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Tyler1111',
            accountName: "Tyler", 
            accountNumber: "31510604", 
            sortCode: "100000", 
            bank: "Santander"
        }

        await request
            .put('/updated')
            .send(user)
            .expect(201)
    });

    it('Should Say Invalid Bank Information', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Tyler1111',
            accountName: "Tyler", 
            accountNumber: "11111111", 
            sortCode: "111111", 
            bank: "HSBC"
        }

        await request
            .put('/updated')
            .send(user)
            .expect(401)
    })
    
    it('Should Say Wrong Password', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Toronto123',
            accountName: "Tyler", 
            accountNumber: "11111111", 
            sortCode: "111111", 
            bank: "HSBC"
        }

        await request
            .put('/updated')
            .send(user)
            .expect(401)
    });

    it('Should Throw a Server Error', async () => {
        let user = {
        }

        await request
            .put('/updated')
            .send(user)
            .expect(500)
    });
});

describe("Sign Up Route", () => {
    it('Should Say Successfully Signed Up', async () => {
        let user = {
            eaddress: 'tylerannis131@gmail.com',
            pass: 'Toronto123',
            accountName: "Tyler", 
            accountNumber: "75849855", 
            sortCode: "200052", 
            bank: "Barclays"
        }

        await request
            .post('/signup')
            .send(user)
            .expect(201)
    });

    it('Should Say Invalid Bank Information', async () => {
        let user = {
            eaddress: 'tylerannis@manx.net',
            pass: 'Toronto123',
            accountName: "Tyler", 
            accountNumber: "11111111", 
            sortCode: "111111", 
            bank: "HSBC"
        }

        await request
            .post('/signup')
            .send(user)
            .expect(401)
    });
    
    it('Should Say You Already Have an Account', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Tyler1111',
            accountName: "Tyler", 
            accountNumber: "75849855", 
            sortCode: "200052", 
            bank: "Barclays"
        }

        await request
            .post('/signup')
            .send(user)
            .expect(401)
    });

    it('Should Throw a Server Error', async () => {
        let user = {
        }

        await request
            .post('/signup')
            .send(user)
            .expect(500)
    });
});

describe("Delete Account Route", () => {
    it('Should Say You Do Not Have An Account Yet', async () => {
        let user = {
            eaddress: 'tylerannis@manx.net',
            pass: 'Toronto123'
        }

        await request
            .delete('/delete')
            .send(user)
            .expect(401)
    });

    it('Should Say Successfully Deleted Account', async () => {
        let user = {
            eaddress: 'tylerannis131@gmail.com',
            pass: 'Toronto123'
        }

        await request
            .delete('/delete')
            .send(user)
            .expect(200)
    });
    
    it('Should Say Wrong Password', async () => {
        let user = {
            eaddress: 'tylerannis55@gmail.com',
            pass: 'Toronto123'
        }

        await request
            .delete('/delete')
            .send(user)
            .expect(401)
    });

    it('Should Throw a Server Error', async () => {
        let user = {
        }

        await request
            .delete('/delete')
            .send(user)
            .expect(500)
    });
});
*/