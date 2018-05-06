'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

// Const ncu = require('npm-check-updates');
const { spawn } = require('child_process');
const env = Object.assign({}, process.env);

module.exports = class extends Generator {
  // Start
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
      /* {
        type: 'confirm',
        name: 'upgrade',
        message: 'Run upgrade check at the end?',
        default: false
      }, */
      {
        type: 'confirm',
        name: 'webhook',
        message: 'Would you like to use a webhook?',
        default: false
      },
      {
        type: 'list',
        name: 'gitProvider',
        message: 'Select your git provider',
        choices: ['github', 'gitlab', 'gitee'],
        default: 'github',
        when: answers => {
          return answers.webhook;
        }
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
    // @to1source add gitignore
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    // Copy gulpfile.js
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    // @TODO copy some of our files to the destination folder
    // Const base = join(__dirname, '..', '..');
    // First need to check if there is already a package.json file
    // Then decided if we want to merge or create a new one
    const packageJson = this.destinationPath('package.json');
    if (this.fs.existsSync(packageJson)) {
      console.log('There is already a package.json file');
      try {
        const ejs = require('ejs');
        const json = ejs.compile(
          this.fs.read(this.templatePath('package.json.tpl')),
          this.props
        );
        // Merge the content
        const existedJson = this.fs.readJSON(packageJson);
        this.fs.writeJSON(
          packageJson,
          Object.assign({}, existedJson, { dependencies: json.dependencies })
        );
      } catch (e) {
        throw new Error('Can not include ejs to compile template in memory');
      }
    } else {
      this.fs.copyTpl(
        this.templatePath('package.json.tpl'),
        this.destinationPath('package.json'),
        this.props
      );
    }
    // Create a webhook or not
    if (this.props.webhook) {
      this.fs.copyTpl(
        this.templatePath('webhook.js'),
        this.destinationPath('webhook.js'),
        this.props
      );
    }
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    const options = {
      cwd: this.destinationRoot(),
      env: env
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
};
