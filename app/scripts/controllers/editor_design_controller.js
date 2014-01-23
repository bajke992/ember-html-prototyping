/*global Proto, Ember */
'use strict';

Proto.EditorDesignController = Ember.ObjectController.extend({

    needs: ['editor'],
    actions: {
        addToCanvas: function (params) {

            //var data = this.store.createRecord('data', params);
            var data = Proto.Data.store.createRecord('data', params);
            console.log(data.get('text'));
            data.save();

        },
        editProp: function (params) {

            console.log('editProp:', params.elementId);
            this.set('elementId', params.elementId)
            this.set('text', params.text)

        },
        editCode: function (params) {

            console.log('editCode from editor design');
            //console.log(params);

            this.get('controllers.editor').send('editCode', params);

        },
        updateText: function (text) {

            console.log('Id:', this.get('elementId'));
            console.log('Text:', text);

            var myView = Ember.View.views[this.get('elementId')];
            console.log(myView);
            myView.set('text', text);

//            var record = Proto.Data.store.find('data', {objId: this.get('objId')});
//            var objId = record.get('objId');
//            console.log('objId', objId);
//            record.set('text', text);
//            record.save();

        }
    }
});
