Proto.Router.map(function () {

    this.resource('run', function (){});

//    this.resource('index', { path: '/' });

    this.resource('editor', { path: '/project/:project_id' }, function() {
        this.resource('screen', { path: '/:screen_id' });
    });

});
