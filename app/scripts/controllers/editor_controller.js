Proto.EditorController = Ember.ObjectController.extend({
    needs: ['screen'],

    edit: null,
    screenTitle: '',

    actions: {
        addScreen: function () {

            this.set('edit', 'new');
            this.set('screenTitle', 'New Screen');

        },
        editScreen: function (id, title) {

            this.set('edit', id);
            this.set('screenTitle', title);

        },
        closeEdit: function () {

            this.set('edit', null);

        },
        saveScreen: function (title) {

            var self = this;
            var screen_id = this.get('edit');

            var project = this.get('model');

            if (screen_id === 'new') {
                // add new screen
                var screen = this.get('store').createRecord('screens', {name: title, project: project, elements: []});
                screen.save().then(function() {

                    project.get('screens').pushObject(screen);
                    // DON'T SAVE IT INTO LS! THERE IS A BUG!
                    project.save();

                    self.set('edit', null);
                    self.transitionToRoute('screen', screen.get('id'));

                });

            } else {
                // edit screen
                this.get('store').find('screens', screen_id).then(function(record){
                    record.set('name', title);
                    // DON'T SAVE IT INTO LS! THERE IS A BUG!
                    //record.save();

                    self.set('edit', null);
                    self.transitionToRoute('screen', screen_id);
                });
            }

        },
        editProperty: function (key, value) {
            this.set(key, value);
        },
        setCodeView: function (elementId, eventType) {
            this.get('controllers.screen').send('setCodeView', elementId, eventType);
        }
    }

});