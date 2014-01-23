/*global Proto, Ember */
'use strict';

Proto.EditorDesignController = Ember.ObjectController.extend({

    needs: ['editor'],
    actions: {
        addRecord: function (params) {

            var data = Proto.Data.store.createRecord('data', params);
<<<<<<< HEAD
//            console.log(data.get('text'));
=======
>>>>>>> 860867824be37bedb3a446d4dcb44633e4a21c6c
            data.save();

        },
        editProperty: function (elementId) {

<<<<<<< HEAD
//            console.log('editProp:', params.elementId);
            this.set('elementId', params.elementId)
            this.set('text', params.text)
=======
            var canvasElement = Ember.View.views[elementId];

            this.set('elementId', elementId);
            this.set('text', canvasElement.text);
>>>>>>> 860867824be37bedb3a446d4dcb44633e4a21c6c

        },
        editCode: function (params) {

<<<<<<< HEAD
//            console.log('editCode from editor design');
//            console.log(params);
//
//            this.get('controllers.editor').send('editCode', params);
            this.transitionTo('editor.code');
=======
            this.get('controllers.editor').send('editCode', params);
>>>>>>> 860867824be37bedb3a446d4dcb44633e4a21c6c

        },
        updateText: function (text) {

            var canvasElement = Ember.View.views[this.get('elementId')];

            canvasElement.set('text', text);


        }
    }
});
