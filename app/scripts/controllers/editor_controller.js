Proto.EditorController = Ember.ArrayController.extend({
    init: function () {

    },

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
            var data = this.get('store').createRecord('data', params);
            data.save();

            var canvasElement = Ember.View.views[params.elementId];
            canvasElement.set('recordId', 'element-' + data.get('id'));

        },
        removeRecord: function (recordId) {
            // FIXME: only inserting into LS is working; fetching, updating and deleting is not working for some reason
            // (except when you query by ID)
            // DAMN YOU EMBER! BURN IN HELL! I HATE YOU!!!

            recordId = recordId.replace('element-', '');

            this.get('store').find('data', recordId).then(function(record){
                record.deleteRecord();
                record.save();
            });
        },
        editProperty: function (key, value) {

            this.set(key, value);
        }
    },
    editCode: false,
    editDesign: true,
    elementId: null

});