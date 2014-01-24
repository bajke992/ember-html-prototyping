Proto.EditorController = Ember.ObjectController.extend({
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
            var data = Proto.Data.store.createRecord('data', params);
            data.save();
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