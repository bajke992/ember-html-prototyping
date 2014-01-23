Proto.EditorCodeController = Ember.ObjectController.extend({
    needs: "editor",

    init: function () {
        var elementId = this.get('elementId');
        console.log(elementId);
    }
});