const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    // #1 Translation with text and locale fields: POST request to /api/translate

    // #2 Translation with text and invalid locale field: POST request to /api/translate

    // #3 Translation with missing text field: POST request to /api/translate

    // #4 Translation with missing locale field: POST request to /api/translate

    // #5 Translation with empty text: POST request to /api/translate
    
    // #6 Translation with text that needs no translation: POST request to /api/translate

});
