Proto.Router.map(function () {
    this.resource('proto', {path: '/'});
    this.resource('maja');
    this.resource('run', function (){});
    this.resource('editor', function () {
        this.route('design');
        this.route('code');
    })
});
