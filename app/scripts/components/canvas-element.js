/**
 * Canvas abstract element from which are extended others
 * @type {*}
 */
Proto.CanvasElementComponent = Ember.Component.extend(Ember.TargetActionSupport, {
    classNames: ['canvas-element'],
    templateName: 'components/canvas-element',
    attributeBindings: ['hint:title'],

    addRecord: 'addRecord',
    updateRecord: 'updateRecord',
    removeRecord: 'removeRecord',
    editProperty: 'editProperty',
    editCode: 'setCodeView',
    setElementId: 'setElementId',

    didInsertElement: function() {

        var self = this;
        var data = self.get('data');
        self.set('eventList', {});
        self.set('recordId', data.recordId);
        self.set('eventList', data.eventList);

        self.$().css(Proto.cssData(data, self));

        self.$().draggable(Proto.draggableData(self));

        if (self.resizable) {
            self.$().resizable({
                minHeight: self.minHeight,
                maxHeight: self.maxHeight,
                minWidth: self.minWidth,
                maxWidth: self.maxWidth,
                start: function (event, ui) {

                    self.sendAction('editProperty', 'elementId', self.get('elementId'));

                },
                stop: function (event, ui) {

                    var width = ui.size.width;
                    var height = ui.size.height;

                    self.set('width', width);
                    self.set('height', height);

                    self.sendAction('editProperty', 'width', width);
                    self.sendAction('editProperty', 'height', height);
                }
            });
        }

        if (data.insert) {
            this.sendAction('addRecord', {
                elementId:  this.get('elementId'),
                recordId:   this.get('recordId'),
                text:       this.get('text'),
                width:      this.get('width'),
                height:     this.get('height'),
                x_pos:      this.get('x_pos'),
                y_pos:      this.get('y_pos'),
                disabled:   this.get('disabled'),
                hint:       this.get('hint'),
                stack:      this.get('stack'),
                resizable:  this.get('resizable'),
                type:       this.get('type'),
                eventList:  {}
            });
        } else {
            this.sendAction('updateRecord', {
                elementId:  this.get('elementId'),
                recordId:   this.get('recordId'),
                eventList:  this.get('eventList')
            });
        }

        this.sendAction('editProperty', 'elementId', this.get('elementId'));

    },
    click: function () {

        if (!this.$().is(".ui-selected")) {

            this.sendAction('editProperty', 'elementId', this.get('elementId'));
            this.sendAction('setElementId', this.get('elementId'));

        }

    },
    doubleClick: function () {

        this.sendAction('editCode', this.get('elementId'), null);

    },
    actions: {
        deleteCanvasElement: function () {
            this.sendAction('removeRecord', this.get('recordId'));
            this.sendAction('editProperty', 'elementId', null);
            this.destroy();
        }
    },
    recordId: '',
    type: 'general',
    text: '',
    URL: '',
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
    },
    fontsize: '14',
    fontfamily: 'Myriad Pro',
    color: 'black',
    style: 'normal',
    bgImage: 'none',
    bgSize: 'auto',
    bgRepeat: 'repeat',
    bgPositionX: 0,
    bgPositionY: 0,

    bold: false,
    italic: false,
    underline: false,

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
    }.observes('stack'),

    updateMode: function () {
        var mode = this.get('mode');

        if (mode === 'singleline') {

            this.set('minHeight', 40);
            this.set('maxHeight', 40);
            this.set('height', 40);

        } else if (mode === 'multiline') {

            this.set('minHeight', 80);
            this.set('maxHeight', null);
            this.set('height', 80);

        }

        this.$().resizable({
            minHeight: this.minHeight,
            maxHeight: this.maxHeight
        });

    }.observes('mode'),

    updateCss: function () {

        this.$().css({
            color: this.get('color'),
            fontSize: this.get('fontsize') + 'px',
            fontFamily: this.get('fontfamily'),
            backgroundColor: this.get('bgColor'),
            backgroundRepeat: this.get('bgRepeat'),
            backgroundPositionX: this.get('bgPositionX') + 'px',
            backgroundPositionY: this.get('bgPositionY') + 'px'
        });

        if (this.get('bgImage') !== "none"){
            this.$().css('background-image', 'url(' + this.get('bgImage') + ')');
        }

        this.get('bold') ? this.$().css('font-weight', 'bold') : this.$().css('font-weight', 'normal');
        this.get('italic') ? this.$().css('font-style', 'italic') : this.$().css('font-style', 'normal');
        this.get('underline') ? this.$().css('text-decoration', 'underline') : this.$().css('text-decoration', 'none');

    }.observes('color', 'fontfamily', 'fontsize', 'style', 'bgImage', 'bgColor', 'bgPositionX', 'bgPositionY', 'bgRepeat',
            'style', 'bold', 'underline', 'italic'),

    updatePlaceholder: function() {
        this.$().attr('placeholder', this.get('placeholder'));
    }.observes('placeholder'),

    updateURL: function() {
        this.$().attr('href', this.get('URL'));
    }.observes('URL'),

    updateEvents: function () {
        this.$().attr('eventList', this.get('eventList'));
    }.observes('eventList')
});

