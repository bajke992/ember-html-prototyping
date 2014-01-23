Proto.PropertyInspectorComponent = Ember.Component.extend({
    isAttrExpanded: false,
    isStyleExpanded: true,
    isObjExpanded: false,
    isEventsExpanded: false,
    isFontExpanded: false,
    isBgExpanded: false,

    elemid: null,
    canvasElement: {},
    props: {},

    actions:{
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
        var canvasElement = Ember.View.views[this.get('elemid')];
        var fields = ['text', 'width', 'height', 'x_pos', 'y_pos', 'disabled', 'hint', 'stack'];

        self.set('canvasElement', canvasElement);

        $.each(fields, function (value, key) {
            self.set('props.' + key, canvasElement.get(key));
        });

    }.observes('elemid'),

    updateSize: function () {

        this.set('props.width', this.canvasElement.get('width'));
        this.set('props.height', this.canvasElement.get('height'));

    }.observes('width', 'height'),

    updatePosition: function () {

        this.set('props.x_pos', this.canvasElement.get('x_pos'));
        this.set('props.y_pos', this.canvasElement.get('y_pos'));

    }.observes('x_pos', 'y_pos')

});

