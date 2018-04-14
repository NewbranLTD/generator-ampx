'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the funkadelic ' + chalk.red('generator-ampx') + ' generator!')
    );
    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: `What's your project name`,
        default: path.basename(process.cwd())
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Copy app / config / tasks folders
    ['app', 'config', 'tasks'].forEach(dir => {
      this.fs.copy(this.templatePath(dir), this.destinationPath(dir));
    });
    // Copy gulpfile.js
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    // @TODO copy some of our files to the destination folder
    // Const base = join(__dirname, '..', '..');
    // Construct the package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  }

  install() {
    // This.installDependencies();
  }
};
