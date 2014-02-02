Proto.ScreenModalComponent = Ember.Component.extend({

    saveScreen: 'saveScreen',
    closeEdit: 'closeEdit',

    screenTitle: 'New Screen',

    actions: {

        saveTitle: function () {

            this.sendAction('saveScreen', this.get('screenTitle'));

        },
        closeEdit: function () {
            this.sendAction('closeEdit');
        }

    }

});