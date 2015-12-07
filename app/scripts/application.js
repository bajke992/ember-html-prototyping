var Proto = window.Proto = Ember.Application.create();

//Proto.ApplicationAdapter = DS.FixtureAdapter.extend();

Proto.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'proto-emberjs'
});

/*
Proto.ApplicationAdapter = DS.RESTAdapter.reopen({
    namespace: 'api'
});

Proto.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: "_id"
});
*/


require('scripts/controllers/*');
require('scripts/store');
require('scripts/components/*');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/controls/*');
require('scripts/router');
