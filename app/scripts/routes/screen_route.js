Proto.ScreenRoute = Ember.Route.extend ({
    model: function (params) {
        return this.store.find('screens', params.screen_id);
    }
});