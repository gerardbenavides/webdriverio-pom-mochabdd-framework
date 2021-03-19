const LoginPage = require('../../pages/auth/login.page')
const LandingPage = require('../../pages/auth/landing.page')
const parameters = require('../../../environments/environment-variables').parameters

describe('Test login page', () => {
    it('Should navigate to login page', () => {
        LoginPage.open()
        LandingPage.menuSampleApp.click()
    })
    it('Should fail login', () => {
        LoginPage.login(parameters.username, "incorrecpassword~")
        browser.pause(1000)
    })
    it('Should login successfully', () => {
        LoginPage.login(parameters.username, parameters.password)
        browser.pause(1000)
    })
})
