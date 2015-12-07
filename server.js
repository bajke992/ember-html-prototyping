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
    app.use(express.static(path.join(application_root, "/app")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

var Schema = mongoose.Schema;

var Screens = new Schema({
    name: String,
    elements: []
});

var Project = new Schema({
    name: { type: String, required: true },
    screens: [Screens]
});



var ProjectModel = mongoose.model('Project', Project);

/**
 * Landing action for the api
 */
app.get('/api', function (req, res) {
    res.send('Proto API is running');
});

/**
 * Get all projects
 */
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

    project = new ProjectModel({
        name: req.body.name,
        screens: req.body.screens
    });

    project.save(function (err, p) {
        if (!err) {
            return console.log('created');
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
        project.screens = req.body.screens;

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
