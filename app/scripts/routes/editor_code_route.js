Proto.EditorCodeRoute = Ember.Route.extend ({
    beforeModel: function (transition) {
        console.log(transition);
        var elementId = transition.elementId;
        console.log(elementId);
        this.set('elementId', elementId);
    }
});