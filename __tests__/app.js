'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-ampx:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      projectName: 'test-project',
      upgrade: false
    });
  });

  it('creates files', () => {
    assert.file(['package.json']);
  });
});
