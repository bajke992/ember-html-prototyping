/**
 * Canvas abstract element from which are extended others
 * @type {*}
 */
Proto.CanvasElementComponent = Ember.Component.extend(Ember.TargetActionSupport, {
    classNames: ['canvas-element'],
    add: 'addToCanvas',
    editProp: 'editProp',
    editCode: 'editCode',
    templateName: 'components/canvas-element',
    attributeBindings: ['hint:title'],
    didInsertElement: function() {

        var position = this.get('position');
        //var self = this;

        this.$().css(Proto.cssData(position));

        this.$().draggable(Proto.draggableData());

        if (this.resizable) {
            this.$().resizable({
                grid: 10,
                minHeight: this.minHeight,
                maxHeight: this.maxHeight,
                minWidth: this.minWidth,
                maxWidth: this.maxWidth
            });
        }

        var objId = this.$().attr('id');

        this.objId = objId;

        this.sendAction('add', {
            objId: objId,
            text: this.text,
            width: this.width,
            height: this.height,
            x_pos: this.x_pos,
            y_pos: this.y_pos,
            disabled: this.disabled,
            hint: this.hint,
            stack: this.stack,
            resizable: this.resizable
        });

    },
    click: function () {

        this.sendAction('editProp', {objId: this.get('objId'), text: this.get('text')});

    },
    doubleClick: function () {

        this.sendAction('editCode', this.get('objId'));

    },
    actions: {
        add: function (attr) {
            Proto.addElement(attr, this);
        }
    },
    objId: '',
    text: '',
    width: 99,
    height: 38,
    minHeight: 38,
    maxHeight: 38,
    minWidth: 99,
    maxWidth: 299,
    x_pos: 0,
    y_pos: 0,
    disabled: false,
    hint: '',
    stack: 2,
    resizable: true
});

/**
 * Canvas button component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasBtnComponent = Proto.CanvasElementComponent.extend({
    classNames: ['btn'],
    text: 'Button',
    width: 99,
    height: 38,
    minHeight: 38,
    maxHeight: 38,
    minWidth: 99,
    maxWidth: 299,
    hint: 'Button'
});

/**
 * Canvas input component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasInputComponent = Proto.CanvasElementComponent.extend({
    classNames: ['input'],
    text: 'Your text here',
    width: 99,
    height: 38,
    minHeight: 38,
    maxHeight: 38,
    minWidth: 99,
    maxWidth: 299,
    hint: 'Your text here'
});

/**
 * Canvas text component which is contained by canvas container
 * @type {*}
 */
Proto.CanvasTextComponent = Proto.CanvasElementComponent.extend({
    classNames: ['text'],
    text: 'Text',
    width: 99,
    height: 38,
    minHeight: 38,
    maxHeight: 38,
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
    width: 99,
    height: 99,
    minHeight: 99,
    maxHeight: 299,
    minWidth: 99,
    maxWidth: 299,
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