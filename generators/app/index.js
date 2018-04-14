'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const ncu = require('npm-check-updates');
const { spawn } = require('child_process');
const env = Object.assign({}, process.env);

module.exports = class extends Generator {
  _run() {
    const options = {
      cwd: process.cwd(),
      env
    };
    const p = spawn('gulp', ['dev'], options);
    p.stdout.on('data', data => {
      this.log(`stdout: ${data}`);
    });
    p.stderr.on('data', data => {
      this.log(`stderr: ${data}`);
    });
    p.on('close', code => {
      this.log(`spawn process finish with code: ${code}`);
    });
  }

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
      },
      {
        type: 'confirm',
        name: 'upgrade',
        message: 'Run upgrade check at the end?',
        default: true
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
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    if (this.props.upgrade === true) {
      ncu
        .run({
          packageFile: this.destinationPath('package.json'),
          silent: true,
          jsonUpgraded: true
        })
        .then(upgraded => {
          this.log('dependencies to upgrade:', upgraded);
          this._run();
        });
    } else {
      this._run();
    }
  }
};
