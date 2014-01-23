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
    editCode: 'setCodeView',

    didInsertElement: function() {

        var self = this;
        var position = self.get('position');

        self.$().css(Proto.cssData(position));

        self.$().draggable(Proto.draggableData(self));

        if (self.resizable) {
            self.$().resizable({
                minHeight: self.minHeight,
                maxHeight: self.maxHeight,
                minWidth: self.minWidth,
                maxWidth: self.maxWidth,
                stop: function (event, ui ) {

                    var width = ui.size.width;
                    var height = ui.size.width;

                    self.set('width', width);
                    self.set('height', height);

                    self.sendAction('editProperty', 'width', width);
                    self.sendAction('editProperty', 'height', height);
                }
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

        this.sendAction('editProperty', 'elementId', this.get('elementId'));

    },
    click: function () {

        this.sendAction('editProperty', 'elementId', this.get('elementId'));

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
    x_posNew: 0,
    y_posNew: 0,
    disabled: false,
    hint: '',
    stack: 2,
    resizable: true,
    eventList: {
        onclick: null
    },

    updateWidth: function () {
        this.$().css('width', this.get('width'));
    }.observes('width'),

    updateHeight: function () {
        this.$().css('height', this.get('height'));
    }.observes('height'),

    updateX: function () {
        this.$().css('left', this.get('x_pos') + 'px');
    }.observes('x_pos'),

    updateY: function () {
        this.$().css('top', this.get('y_pos') + 'px');
    }.observes('y_pos'),

    updateStack: function () {
        this.$().css('z-index', this.get('stack'));
    }.observes('stack')

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
Proto.draggableData = function (self) {
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

            var x_pos = ui.position.top;
            var y_pos = ui.position.left;

            self.set('x_pos', x_pos);
            self.set('y_pos', y_pos);

            self.sendAction('editProperty', 'x_pos', x_pos);
            self.sendAction('editProperty', 'y_pos', y_pos);
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