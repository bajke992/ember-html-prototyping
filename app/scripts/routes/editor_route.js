Proto.EditorRoute = Ember.Route.extend ({
    model: function (params) {
        return this.store.find('projects', params.project_id);
    }
});