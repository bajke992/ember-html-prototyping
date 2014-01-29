Proto.CodeContainer = Ember.View.extend({
    init: function () {
        console.log(this.get("elementId"));
    },

    classNames: ['code'],
    templateName: "editor/code",

    didInsertElement: function () {
//        var textArea = document.getElementById("text-area");
//        this.get('controller').set('editor', CodeMirror.fromTextArea(textArea, {
//            lineNumbers: true,
//            mode: "javascript",
//            autofocus: true,
//            matchBrackets: true,
//            autoCloseBrackets: true
//        }));
    },

    eventType: 'click',

    eventTypeChanged: function () {

//        for changes in events from the property inspector

        if(this.get('initialized')) {
            var eventList = Ember.View.views[this.get('controller.elementId')].get('eventList');
            var eventFunctionCode = eventList["on"+this.get('controller.eventType')] || "";
            var elementId = this.get('controller.elementId') === "document" ? this.get('controller.elementId'): "\"#" + this.get('controller.elementId') + "\"";
            var text = eventFunctionCode === "" ? "$(" + elementId + ")." + this.get('controller.eventType') + "(function () {\n" + eventFunctionCode + "\n});" : eventFunctionCode;
            this.get('controller.editor').getDoc().setValue(text);
            this.get('controller.editor').getDoc().markText(
                {line: 0, ch: 0},
                {line: 0, ch: 100},
                {readOnly: true, className: 'read-only'}
            );
            this.get('controller.editor').getDoc().markText(
                {line: this.get('controller.editor').getDoc().lastLine(), ch: 0},
                {line: this.get('controller.editor').getDoc().lastLine(), ch: 100},
                {readOnly: true, className: 'read-only'}
            );
        }
    }.observes('eventType'),

    becameVisible: function () {
//        this.get('controller').get('editor').refresh();
        if(!this.get("initialized")) {
            var textArea = document.getElementById("text-area");
            this.get('controller').set('editor', CodeMirror.fromTextArea(textArea, {
                lineNumbers: true,
                mode: "javascript",
                autofocus: true,
                matchBrackets: true,
                autoCloseBrackets: true
            }));
            this.set("initialized", true);
        }

//        for on ready event when no elements are selected

        var eventList = Ember.View.views[this.get('controller.elementId')].get('eventList');
        var eventFunctionCode = eventList["on"+this.get('controller.eventType')] || "";
        var elementId = this.get('controller.elementId') === "document" ? this.get('controller.elementId'): "\"#" + this.get('controller.elementId') + "\"";
        var text = eventFunctionCode === "" ? "$(" + elementId + ")." + this.get('controller.eventType') + "(function () {\n" + eventFunctionCode + "\n});" : eventFunctionCode;
        this.get('controller.editor').getDoc().setValue(text);
        this.get('controller.editor').getDoc().markText(
            {line: 0, ch: 0},
            {line: 0, ch: 100},
        {readOnly: true, className: 'read-only'}
        );
        this.get('controller.editor').getDoc().markText(
            {line: this.get('controller.editor').getDoc().lastLine(), ch: 0},
            {line: this.get('controller.editor').getDoc().lastLine(), ch: 100},
            {readOnly: true, className: 'read-only'}
        );
    },

    becameHidden: function () {
        var eventType = this.get('controller.eventType');
        var eventList = Ember.View.views[this.get('controller.elementId')].get('eventList');
        eventList['on' + eventType] = this.get('controller.editor').getValue();
        Ember.View.views[this.get('controller.elementId')].set('eventList', eventList);

        console.log(Ember.View.views[this.get('controller.elementId')].get('eventList'));
    }

});