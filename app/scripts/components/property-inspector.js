Proto.PropertyInspectorComponent = Ember.Component.extend({
    isAttrExpanded: false,
    isStyleExpanded: true,
    isObjExpanded: false,
    isFontExpanded: true,
    isBgExpanded: false,
    isElementSelected: true,
    isEventsSelected: false,

    elemid: null,
    isInput: false,
    isText: false,
    isPanel: false,
    isBtn: false,

    canvasElement: {},
    props: {},
    cssProps: {},

    modes: [
        {mode: 'multiline', title: 'Multi-line'},
        {mode: 'singleline', title: 'Single-line'}
    ],

    actions: {
        showElement: function () {
            this.set('isElementSelected', true);
            this.set('isEventsSelected', false);
        },

        showEvents: function () {
            this.set('isElementSelected', false);
            this.set('isEventsSelected', true);
        },

        toggleAttr: function () {
            this.toggleProperty('isAttrExpanded');
        },
        toggleStyle: function () {
            this.toggleProperty('isStyleExpanded');
        },
        toggleObj: function () {
            this.toggleProperty('isObjExpanded');
        },
        toggleFont: function () {
            this.toggleProperty('isFontExpanded');
        },
        toggleBg: function () {
            this.toggleProperty('isBgExpanded');
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
        var fields = ['text', 'width', 'height', 'x_pos', 'y_pos', 'disabled', 'hint', 'stack', 'recordId', 'type', 'mode'];
        //TODO: style and fontfamily in a select!!!
        var cssFields = ['fontsize', 'fontfamily', 'color', 'style', 'bgColor', 'bgImage'];

        var cssRules = Ember.View.views[this.get('elemid')].get('cssRules');

        if (this.get('elemid') !== null) {

            var canvasElement = Ember.View.views[this.get('elemid')];
            var cssRules = canvasElement.get('cssRules');

            self.set('canvasElement', canvasElement);

            $.each(cssFields, function (value, key) {
                self.set('cssProps.' + key, cssRules[key]);
            });

            $.each(fields, function (value, key) {
                self.set('props.' + key, canvasElement.get(key));
            });

        } else {
            $.each(cssFields, function (value, key) {
                self.set('cssProps.' + key, cssRules[key]);
            });
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
        var types = ['isBtn', 'isInput', 'isText', 'isPanel'];
        var type = this.canvasElement.get('type');

        $.each(types, function(index, element) {
            self.set(element, false);
        });

        var isType = types.filter(function(testType) {
            return testType === "is" + type.charAt(0).toUpperCase() + type.slice(1);
        });

        self.set(isType, true);
    }.observes('elemid'),

    updateMode: function () {
        this.canvasElement.set('mode', this.props.mode);
    }.observes('this.props.mode')
});