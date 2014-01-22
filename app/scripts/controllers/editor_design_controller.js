/*global Proto, Ember */
'use strict';

Proto.EditorDesignController = Ember.ObjectController.extend({

    needs: ['editor'],
    actions: {
        addToCanvas: function (params) {

            var data = this.store.createRecord('data', params);
            data.save();

        },
        editProp: function (params) {

            console.log('editProp:', params.objId);
            this.set('objId', params.objId)
            this.set('text', params.text)

        },
        editCode: function (params) {

            console.log('editCode from editor design');
            //console.log(params);

            this.get('controllers.editor').send('editCode', params);

        },
        updateText: function (text) {

            console.log('Id:', this.get('objId'));
            console.log('Text:', text);

            var record = this.store.find('data', {objId: this.get('objId')}).then( function(result) {
                console.log(result.get('objId'));
            });

        }
    }
});
