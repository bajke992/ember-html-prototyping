Proto.EditorRoute = Ember.Route.extend ({
    model: function () {
        //return this.store.find('data');
        return this.store.find('screens');
    }
});