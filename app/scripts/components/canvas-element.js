/**
 * Canvas abstract element from which are extended others
 * @type {*}
 */
Proto.CanvasElementComponent = Ember.Component.extend(Ember.TargetActionSupport, {
    classNames: ['canvas-element'],
    templateName: 'components/canvas-element',
    attributeBindings: ['hint:title'],

    addRecord: 'addRecord',
    editProperty: 'editProperty',
    editCode: 'editCode',

    didInsertElement: function() {

        var position = this.get('position');

        this.$().css(Proto.cssData(position));

        this.$().draggable(Proto.draggableData());

        if (this.resizable) {
            this.$().resizable({
                minHeight: this.minHeight,
                maxHeight: this.maxHeight,
                minWidth: this.minWidth,
                maxWidth: this.maxWidth
            });
        }

        this.sendAction('addRecord', {
            elementId:  this.get('elementId'),
            text:       this.get('text'),
            width:      this.get('width'),
            height:     this.get('height'),
            x_pos:      this.get('x_pos'),
            y_pos:      this.get('y_pos'),
            disabled:   this.get('disabled'),
            hint:       this.get('hint'),
            stack:      this.get('stack'),
            resizable:  this.get('resizable')
        });

    },
    click: function () {

        this.sendAction('editProperty', this.get('elementId'));

    },
    doubleClick: function () {

        this.sendAction('editCode', this.get('elementId'));

    },
    text: '',
    width: 100,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    minWidth: 100,
    maxWidth: 300,
    x_pos: 0,
    y_pos: 0,
    disabled: false,
    hint: '',
    stack: 2,
    resizable: true,
    eventList: {
        onclick: null
    }
});

/**
 * Canvas button component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasBtnComponent = Proto.CanvasElementComponent.extend({
    classNames: ['btn'],
    text: 'Button',
    width: 100,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    minWidth: 100,
    maxWidth: 300,
    hint: 'Button'
});

/**
 * Canvas input component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasInputComponent = Proto.CanvasElementComponent.extend({
    classNames: ['input'],
    text: 'Your text here',
    width: 100,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    minWidth: 100,
    maxWidth: 300,
    hint: 'Your text here'
});

/**
 * Canvas text component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasTextComponent = Proto.CanvasElementComponent.extend({
    classNames: ['text'],
    text: 'Text',
    width: 100,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    resizable: false,
    hint: 'Text'
});

/**
 * Canvas panel component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasPanelComponent = Proto.CanvasElementComponent.extend({
    classNames: ['panel'],
    text: '',
    width: 100,
    height: 100,
    minHeight: 100,
    maxHeight: null,
    minWidth: 100,
    maxWidth: null,
    hint: 'Panel'
});

/**
 * Draggable data used by canvas components when initialized
 * @returns {{grid: Array, containment: string, cursor: string, drag: Function, stop: Function}}
 */
Proto.draggableData = function () {
    return {
        grid: [10, 10],
        containment: "parent",
        cursor: "move",
        drag: function (event, ui) {

            ui.helper.css('z-index', 1000);

            var $parent = ui.helper.parent();

            if ($parent.find('.guide').size() === 0) {

                $parent.append('<div class="guide guide-v"></div>');
                $parent.append('<div class="guide guide-h"></div>');
            }

            $parent.find('.guide').show();

            $parent.find('.guide-v').css({top: 0, left: ui.position.left});
            $parent.find('.guide-h').css({top: ui.position.top, left: 0});

        },
        stop: function (event, ui) {

            ui.helper.css('z-index', 2);

            var $parent = ui.helper.parent();

            $parent.find('.guide').hide();
        }
    }
};

/**
 * Css data used by canvas components when initialized
 * @param data
 * @returns {{position: string, top: number, left: number}}
 */
Proto.cssData = function (data) {

    var top = Math.round(data.top / 10) * 10;
    var left = Math.round(data.left / 10) * 10;

    return {
        position: 'absolute',
        top: top,
        left: left
    };

};