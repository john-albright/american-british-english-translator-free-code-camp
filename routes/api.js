'use strict';

const Translator = require('../components/translator.js');
const americanOnly = require('../components/american-only.js');
const britishOnly = require('../components/british-only.js')

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const locale = req.body.locale || req.query.locale;
      const text = req.body.text || req.query.text;
      //console.log(locale, text);
      //console.log("type of text: ", typeof text);

      let targetAmerican;

      // Guard statements for incorrect input in the post request 
      if (text == undefined || locale == undefined) {
        return res.json({ error: "Required field(s) missing" });
      }
      if (typeof text === "string" && text.length === 0) {
        return res.json({ error: "No text to translate" });
      }
      if (locale !== "british-to-american" && locale !== "american-to-british") {
        return res.json({ error: "Invalid value for locale field" });
      }

      // Assign a value for targetAmerican 
      // Now that locale must be either "british-to-american" or "american-to-british",
      // the variable targetAmerican will definitely have a value of true or false 
      if (locale === "british-to-american") targetAmerican = true;
      if (locale === "american-to-british") targetAmerican = false;
      //console.log(targetAmerican);
      //console.log(translator.checkAmerican(translator.parseOutWords(text, americanOnly)));

      // Guard statements for if all words are valid in the dialect
      if (text.match(/^\s$/) || (targetAmerican && translator.checkAmerican(translator.parseOutWords(text, americanOnly))) || (!targetAmerican && translator.checkBritish(translator.parseOutWords(text, britishOnly)))) {
        return res.json({ translation: "Everything looks good to me!" });
      }

      //console.log(translator.translate(text, targetAmerican));

      return res.json({
        translation: translator.highlight(translator.translate(text, targetAmerican), targetAmerican),
        text: text
      });

    });
};
