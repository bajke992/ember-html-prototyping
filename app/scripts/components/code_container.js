Proto.CodeContainer = Ember.View.extend({
    init: function () {
        this.set("initialized", false);
        this._super();
    },

    classNames: ['code'],
    templateName: "editor/code",
    updateRecordEvents: 'updateRecordEvents',
    activeElement: null,

    eventType: 'click',

    eventTypeChanged: function () {

//        for changes in events from the property inspector

        if(this.get('initialized')) {
            var eventList = Ember.View.views[this.get('controller.elementId')].get('eventList');
            var eventFunctionCode = eventList["on"+this.get('controller.eventType')] || "";
            var elementId = this.get('controller.elementId') === "document" ? this.get('controller.elementId') : "\"#" + Ember.View.views[this.get('controller.elementId')].get('recordId') + "\"";
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
    }.observes('eventType'),

    becameVisible: function () {
        if(!this.get("initialized")) {
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
        var eventList = this.get('activeElement.eventList');
//        for on ready event when no elements are selected

//        var eventList = Ember.View.views[this.get('controller.elementId')].get('eventList');
        var eventFunctionCode = eventList["on"+this.get('controller.eventType')] || "";
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
    },

    becameHidden: function () {
        var eventType = this.get('controller.eventType');
        var eventList = this.get('activeElement').get('eventList');
        eventList['on' + eventType] = this.get('editor').getValue();
        this.get('activeElement').set('eventList', eventList);

        this.get('controller').send('updateRecordEvents',
            {
                recordId: this.get('activeElement.recordId'),
                eventList: this.get('activeElement.eventList')
            });

    }

});