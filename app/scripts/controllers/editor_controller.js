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
            this.set('elementId', elementId);
        }
    },
    editCode: false,
    editDesign: true,
    elementId: null
});