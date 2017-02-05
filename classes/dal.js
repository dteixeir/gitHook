var dal = {
  select: (filter, sort) => {
    sort = sort || 0;
    var query = db.find(filter).sort({ file: 1 });
    
    return new Promise((resolve, reject) => {
      return query.exec((err, docs) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          resolve(docs);
        }
      });
    }); 
  },

  insert: (obj) => {
    return new Promise((resolve, reject) => {
      db.insert(obj, (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }  
}

module.exports = dal;