Proto.ProjectTreeComponent = Ember.Component.extend({

    editProperty: 'editProperty',
    editScreen: 'editScreen',

    actions: {
        focusElement: function (element) {

            this.sendAction('editProperty', 'elementId', element.elementId);
        },
        editScreen: function (screen_id, screenTitle) {
            this.sendAction('editScreen', screen_id, screenTitle);
        }
    }

});