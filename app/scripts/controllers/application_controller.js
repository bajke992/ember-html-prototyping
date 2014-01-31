Proto.ApplicationController = Ember.ArrayController.extend({

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

        }
    }
});