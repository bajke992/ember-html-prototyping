Proto.CanvasCommunicatorComponent = Ember.Component.extend({
    actions: {
        selectTitle: function() {
            //sends the action selectTitle to Proto.EditorDesignController, along with the title of the object and the id
            this.sendAction('action', this.get('param'), this.get('param1'));
        }
    }
});