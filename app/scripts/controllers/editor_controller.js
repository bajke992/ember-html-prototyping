Proto.EditorController = Ember.ObjectController.extend({

    elementId: null,
    actions: {
        editProperty: function (elementId) {

            //var canvasElement = Ember.View.views[elementId];
            console.log(elementId);
            this.set('elementId', elementId);

        },
        editCode: function (elementId) {

            console.log(elementId);
            var canvasElement = Ember.View.views[elementId];

        }
    }
});