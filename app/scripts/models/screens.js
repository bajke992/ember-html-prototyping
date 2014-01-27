/* global Proto, DS */
'use strict';

Proto.Screens = DS.Model.extend({
    name:       DS.attr('string'),
    elements:   DS.attr('array')
});

//Proto.Data.FIXTURES = [];


DS.ArrayTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return (Ember.typeOf(serialized) == "array") ? serialized : [];
    },
    serialize: function(deserialized) {
        return (Ember.typeOf(deserialized) == "array") ? deserialized : [];
    }
});


Proto.register('transform:array', DS.ArrayTransform);
