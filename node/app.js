var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose');

var app = express();

// Database

mongoose.connect('mongodb://localhost/proto_database');

// Config

app.set('port', process.env.VCAP_APP_PORT || 3000);

app.configure(function () {
    //app.engine('html', require('ejs').renderFile);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "../app")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

var Schema = mongoose.Schema;

var Project = new Schema({
    name: { type: String, required: true },
    elements: { type: [], required: false }
});


var ProjectModel = mongoose.model('Project', Project);

app.get('/api', function (req, res) {
    res.send('Proto API is running');
});

app.get('/api/projects', function (req, res) {

    return ProjectModel.find(function (err, projects) {
        if (!err) {
            return res.send(projects);
        } else {
            return console.log(err);
        }
    });

});

app.post('/api/projects', function (req, res) {

    var project;

    console.log("POST: ");
    console.log(req.body);

    project = new ProjectModel({
        name: req.body.name,
        elements: req.body.elements
    });

    project.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });

    return res.send(project);
});

app.get('/api/projects/:id', function (req, res) {

    return ProjectModel.findById(req.params.id, function (err, project) {
        if (!err) {
            return res.send(project);
        } else {
            return console.log(err);
        }
    });

});

app.put('/api/projects/:id', function (req, res) {

    return ProjectModel.findById(req.params.id, function (err, project) {

        project.name = req.body.name;
        project.elements = req.body.elements;

        return project.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(project);
        });
    });
});

app.delete('/api/projects/:id', function (req, res) {

    return ProjectModel.findById(req.params.id, function (err, project) {

        return project.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });

    });

});

// Launch

//module.exports = app;

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});