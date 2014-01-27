Proto.EditorController = Ember.ArrayController.extend({

    actions: {
        addScreen: function () {

            var screen = this.get('store').createRecord('screens', {name: 'New screen', elements: []});
            screen.save();

        },

        editProperty: function (key, value) {
            this.set(key, value);
        }

    }

});