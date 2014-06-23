//1
var http = require('http'),
    querystring = require('querystring'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    baseModel = require('./model/basemodel'),
    app = express();
//especial Openshift params
app.set('port', 8080);
app.set('ipaddr', "127.0.0.1");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser())


var mongoHost = 'localhost'; //A
var mongoPort = 27017;
var dataCollection = [];
var db;
var baseCollection;
var mongoClient = new MongoClient(new Server(mongoHost, mongoPort)); //B
mongoClient.open(function (err, mongoClient) { //C
    if (!mongoClient) {
        console.error("Error! Exiting... Must start MongoDB first");
        process.exit(1); //D
    }
    db = mongoClient.db("testDB"); //E
    baseCollection = new baseModel.model(db);
});
function setCollection(req, res, next) { //A
    var params = req.params; //B
    var collectionName = req.params.collection;
    console.log(collectionName);
    try {
        var dataModel = require('./model/' + collectionName);
    } catch (e) {
        try {
            var dataModel = require('./model/baseModel');
        } catch (e) {
            res.send(404, {
                error: 'Model not found.',
                url: req.url
            });
        }
    }

    try {
        if (typeof dataModel.model == undefined) {
            throw new Error("Model data not found.");
        }
        dataCollection = new dataModel.model(db);
    } catch (e) {
        res.send(404, {
            error: e,
            url: req.url
        });
    }
    next();
}
app.all('/:collection', setCollection)
app.all('/:collection/*', setCollection)
app.get('/:collection', function (req, res) { //A
    var params = req.params; //B
    var thisCollection = dataCollection;
    if (!thisCollection.findAll) {
        thisCollection = baseCollection;
    }
    thisCollection.findAll(params.collection, function (error, objs) { //C
        if (error) {
            res.send(400, error);
        } //D
        else {
            console.log(objs);
            res.set('Content-Type', 'application/json'); //G
            res.send(200, objs); //H

        }
    });
});

app.get('/:collection/:entity', function (req, res) { //I
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {

        var thisCollection = dataCollection;
        if (!thisCollection.get) {
            thisCollection = baseCollection;
        }
        thisCollection.get(collection, entity, function (error, objs) { //J
            if (error) {
                res.send(400, error);
            } else {
                res.send(200, objs);
            } //K
        });
    } else {
        res.send(400, {
            error: 'bad url',
            url: req.url
        });
    }
});

app.post('/:collection', function (req, res) { //A
    var object = req.body;
    var collection = req.params.collection;
    var thisCollection = dataCollection;
    if (!thisCollection.save) {
        thisCollection = baseCollection;
    }
    thisCollection.save(collection, object, function (err, docs) {
        if (err) {
            res.send(400, err);
        } else {
            res.send(201, docs);
        } //B
    });
});

app.put('/:collection/:entity', function (req, res) { //A
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
        var thisCollection = dataCollection;
        if (!thisCollection.update) {
            thisCollection = baseCollection;
        }
        thisCollection.update(collection, req.body, entity, function (error, objs) { //B
            if (error) {
                res.send(400, error);
            } else {
                res.send(200, objs);
            } //C
        });
    } else {
        var error = {
            "message": "Cannot PUT a whole collection"
        };
        res.send(400, error);
    }
});

app.delete('/:collection/:entity', function (req, res) { //A
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
        var thisCollection = dataCollection;
        if (!thisCollection.delete) {
            thisCollection = baseCollection;
        }
        thisCollection.delete(collection, entity, function (error, objs) { //B
            if (error) {
                res.send(400, error);
            } else {
                res.send(200, objs);
            } //C 200 b/c includes the original doc
        });
    } else {
        var error = {
            "message": "Cannot DELETE a whole collection"
        };
        res.send(400, error);
    }
});



app.get('/:collection/searchbyname/:name', function (req, res) { //A
    var params = req.params;
    var name = params.name;
    var collection = params.collection;
    if (name) {
        var thisCollection = dataCollection;
        if (!thisCollection.getByName) {
            thisCollection = baseCollection;
        }
        thisCollection.getByName(collection, name, function (error, objs) { //B
            if (error) {
                res.send(400, error);
            } else {
                res.send(200, objs);
            } //C 200 b/c includes the original doc
        });
    } else {
        var error = {
            "message": "No Search Found."
        };
        res.send(400, error);
    }
});

app.use(function (req, res) { //1
    res.render('404', {
        url: req.url
    }); //2
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});