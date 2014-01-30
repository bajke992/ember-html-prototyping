Proto.ScreenController = Ember.ObjectController.extend({
    needs: ['editor'],

    currentPathDidChange: function() {

        var self = this;
        Ember.run.schedule('afterRender', this, function() {


            var elements = this.get('model').get('elements');
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
            console.log(eventType);

            if (elementId) {
                this.set('elementId', elementId);
            } else {
                if (!this.get('elementId') || this.get('elementId') === "document") {
                    this.set('elementId', 'document');
                    eventType = "ready";
                }
            }

            var event = eventType || 'click';

            this.set('eventType', event);
            this.set('editCode', true);
            this.set('editDesign', false);

        },
        addRecord: function (params) {

            var model = this.get('model');

            model.get('elements').pushObject(params);
            model.save();

        },
        updateRecord: function (params) {

            var model = this.get('model');
            var toUpdate;

            // TODO: try to find a way to get object to delete without iterating through array
            $.each(model.get('elements'), function (index, element) {
                if (element.recordId === params.recordId) {
                    toUpdate = index;
                    return;
                }
            });

            model.get('elements')[toUpdate].elementId = params.elementId;
            model.save();

        },
        updateRecordEvents: function (params) {
            var model = this.get('model');
            var toUpdate;

            // TODO: try to find a way to get object to delete without iterating through array
            $.each(model.get('elements'), function (index, element) {
                if (element.recordId === params.recordId) {
                    toUpdate = index;
                    return;
                }
            });

            model.get('elements')[toUpdate].eventList = params.eventList;
            model.save();

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
            model.save();

        },
        editProperty: function (key, value) {
            this.get('controllers.editor').send('editProperty', key, value);
        },
        setElementId: function (elementId) {
            this.set('elementId', elementId);
        }
    },

    editCode: false,
    editDesign: true,
    elementId: null,
    eventType: ''

});