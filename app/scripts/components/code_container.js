Proto.CodeContainer = Ember.View.extend(Ember.TargetActionSupport, {
    init: function () {
        this.set("initialized", false);
        this._super();
    },

    classNames: ['code'],
    templateName: "editor/code",
    updateRecordEvents: 'updateRecordEvents',
    activeElement: null,
    oldEvent: null,

    valueWillChange: function(obj, keyName, value){
        this.set('oldEvent', this.get('controller.eventType'));
    }.observesBefore('controller.eventType'),

    eventTypeChanged: function () {

        if (!this.get("initialized")) {
            var textArea = document.getElementById("text-area");
            this.set('editor', CodeMirror.fromTextArea(textArea, {
                lineNumbers: true,
                mode: "javascript",
                autofocus: true,
                matchBrackets: true,
                autoCloseBrackets: true
            }));
            this.set("initialized", true);
        }

        var elementId = this.get('controller.elementId');
        this.set('activeElement', Ember.View.views[elementId]);

//        for changes in events from the property inspector
        if (this.get('isVisible')) { //this.get('activeElement') && this.get('activeElement.elementId') !== "document")
            this.triggerAction({
                action: 'save',
                target: this
            });
        }

        if (this.get('initialized')) {
            this.triggerAction({
                action: 'edit',
                target: this
            });
        }
    }.observes('controller.eventType'),

    becameVisible: function () {
        this.get('editor').refresh();
    },

    actions: {
        save: function () {
            var oldEvent = this.get('oldEvent');
            var eventList = this.get('activeElement').get('eventList');
//            console.log(eventList);

            if (eventList.get) {
                eventList.set(oldEvent, this.get('editor').getValue());
            } else {
                console.log('crashes here');
                eventList[oldEvent] = this.get('editor').getValue();
                console.log('told you it crashed there');
            }
            this.get('activeElement').set('eventList', eventList);

            this.get('controller').send('updateRecordEvents',
                {
                    recordId: this.get('activeElement.recordId'),
                    eventList: this.get('activeElement.eventList')
                });
        },
        edit: function () {
            var eventList = this.get('activeElement.eventList');
            var elementId = this.get('activeElement.elementId');

            var eventFunctionCode = eventList[this.get('controller.eventType')] || "";
            elementId = elementId === "document" ? elementId : "\"#" + this.get('activeElement.recordId') + "\"";
            var text = eventFunctionCode === "" ? "$(" + elementId + ")." + this.get('controller.eventType') + "(function () {\n" + eventFunctionCode + "\n});" : eventFunctionCode;

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
    }

});