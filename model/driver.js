var ObjectID = require('mongodb').ObjectID;

model = function(db) {
  this.db = db;
};

model.prototype.getCollection = function(collectionName, callback) {
  this.db.collection(collectionName, function(error, the_collection) {
    if( error ) callback(error);
    else callback(null, the_collection);
  });
};

model.prototype.getByName = function(collectionName, name, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
          console.log(new RegExp("/"+name+"/"));
            the_collection.findOne({'name':new RegExp("/"+name+"/")}, function(error,doc) { //C
              console.log(error);
              console.log(doc);
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};
exports.model = model;
