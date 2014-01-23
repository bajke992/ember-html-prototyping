Proto.EditorController = Ember.ObjectController.extend({

    elementId: null,
    actions: {
        editProperty: function (elementId) {

            this.set('elementId', elementId);

        },
        editCode: function (elementId) {

            var canvasElement = Ember.View.views[elementId];

        }
    }
});