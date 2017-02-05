var Bot = require('slackbots');
var Slack = require('node-slack-upload');
var users = [];
var config = require('../config.json');

var bot = {
  message: (body, message) => {
    var obj = new Bot({
      token: (process.env.UPLOAD_KEY || config.UPLOAD_KEY),
      name: 'test'
    });

    obj.on('start', () => {
      obj.postMessageToUser("dteixeira", message);
    });
  }
}

module.exports = bot;
