/* global Proto, DS */
'use strict';

Proto.Screens = DS.Model.extend({
    name:       DS.attr('string'),
    elements:   DS.attr('object')
});

//Proto.Data.FIXTURES = [];


DS.ArrayTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return (Ember.typeOf(serialized) == "object") ? serialized : {};
    },
    serialize: function(deserialized) {
        return (Ember.typeOf(deserialized) == "object") ? deserialized : {};
    }
});


Proto.register('transform:object', DS.ArrayTransform);
