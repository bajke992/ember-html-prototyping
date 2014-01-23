Proto.CodeContainer = Ember.View.extend({
    classNames: ['code'],

    didInsertElement: function () {
        var textArea = document.getElementById("myTextArea");
        var myCodeMirror = CodeMirror.fromTextArea(textArea, {
            lineNumbers: true,
            mode: "javascript"
        });
    }

});