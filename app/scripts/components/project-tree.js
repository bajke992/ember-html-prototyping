Proto.ProjectTreeComponent = Ember.Component.extend({

    editProperty: 'editProperty',

    actions: {
        focusElement: function (element) {

            this.sendAction('editProperty', 'elementId', element.elementId);
        }
    }

});