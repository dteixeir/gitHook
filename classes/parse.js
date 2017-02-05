var slackbot = require('./slackbot');
var dal = require('./dal');

var parse = {
  checkList: (changedFiles) => {
    var users = {}; 
    
    changedFiles.forEach((element, i) => {
      dal.select({ file: element }).then((docs) => {
        
        docs.forEach((listItem) => {
          if (users.hasOwnProperty(listItem.fixer)) {
            users[listItem.fixer].push(element);
          } else {
            users[listItem.fixer] = [];
            users[listItem.fixer].push(element);
          }
        });

        if (i == changedFiles.length - 1) {
          parse.sendMessage(users);
        }

      });
    }); 
  },

  sendMessage: (users) => {
    for (var key in users) {
      if (users.hasOwnProperty(key)) {
        message = 'Please update your project, the follow files were changed in FrakWorx: \n';

        users[key].forEach((file) => {
          message = message + file + "\n";
        });

        slackbot.message(key, message);
      }
    }
  }
}

module.exports = parse;