/* global Proto, DS */
'use strict';

Proto.Data = DS.Model.extend({
    objId:      DS.attr('string'),
    text:       DS.attr('string'),
    width:      DS.attr('number'),
    height:     DS.attr('number'),
    x_pos:      DS.attr('number'),
    y_pos:      DS.attr('number'),
    disabled:   DS.attr('boolean'),
    hint:       DS.attr('string'),
    stack:      DS.attr('number'),
    resizable:  DS.attr('boolean')
});

//Proto.Data.FIXTURES = [];
