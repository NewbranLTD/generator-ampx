'use strict';
// Debug codd
(function() {
  var childProcess = require('child_process');
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
    // Console.log('spawn called');
    // Console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
  }
  childProcess.spawn = mySpawn;
})();
// Regular code
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
let ctn = 0;
describe('generator-ampx:app', () => {
  beforeEach(() => {
    ++ctn;
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      projectName: 'test-project',
      webhook: ctn > 1
    });
  });

  test('it should creates files with upgrade:false, webhook:false', () => {
    assert.file(['package.json', 'gulpfile.js']);
  });

  test('it should generate a webhook.js file', () => {
    assert.file(['webhook.js']);
  });
});
