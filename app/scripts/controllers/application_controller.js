Proto.ApplicationController = Ember.ArrayController.extend({
    open: false,
    projects: [
        {name: 'Project 1'},
        {name: 'Project 2'},
        {name: 'Project 3'},
        {name: 'Project 4'},
        {name: 'Project 5'},
        {name: 'Project 6'},
        {name: 'Project 7'},
        {name: 'Project 8'},
        {name: 'Project 9'},
        {name: 'Project 10'},
        {name: 'Project 11'},
        {name: 'Project 12'},
        {name: 'Project 13'}
    ],

    actions: {
        /**
         * This method is saving project into database but it's still not listed from that same database
         */
        saveProject: function () {

            console.log('saveProject');
            var project_id = window.location.hash.split('/')[2];

            this.get('store').find('projects', project_id).then(function (record) {

                var id = record.get('id');
                var name = record.get('name');
                var screensRel = record.get('screens');

                screensRel.then(
                    function (result) {

                        var screens = [];
                        var content = result.get('content');

                        content.forEach(function (screen) {

                            var elements = screen.get('elements');
                            var cleanElements = [];

                            elements.forEach(function (props) {
                                var cleanProps = {};
                                for (var k in props) {
                                    if (props.hasOwnProperty(k)) { cleanProps[k] = props[k]; }
                                }
                                cleanElements.push(cleanProps);
                            });
                            screens.push({name: screen.get('name'), elements: cleanElements});
                        });

                        $.ajax({
                            url: '/api/projects/' + record.get('project_id'),
                            type: 'PUT',
                            data: {
                                name: name,
                                screens: screens
                            },
                            success: function (response) {
                                console.log('success!');
                                console.log(response);
                            },
                            error: function (response) {
                                console.log('error!');
                                console.log(response);
                            }
                        });

                    }
                );

            });

        },
        openOpenProject: function () {
            this.set('open', true);
        },
        closeOpenProject: function () {
            this.set('open', false);
        },
        chooseProject: function (project) {
            console.log("chose project " + project.name);
        }
    }
});