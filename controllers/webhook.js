var parse = require('../classes/parse');
var dal = require('../classes/dal');

module.exports = function (app, route) {
  app.post("/webhook", (req, res, next) => {
    try {
      if (!req.body.message instanceof Array) {
        res.status(400).send();
      } else {
        parse.checkList(req.body.message);
        res.send({ status: 200 });
      }
    } catch (err) {
      res.status(400).send();
    }
  });

  app.post("/webhook/add", (req, res, next) => {
    if (req.body.username && req.body.file && req.body.message) {
      dal.insert(req.body).then((docs) => {
        res.send(docs);
      });
    } else {
      res.status(400).send();
    }
  });

  app.get("/webhook/file/:name?", (req, res, next) => {
    var filter = { file: req.params.name } || {};

    dal.select(filter).then((docs) => {
      res.send(docs);
    });
  });

  app.get("/webhook/username/:name?", (req, res, next) => {
    filter = { username: req.params.name } || {};

    dal.select(filter).then((docs) => {
      res.send(docs);
    });
  });

  // Return middleware ?? per use case stuff?
  return function(req, res, next) {
      next();
  };
};