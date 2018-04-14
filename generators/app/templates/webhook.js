/**
 * webhook file
 * Please check https://github.com/NewbranLTD/git-webhook-ci
 * for more information about it's configuration
 */
const gitWebhookCi = require('git-webhook-ci');

gitWebhookCi({
  provider: '<%= gitProvider %>',
  secret: 'YOU NEED TO UPDATE THIS!'
});
