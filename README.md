# [American British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator)

This project is the second of five projects completed for FreeCodeCamp's sixth (final JavaScript) certificate: [Quality Assurance](https://www.freecodecamp.org/learn/quality-assurance/). The Issue Tracker's [assignment instructions](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator) and [starter code on GitHub](https://github.com/freeCodeCamp/boilerplate-project-american-british-english-translator/) were provided by FreeCodeCamp. A live demo of the project can be found on [Replit](https://replit.com/@john-albright/american-british-translator-free-code-camp).

The application was created with Express.js (a Node.js framework) to translate texts between two dialects of the English language: American and British. The application has one route /api/translate that only accepts POST requests. The front end sends the POST request after the locale is selected (either British to American or American to British) and the translate button is pressed. The translation will be shown in the div to the right of the text box if all information is provided and the sentence can be translated. Specific dialectal vocabulary is translated, e.g. pram (US) -- baby carriage (UK), mobile (UK) -- cellphone (US), etc. 

Twenty four unit tests were written to test the Translator class. Eight functional tests were written using Chai.js HTTP requests to test the single route's functionality and json responses generated. The Translator class uses functional programming with arrays, notably the some() and reduce() functions, in conjunction with regular expressions to parse the strings sent to the /api/translate route. The dictionaries (JavaScript objtects) american-only.js, british-only.js, american-to-british-spelling.js, and british-only.js were provided in the components folder by Free Code Camp to help parse the strings. 