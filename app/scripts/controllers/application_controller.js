Proto.ApplicationController = Ember.ArrayController.extend({
    open: false,
    projects: [
        {name: 'Project 1'},
        {name: 'Project 2'},
        {name: 'Project 3'},
        {name: 'Project 4'},
        {name: 'Project 5'},
        {name: 'Project 6'},
        {name: 'Project 7'},
        {name: 'Project 8'},
        {name: 'Project 9'},
        {name: 'Project 10'},
        {name: 'Project 11'},
        {name: 'Project 12'},
        {name: 'Project 13'}
    ],

    actions : {
        openOpenProject: function () {
            this.set('open', true);
        },
        closeOpenProject: function () {
            this.set('open', false);
        },
        chooseProject: function (project) {
            console.log("chose project " + project.name);
        }
    }
});