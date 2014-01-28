Proto.Router.map(function () {

    this.resource('run', function (){});

    this.resource('editor', { path: '/editor' }, function() {
        this.resource('screen', { path: 'screen/:screen_id' });
    });

    //this.route('editor');
});
