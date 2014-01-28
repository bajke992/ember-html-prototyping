/**
 * Canvas input component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasInputComponent = Proto.CanvasElementComponent.extend({
    classNames: ['input'],
    classNameBindings: ['mode'],
    type: 'input',
    text: 'Your text here',
    width: 100,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    minWidth: 100,
    maxWidth: 300,
    mode: 'singleline',
    hint: 'Your text here',
    bgColor: 'white'
});