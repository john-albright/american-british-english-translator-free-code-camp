const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    // #1 Translation with text and locale fields: POST request to /api/translate
    test("#1 Translation with text and locale fields", function(done) {
        chai
        .request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite food.",
            locale: "american-to-british"
        })
        .end(function(err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.equal(res.type, 'application/json', 'Response should be of type json');
            assert.equal(res.body.translation, "Mangoes are my <span class='highlight'>favourite</span> food.");
            assert.equal(res.body.text, "Mangoes are my favorite food.");
            done();
        });
    });

    // #2 Translation with text and invalid locale field: POST request to /api/translate
    test("#2 Translation with text and invalid locale fields", function(done) {
        chai
        .request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite food.",
            locale: "no-way-Jose"
        })
        .end(function(err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.equal(res.type, 'application/json', 'Response should be of type json');
            assert.equal(res.body.error, "Invalid value for locale field");
            done();
        });
    });

    // #3 Translation with missing text field: POST request to /api/translate
    test("#3 Translation with missing text field", function(done) {
        chai
        .request(server)
        .post('/api/translate')
        .send({
            locale: "american-to-british"
        })
        .end(function(err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.equal(res.type, 'application/json', 'Response should be of type json');
            assert.equal(res.body.error, "Required field(s) missing");
            done();
        });
    });

    // #4 Translation with missing locale field: POST request to /api/translate
    test("#4 Translation with missing locale field", function(done) {
        chai
        .request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite food."
        })
        .end(function(err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.equal(res.type, 'application/json', 'Response should be of type json');
            assert.equal(res.body.error, "Required field(s) missing");
            done();
        });
    });

    // #5 Translation with empty text: POST request to /api/translate
    test("#5 Translation with empty text", function(done) {
        chai
        .request(server)
        .post('/api/translate?locale=british-to-american&text=')
        .end(function(err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.equal(res.type, 'application/json', 'Response should be of type json');
            assert.equal(res.body.error, "No text to translate");
            done();
        });
    });

    // #6 Translation with text that needs no translation: POST request to /api/translate
    test("#6 Translation with text that needs no translation", function(done) {
        chai
        .request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite food.",
            locale: "british-to-american"
        })
        .end(function(err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.equal(res.type, 'application/json', 'Response should be of type json');
            assert.equal(res.body.translation, "Everything looks good to me!");
            done();
        });
    });

});
