Proto.IndexController = Ember.ArrayController.extend({

    create: false,
    projectTitle: '',

    actions: {
        /**
         * Open modal box for project name definition
         */
        createProject: function () {

            this.set('create', true);
            this.set('projectTitle', 'New Project');

        },
        /**
         * Close modal box for project name definition
         */
        closeCreate: function () {

            this.set('create', false);

        },
        /**
         * Save project name
         * @param title
         */
        saveProject: function (title) {

            var self = this;

            $.ajax({
                url: '/api/projects',
                type: 'POST',
                data: {
                    name: title,
                    screens: []
                },
                success: function (response) {

                    var project = self.get('store').createRecord('projects', {name: title, project_id: response._id});
                    self.set('create', false);
                    self.transitionToRoute('editor', project.get('id'));
                    project.save();

                },
                error: function (response, status, jqXHR) {
                    console.log('error!');
                    console.log(response);
                }
            });

            // DON'T SAVE IT INTO LS! THERE IS A BUG!
            /*project.save().then(function(precord) {

                var screen = self.store.createRecord('screens', {name: 'Screen 1', project: precord, elements: []});
                screen.save().then(function(srecord) {

                    precord.get('screens').pushObject(screen);
                    precord.save();

                    self.set('create', false);
                    self.transitionToRoute('editor', precord.get('id'));

                });

            });*/

        }
    }
});