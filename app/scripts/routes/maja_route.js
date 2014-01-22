Proto.MajaRoute = Ember.Route.extend ({
    model: function () {
        return {
            titles: [
                {
                    title: "title1",
                    id: 1
                },
                {
                    title: "title2",
                    id: 2
                },
                {
                    title: "title3",
                    id: 3
                }
            ],
            mainTitle: {
                title: 'default',
                id: 0
            }
        }
    }
});

Proto.MajaController = Ember.ObjectController.extend({
    actions: {
        selectTitle: function(title, id) {
            this.set('mainTitle.title', title);
            this.set('mainTitle.id', id);
        },
        editTitle: function(title, id) {
            var titles = this.get('titles');
            titles.filterBy('id', id).title = title;
            this.get('model').save();
            var newTitle = titles.filterBy('id', id).title;
            debugger;
        }
    }
});