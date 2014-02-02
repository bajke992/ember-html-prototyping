/**
 * Canvas panel component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasPanelComponent = Proto.CanvasElementComponent.extend({
    classNames: ['panel'],
    type: 'panel',
    text: 'Panel',
    width: 100,
    height: 100,
    minHeight: 100,
    maxHeight: null,
    minWidth: 100,
    maxWidth: null,
    hint: 'Panel',
    bgColor: '#f3f3f3'
});