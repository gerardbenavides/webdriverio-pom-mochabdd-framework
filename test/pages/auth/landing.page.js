const Page = require('../page');

class LandingPage extends Page {

    get header () { return $('//h1')}
    get menuSampleApp () { return $('//h3//a[.="Sample App"]')}
    
    open () {
        return super.open('/');
    }

}

module.exports = new LandingPage();
