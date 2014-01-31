/* global Proto, DS */
'use strict';

Proto.Projects = DS.Model.extend({
    name: DS.attr('string'),
    project_id: DS.attr('string'),
    screens: DS.hasMany('screens', { async: true })
});

Proto.Screens = DS.Model.extend({
    name: DS.attr('string'),
    project: DS.belongsTo('projects'),
    elements: DS.attr('array')
});


DS.ArrayTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return (Ember.typeOf(serialized) == "array") ? serialized : [];
    },
    serialize: function(deserialized) {
        return (Ember.typeOf(deserialized) == "array") ? deserialized : [];
    }
});

Proto.register('transform:array', DS.ArrayTransform);

DS.JSONSerializer.reopen({
    serializeHasMany: function(record, json, relationship) {

        var key = relationship.key;

        var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

        if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
            json[key] = Ember.get(record, key).mapBy('id');
        }
    }
});

