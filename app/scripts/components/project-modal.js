Proto.ProjectModalComponent = Ember.Component.extend({

    saveProject: 'saveProject',
    closeCreate: 'closeCreate',

    projectTitle: 'New Project',

    actions: {

        saveProject: function () {

            this.sendAction('saveProject', this.get('projectTitle'));

        },
        closeCreate: function () {
            this.sendAction('closeCreate');
        }

    }

});