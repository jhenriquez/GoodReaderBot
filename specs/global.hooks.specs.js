/*
 * This module contains regular hooks for the mocha test runner, since they are loaded
 * before any of the other specs (because of the position of the file in the folder structure)
 * conventionally they serve as global before and after hooks.
 *
 * Behaviors that are expected to happen once before all other test start or after all tests are
 * run are good examples of code that belongs here.
 *
 */

/*
 * Load .env's preconfigured environment variables.
 */

before(function () {
  require('dotenv').config();
});


/*
 * Make chai's should API available.
 */

const chai = require('chai');

before(chai.should);
