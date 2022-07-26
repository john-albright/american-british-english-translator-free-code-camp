'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const locale = req.body.locale;
      const text = req.body.text;
      let targetAmerican;

      // Guard statements for incorrect input in the post request 
      if (!text) {
        return res.json({ error: "No text to translate" });
      }
      if (locale !== "british-to-american" || locale !== "american-to-british") {
        return res.json({ error: "Invalid value for locale field" });
      }

      // Assign a value for targetAmerican 
      // Now that locale must be either "british-to-american" or "american-to-british",
      // the variable targetAmerican will definitely have a value of true or false 
      if (locale === "british-to-american") targetAmerican = false;
      if (locale === "american-to-british") targetAmerican = true;

      // Guard statements for if all words are valid in the dialect
      if ((targetAmerican && translator.checkAmerican(text)) || (!targetAmerican && translator.checkBritish(text))) {
        return res.json({ translation: "Everything looks good to me" });
      }

      

    });
};
