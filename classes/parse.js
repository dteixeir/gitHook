var slackbot = require('./slackbot');
var hitList = require('../hitList.json').hitList;

var parse = {
  checkList: function (changedFiles) {
    changedFiles.forEach(function (element) {
      hitList.forEach((listItem) => {
        if (listItem.file == element) {
          slackbot.message(listItem.fixer, JSON.stringify(element));
        }
      });
    }, this);
  }
}

module.exports = parse;