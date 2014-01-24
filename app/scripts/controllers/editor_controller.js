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
        },
        removeRecord: function (elementId) {
            // NOTE: only inserting into LS is working; fetching, updating and deleting is not working for some reason
            // DAMN YOU EMBER! BURN IN HELL! I HATE YOU!!!
            this.get('store').find('data', {elementId: elementId}).then(function(record){
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
    elementId: null,

    editCodeBegin: function () {
        this.get('editor').getDoc().markText(1, 2, {
            readOnly: true
        });
    },

    editCodeFinish: function () {
        if(this.editCode === false) {
            var eventList = Ember.View.views[this.get('elementId')].get('eventList');
            eventList.onclick = this.get('editor').getValue();
        }
    }.observes('editCode')

});