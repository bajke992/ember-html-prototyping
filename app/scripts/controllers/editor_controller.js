Proto.EditorController = Ember.ObjectController.extend({

    actions: {
        editCode: function (elementId) {

            console.log(elementId);
            var canvasElement = Ember.View.views[elementId];

        }
    }
});