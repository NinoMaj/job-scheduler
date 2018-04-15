const { IncomingWebhook } = require('@slack/client');
// const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook('https://hooks.slack.com/services/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');

// Send simple text to the webhook channel
webhook.send('Hello there', (err, res) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Message sent: ', res);
  }
});
