const Page = require('../page');

class LoginPage extends Page {

    get header () { return $('//h3[.="Sample App"]')}
    get inputUsername () { return $('//input[@name="UserName"]')}
    get inputPassword () { return $('//input[@type="password"]')}
    get btnLogin () { return $('//button[@id="login"]')}
    get msgLoginSuccess () { return $('//label[@class="text-success"]')}
    get msgLoginInvalid () { return $('//label[@class="text-danger"]')}

    
    login (username, password) {
        this.header.waitForDisplayed({timeout:10000});
        
        this.inputUsername.setValue(username)
        this.inputPassword.setValue(password)
        this.btnLogin.click()

        if(this.msgLoginSuccess.isDisplayed()) {
            expect(this.msgLoginSuccess).toHaveText("Welcome, " + username + "!")
        } else if (this.msgLoginInvalid.isDisplayed()){
            expect(this.msgLoginInvalid).toHaveText("Invalid username/password")
        }
        
    }
    
    open () {
        return super.open('/');
    }

}

module.exports = new LoginPage();
