Proto.PropertyInspectorComponent = Ember.Component.extend({
    isAttrExpanded: false,
    isStyleExpanded: true,
    isObjExpanded: true,
    isEventsExpanded: false,
    isFontExpanded: false,
    isBgExpanded: false,

    elemid: null,
    isType: [
        {isInput: false},
        {isText: false},
        {isPanel: false},
        {isButton: false}
    ],
    isInput: false,
    isText: false,
    isPanel: false,
    isButton: false,

    canvasElement: {},
    props: {},

    actions: {
        toggleAttr: function () {
            (this.isAttrExpanded) ? this.set('isAttrExpanded', false) : this.set('isAttrExpanded', true);
        },
        toggleStyle: function () {
            (this.isStyleExpanded) ? this.set('isStyleExpanded', false) : this.set('isStyleExpanded', true);
        },
        toggleObj: function () {
            (this.isObjExpanded) ? this.set('isObjExpanded', false) : this.set('isObjExpanded', true);
        },
        toggleEvents: function () {
            (this.isEventsExpanded) ? this.set('isEventsExpanded', false) : this.set('isEventsExpanded', true);
        },
        toggleFont: function () {
            (this.isFontExpanded) ? this.set('isFontExpanded', false) : this.set('isFontExpanded', true);
        },
        toggleBg: function () {
            (this.isBgExpanded) ? this.set('isBgExpanded', false) : this.set('isBgExpanded', true);
        },

        updateText: function (text) {
            this.canvasElement.set('text', text);
        },
        updateId: function (id) {
            this.canvasElement.set('recordId', id);
        },
        updateWidth: function (width) {
            this.canvasElement.set('width', width);
        },
        updateHeight: function (height) {
            this.canvasElement.set('height', height);
        },
        updateX: function (x_pos) {
            this.canvasElement.set('x_pos', x_pos);
        },
        updateY: function (y_pos) {
            this.canvasElement.set('y_pos', y_pos);
        },
        updateHint: function (hint) {
            this.canvasElement.set('hint', hint);
        },
        updateStack: function (stack) {
            this.canvasElement.set('stack', stack);
        }
    },


    update: function () {

        var self = this;
        // TODO: keep list of properties on one place!!!
        var fields = ['text', 'width', 'height', 'x_pos', 'y_pos', 'disabled', 'hint', 'stack', 'recordId', 'type'];

        if (this.get('elemid') !== null) {

            var canvasElement = Ember.View.views[this.get('elemid')];

            self.set('canvasElement', canvasElement);

            $.each(fields, function (value, key) {
                self.set('props.' + key, canvasElement.get(key));
            });

        } else {
            $.each(fields, function (value, key) {
                self.set('props.' + key, '');
            });
        }

    }.observes('elemid'),

    updateSize: function () {

        this.set('props.width', this.canvasElement.get('width'));
        this.set('props.height', this.canvasElement.get('height'));

    }.observes('width', 'height'),

    updatePosition: function () {

        this.set('props.x_pos', this.canvasElement.get('x_pos'));
        this.set('props.y_pos', this.canvasElement.get('y_pos'));

    }.observes('x_pos', 'y_pos'),

    updateType: function () {

        var self = this;

        var isTypes = ['isButton', 'isInput', 'isText', 'isPanel'];
        var type = this.canvasElement.get('type');

        if (self.get('elemid') !== null) {
            $.each(isTypes, function(index, element) {
                var typeName = "is" + type.charAt(0).toUpperCase() + type.slice(1)
                if (typeName === element){
                    self.set(element, true);
                } else {
                    self.set(element, false);
                }
            });
        } else {
            $.each(isTypes, function(index, element) {
                self.set(element, false);
            });
        }
    }.observes('elemid')
});

