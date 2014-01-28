/**
 * Canvas button component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasBtnComponent = Proto.CanvasElementComponent.extend({
    classNames: ['btn'],
    type: 'btn',
    text: 'Button',
    width: 100,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    minWidth: 100,
    maxWidth: 300,
    hint: 'Button',
    bgColor: '#eee'
});