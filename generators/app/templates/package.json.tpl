{
  "name": "<%= projectName %>",
  "private": true,
  "version": "0.0.0",
  "description": "AMP (Accelerate Mobile Page) project",
  "files": ["www"],
  "main": "index.js",
  "scripts": {
    "dev": "NODE_ENV=development gulp dev"<% if (webhook) { %>,
    "webhook": "node ./webhook.js"<% } %>
  },
  "dependencies": {},
  "devDependencies": {
    "autoprefixer": "^8.4.1",
    "cssnano": "^3.10.0",
    "config": "^1.30.0",
    <% if (webhook) { %>"git-webhook-ci": "^0.9.1",<% } %>
    "gulp-amphtml-validator": "^1.0.2",
    "gulp-clean": "^0.4.0",
    "gulp-postcss": "^7.0.1",
    "gulp-sass": "^4.0.1",
    "gulp-server-io": "^1.4.0-beta.11",
    "gulp-sourcemaps": "^2.6.4",
    "gulp-template": "^5.0.0"
  }
}
