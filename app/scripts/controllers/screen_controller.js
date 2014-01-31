Proto.ScreenController = Ember.ObjectController.extend({
    needs: ['editor'],

    currentPathDidChange: function() {

        var self = this;

        Ember.run.schedule('afterRender', this, function() {

            var elements = self.get('model').get('elements');
            var canvas = Ember.View.views['document'];

            canvas.removeAllChildren();

            $.each(elements, function (key, params) {

                canvas.triggerAction({
                    action: 'add',
                    target: canvas,
                    actionContext: params
                });

            });

        });
    }.observes('currentPath'),


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

//            var screen = this.get('model');
//            params.screen = screen;
//
//            var element = this.get('store').createRecord('elements', params);
//            element.save().then(function(erecord) {
//
//                Ember.view.views[params.elementId].set('recordId', erecord.get('id'));
//
//                screen.get('elements').pushObject(erecord);
//                screen.save().then(function (srecord) {
//                    console.log('srecord', srecord);
//                });
//
//            });

            var model = this.get('model');

            model.get('elements').pushObject(params);
            // DON'T SAVE IT INTO LS! THERE IS A BUG!
//            model.save();

        },
        updateRecord: function (params) {

            var model = this.get('model');
            var toUpdate;

            //TODO: try to find a way to get object to delete without iterating through array
            $.each(model.get('elements'), function (index, element) {
                if (element.recordId === params.recordId) {
                    toUpdate = index;
                    return;
                }
            });

            var elements = model.get('elements');

            $.each(params.attrs, function (key, value) {
                elements[toUpdate][key] = value;
            });

            console.log('not saved into local storage');
//            model.set('elements', elements);
            // DON'T SAVE IT INTO LS! THERE IS A BUG!
//            model.save();




        },
        removeRecord: function (recordId) {

            var model = this.get('model');
            var toDelete;

            // TODO: try to find a way to get object to delete without iterating through array
            $.each(model.get('elements'), function (index, element) {
                if (element.recordId === recordId) {
                    toDelete = element;
                    return;
                }
            });

            model.get('elements').removeObject(toDelete);
            // DON'T SAVE IT INTO LS! THERE IS A BUG!
            //model.save();

        },
        editProperty: function (key, value) {
            this.get('controllers.editor').send('editProperty', key, value);
        }
    },
    editCode: false,
    editDesign: true,
    elementId: null,
    eventType: ''


//    editCodeBegin: function () {
//        if (this.editCode === true) {
//            var eventList = Ember.View.views[this.get('elementId')].get('eventList');
//            var eventFunctionCode = eventList["on"+this.get('eventType')] || "";
//            var elementId = this.get('elementId') === "document" ? this.get('elementId'): "\"#" + this.get('elementId') + "\"";
//            var text = eventFunctionCode === "" ? "$(" + elementId + ")." + this.get('eventType') + "(function () {\n" + eventFunctionCode + "\n});" : eventFunctionCode;
//            this.get('editor').getDoc().setValue(text);
//            this.get('editor').getDoc().markText(
//                {line: 0, ch: 0},
//                {line: 0, ch: 100},
//                {readOnly: true, className: 'read-only'}
//            );
//            this.get('editor').getDoc().markText(
//                {line: this.get('editor').getDoc().lastLine(), ch: 0},
//                {line: this.get('editor').getDoc().lastLine(), ch: 100},
//                {readOnly: true, className: 'read-only'}
//            );
//        }
//    }.observes('editCode'),

//    editCodeFinish: function () {
//        if (this.editCode === false) {
//            var eventType = this.get('eventType');
//            var eventList = Ember.View.views[this.get('elementId')].get('eventList');
//            eventList['on' + eventType] = this.get('editor').getValue();
//            Ember.View.views[this.get('elementId')].set('eventList', eventList);
//
//            console.log(Ember.View.views[this.get('elementId')].get('eventList'));
//        }
//    }.observes('editCode')

});