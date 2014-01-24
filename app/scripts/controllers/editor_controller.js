Proto.EditorController = Ember.ArrayController.extend({

    actions: {
        setDesignView: function () {
            this.set('editCode', false);
            this.set('editDesign', true);
        },
        setCodeView: function (elementId, eventType) {
            if (elementId) {
                this.set('elementId', elementId);
            } else {
                if (!this.get('elementId')) {
                    this.set('elementId', 'document');
                    eventType = "ready";
                }
            }

            var defaultEvent = 'click';

            this.set('eventType', eventType || defaultEvent);
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

            this.get('store').find('data', recordId).then(function (record) {
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
    eventType: '',

    editCodeBegin: function () {
        if (this.editCode === true) {
            var text = "$(" + this.get('elementId') + ")." + this.get('eventType') + "(function () {\n\n});";
            this.get('editor').getDoc().setValue(text);
            this.get('editor').getDoc().markText(
                {line: 0, ch: 0},
                {line: 0, ch: 100},
                {readOnly: true, className: 'read-only'}
            );
            this.get('editor').getDoc().markText(
                {line: 2, ch: 0},
                {line: 2, ch: 100},
                {readOnly: true, className: 'read-only'}
            );
        }
    }.observes('editCode'),

    editCodeFinish: function () {
        if (this.editCode === false) {
            var eventType = this.get('eventType');
            var eventList = Ember.View.views[this.get('elementId')].get('eventList');
            eventList['on' + eventType] = this.get('editor').getValue();
            Ember.View.views[this.get('elementId')].set('eventList', eventList);

            console.log(Ember.View.views[this.get('elementId')].get('eventList'));
        }
    }.observes('editCode')

});