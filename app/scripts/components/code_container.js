Proto.CodeContainer = Ember.View.extend({
    classNames: ['code'],
    templateName: "editor/code",

    didInsertElement: function () {
        var textArea = document.getElementById("text-area");
        this.get('controller').set('editor', CodeMirror.fromTextArea(textArea, {
            lineNumbers: true,
            mode: "javascript",
            autofocus: true,
            matchBrackets: true,
            autoCloseBrackets: true
        }));
    },

    becameVisible: function () {
        this.get('controller').get('editor').refresh();
    }

});