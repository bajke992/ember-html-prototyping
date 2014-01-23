Proto.EditorDesignRoute = Ember.Route.extend ({
    model: function () {
        return this.store.find('data');
    },
    actions: {
        selectTitle: function(title) {
            this.set('mainTitle', title);
            console.log(this.mainTitle);
        },
        willTransition: function (transition) {
            transition.elementId = this.controller.get('elementId');
        }
    }
});