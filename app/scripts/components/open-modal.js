Proto.OpenModalComponent = Ember.Component.extend({

    chooseProject: 'chooseProject',
    closeModal: 'closeOpenProject',

    actions: {

        chooseProject: function (project) {
            this.sendAction('chooseProject', project);
        },
        closeModal: function () {
            this.sendAction('closeModal');
        }
    }

});