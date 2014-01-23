Proto.CodeContainer = Ember.View.extend({
    classNames: ['code'],
    templateName: "editor/code",

    didInsertElement: function () {
        var textArea = document.getElementById("text-area");
        this.get('controller').set('editor', CodeMirror.fromTextArea(textArea, {
            lineNumbers: true,
            mode: "javascript",
            autofocus: true
        }));
        this.get('controller').get('editor').getDoc().setValue('var msg = "Hi";');
    },

    becameVisible: function () {
        this.get('controller').get('editor').refresh();
    }

});