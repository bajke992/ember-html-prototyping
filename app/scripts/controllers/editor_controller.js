Proto.EditorController = Ember.ArrayController.extend({

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

            var screen_id = this.get('edit');

            if (screen_id === 'new') {
                // add new screen
                var screen = this.get('store').createRecord('screens', {name: title, elements: []});
                screen.save();
                screen_id = screen.get('id');

            } else {
                // edit screen
                this.get('store').find('screens', screen_id).then(function(record){
                    record.set('name', title);
                    record.save();
                });

            }

            this.set('edit', null);

            this.transitionToRoute('screen', screen_id);

        },
        editProperty: function (key, value) {
            this.set(key, value);
        }
    }

});