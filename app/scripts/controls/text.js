/**
 * Canvas text component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasTextComponent = Proto.CanvasElementComponent.extend({
    classNames: ['text'],
    type: 'text',
    text: 'Text',
    width: null,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    resizable: false,
    hint: 'Text'
});