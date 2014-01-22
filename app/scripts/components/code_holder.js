/**
 * Canvas view which hold canvas container
 * @type {*}
 */
Proto.CodeContainer = Ember.ContainerView.extend(Ember.TargetActionSupport, {

    classNames: ['code'],
    init: function () {
        console.log("asd");
    }

});

Proto.CodeElementComponent = Ember.View.extend ({

});