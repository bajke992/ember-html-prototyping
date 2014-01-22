Proto.TestPropComponent = Ember.Component.extend({
    templateName: 'components/test-prop',
    updateText: 'updateText',
    actions: {
        updateText: function(text) {

            this.sendAction('updateText', text);

        }
    }
});