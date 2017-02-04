var Bot = require('slackbots');
var Slack = require('node-slack-upload');
var users = [];

if (process.env) {
  var config = require('../config.json');
}

var bot = {
  message: function (body, message) {
    var obj = new Bot({
      token: (process.env.UPLOAD_KEY || config.UPLOAD_KEY),
      name: 'test'
    });

    obj.on('start', function () {
      obj.postMessageToUser("dteixeira", JSON.parse(message));
    });
  },

  addUser: function (username) {
    if (username) {
      users.push(username);
      return true;
    }
    else
      return false;
  },

  removeUser: function (username) {
    if (username) {
      var i = users.indexOf(username);
      if(i != -1) {
        users.splice(i, 1);
        return true;
      }
    }

    return false;
  },

  getUsers: function () {
    return users;
  }
}

  // snippet: function(headers, body) {
  //   var deferred = Q.defer();

  //   for (var k = 0; k < users.length; k++) {
  //     slack.uploadFile({
  //       content: [headers, body],
  //       filetype: 'JavaScript/JSON',
  //       filename: 'webhook.json',
  //       title: 'WebHook',
  //       channels: '@' + users[k]
  //     }, function(error) {
  //       if (error) {
  //         deferred.reject(err);
  //       } else {
  //         deferred.resolve();
  //       }
  //     });

  //     return deferred.promise;
  //   }
  // },

module.exports = bot;
