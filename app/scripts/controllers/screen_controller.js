Proto.ScreenController = Ember.ObjectController.extend({
    needs: ['editor'],
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

            var model = this.get('model');

            model.get('elements')[params.elementId] = params;
            model.save();

        },
        removeRecord: function (elementId) {
            // FIXME: only inserting into LS is working; fetching, updating and deleting is not working for some reason
            // (except when you query by ID)
            // DAMN YOU EMBER! BURN IN HELL! I HATE YOU!!!

            var model = this.get('model');

            delete model.get('elements')[elementId];
            model.save();

        },
        editProperty: function (key, value) {

            this.get('controllers.editor').send('editProperty', key, value);
        }
    },
    editCode: false,
    editDesign: true,
    elementId: null,
    eventType: '',


    editCodeBegin: function () {
        if (this.editCode === true) {
            var eventList = Ember.View.views[this.get('elementId')].get('eventList');
            var eventFunctionCode = eventList["on"+this.get('eventType')] || "";
            var elementId = this.get('elementId') === "document" ? this.get('elementId'): "\"#" + this.get('elementId') + "\"";
            var text = eventFunctionCode === "" ? "$(" + elementId + ")." + this.get('eventType') + "(function () {\n" + eventFunctionCode + "\n});" : eventFunctionCode;
            this.get('editor').getDoc().setValue(text);
            this.get('editor').getDoc().markText(
                {line: 0, ch: 0},
                {line: 0, ch: 100},
                {readOnly: true, className: 'read-only'}
            );
            this.get('editor').getDoc().markText(
                {line: this.get('editor').getDoc().lastLine(), ch: 0},
                {line: this.get('editor').getDoc().lastLine(), ch: 100},
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