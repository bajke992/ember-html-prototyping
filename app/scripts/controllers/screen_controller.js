Proto.ScreenController = Ember.ObjectController.extend({
    needs: ['editor'],
    themes: [
        {name: 'none'},
        {name: 'flat'},
        {name: 'flat-rounded'},
        {name: 'bubbly'}
    ],

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
            // DON'T SAVE IT INTO LS! THERE IS A BUG!
            //model.save();

        },
        editProperty: function (key, value) {
            this.get('controllers.editor').send('editProperty', key, value);
        },
        setElementId: function (elementId) {
            this.set('elementId', elementId);
        },
        toggleFullscreen: function () {

            var fullscreen = !this.get('fullscreen');

            if (fullscreen) {
                $('#header').hide();
                $('#sidebar').hide();
                $('#footer').hide();
            } else {
                $('#header').show();
                $('#sidebar').show();
                $('#footer').show();
            }

            this.set('fullscreen', fullscreen);

        }
    },

    editCode: false,
    editDesign: true,
    elementId: null,
    eventType: '',
    fullscreen: false

});