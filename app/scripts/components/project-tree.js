Proto.ProjectTreeComponent = Ember.Component.extend({

    actions: {
        focusElement: function (element) {
            console.log('focus element', element.elementId);
        }
    }

});