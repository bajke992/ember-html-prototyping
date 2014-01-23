Proto.EditorController = Ember.ObjectController.extend({
    actions: {
        setDesignView: function () {
            this.set('editCode', false);
            this.set('editDesign', true);
        },
        setCodeView: function () {
            this.set('editCode', true);
            this.set('editDesign', false);
        },
        addRecord: function (params) {

            var data = Proto.Data.store.createRecord('data', params);
            data.save();

        },
        editProperty: function (elementId) {

            var canvasElement = Ember.View.views[elementId];

            this.set('elementId', elementId);
            this.set('text', canvasElement.text);

        }
    },
    editCode: false,
    editDesign: true,
    elementId: null
});