const ENVIRONMENT = require('./environments');
const BASE_URL = require('./base-urls');

/** Checks if "env=" is available on cli arguments
    If not, returns Dev baseUrl as default
 */
const env_arg = process.argv.find( arg => {
    return arg.match(/env/)
    // return argument if it matches string `env`
});

switch (env_arg) {
    case ENVIRONMENT.BASE + ENVIRONMENT.UITESTING:
        baseUrl = BASE_URL.UITESTING;
        break;
    default:
        baseUrl = BASE_URL.UITESTING;
        console.log('Base URL not defined or arg is incorrect')
        break;
}

const environment_parameters = {
    UITESTING: {
        username: 'test@email.com',
        password: 'pwd',
    }
};

/** Checks if the value after "env=" on cli arguments matches
    any environment in environments.js file. Then returns the 
    parameters based on the environment
    If not, returns Dev parameters as default
 */
switch (env_arg) {
    case ENVIRONMENT.BASE + ENVIRONMENT.UITESTING:
        parameters = environment_parameters.UITESTING;
        break;
    default:
        parameters = environment_parameters.UITESTING;
        console.log("Using default parameters")
        break;
}


module.exports = {env_arg, baseUrl, parameters};