/**
 * Draggable data used by canvas components when initialized
 * @returns {{grid: Array, containment: string, cursor: string, drag: Function, stop: Function}}
 */
Proto.draggableData = function (self) {

    var selected = $([]);
    var offset = {top: 0, left: 0};

    return {
        grid: [10, 10],
        containment: "parent",
        cursor: "move",
        start: function () {

            // this block enables dragging of selectable elements
            if (!self.$().is(".ui-selected")) { $(".ui-selected").removeClass("ui-selected"); }

            selected = $(".ui-selected").each(function () {
                var element = $(this);
                element.data("offset", element.offset());
            });
            offset = self.$().offset();

            // confirm selected element
            if (!self.$().is(".ui-selected")) {
                self.sendAction('editProperty', 'elementId', self.get('elementId'));
            }
        },

        drag: function (event, ui) {

            // create guide lines for single elements
            if (!self.$().is(".ui-selected")) {

                var $parent = ui.helper.parent();
                var left = ui.position.left;
                var top = ui.position.top;

                if ($parent.find('.guide').size() === 0) {

                    $parent.append('<div class="guide guide-v"></div>');
                    $parent.append('<div class="guide guide-h"></div>');
                }

                $parent.find('.guide').show();

                $parent.find('.guide-v').css({top: 0, left: left});
                $parent.find('.guide-h').css({top: top, left: 0});

                self.set('x_pos', left);
                self.set('y_pos', top);

                self.sendAction('editProperty', 'x_pos', left);
                self.sendAction('editProperty', 'y_pos', top);

            }

            // enabling selectable elements dragging
            var draggedTop = ui.position.top - offset.top;
            var draggedLeft = ui.position.left - offset.left;

            selected.not(self).each(function () {
                var element = $(this);
                var off = element.data("offset");
                element.css({top: off.top + draggedTop, left: off.left + draggedLeft});
            });

        },
        stop: function (event, ui) {

            if (self.$().is(".ui-selected")) {

                self.sendAction('editProperty', 'elementId', null);

            } else {

                var $parent = ui.helper.parent();

                $parent.find('.guide').hide();

                var x_pos = ui.position.left;
                var y_pos = ui.position.top;

                self.set('x_pos', x_pos);
                self.set('y_pos', y_pos);

                self.sendAction('editProperty', 'x_pos', x_pos);
                self.sendAction('editProperty', 'y_pos', y_pos);

            }
        }
    };
};

/**
 * Css data used by canvas components when initialized
 * @param data
 * @returns {{position: string, top: number, left: number}}
 */
Proto.cssData = function (data, self) {

    var top = Math.round(data.top / 10) * 10;
    var left = Math.round(data.left / 10) * 10;

    self.set('x_pos', left);
    self.set('y_pos', top);

    return {
        position: 'absolute',
        top: top,
        left: left
    };

};