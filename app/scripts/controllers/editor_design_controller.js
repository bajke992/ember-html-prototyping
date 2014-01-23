/*global Proto, Ember */
'use strict';

Proto.EditorDesignController = Ember.ObjectController.extend({

    needs: ['editor'],
//    elementId: null,
    actions: {
        addRecord: function (params) {

            var data = Proto.Data.store.createRecord('data', params);
            data.save();

        },
        editProperty: function (elementId) {

//            var canvasElement = Ember.View.views[elementId];

//            this.set('elementId', elementId);
//            this.set('text', canvasElement.text);

            console.log(elementId);
            this.get('controllers.editor').send('editProperty', elementId);

        },
        editCode: function (params) {

            this.get('controllers.editor').send('editCode', params);

        },
        updateText: function (text) {

            var canvasElement = Ember.View.views[this.get('elementId')];

            canvasElement.set('text', text);


        }
    }
});
