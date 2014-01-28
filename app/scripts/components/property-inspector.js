Proto.PropertyInspectorComponent = Ember.Component.extend({
    isAttrExpanded: false,
    isStyleExpanded: true,
    isObjExpanded: false,
    isFontExpanded: true,
    isBgExpanded: true,
    isElementSelected: true,
    isEventsSelected: false,

    elemid: null,
    isInput: false,
    isText: false,
    isPanel: false,
    isBtn: false,

    canvasElement: {},
    props: {},
    defaultFont: "Myriad Pro",
    fontFamilies: [
        {font: 'Calibri', title: 'Calibri'},
        {font: 'Century Gothic', title: 'Century Gothic'},
        {font: 'Garamond', title: 'Garamond'},
        {font: 'Georgia', title: 'Georgia'},
        {font: 'Helvetica', title: 'Helvetica'},
        {font: 'Helvetica Neue Light', title: 'Helvetica Neue Light'},
        {font: 'Lucida Sans', title: 'Lucida Sans'},
        {font: 'Myriad Pro', title: 'Myriad Pro'},
        {font: 'Times New Roman', title: 'Times New Roman'},
        {font: 'Verdana', title: 'Verdana'}
    ],

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
        },
        updateColor: function (color) {
            this.canvasElement.set('color', color);
        },
        updateBgColor: function (color){
            this.canvasElement.set('bgColor', color);
        },
        updateBgImage: function (image){
            this.canvasElement.set('bgImage', image);
        },
        updateFontSize: function(size) {
            this.canvasElement.set('fontsize', size);
        },
        updateStyle: function(style) {
            this.canvasElement.set('style', style);
        }
    },


    update: function () {

        var self = this;
        // TODO: keep list of properties on one place!!!
        var fields = ['text', 'width', 'height', 'x_pos', 'y_pos', 'disabled', 'hint', 'stack', 'recordId', 'type', 'mode',
            'fontsize', 'fontfamily', 'color', 'style', 'bgColor', 'bgImage'];

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
    }.observes('this.props.mode'),

    updateFontFamily: function () {
        console.log('font family changed');
        console.log(this.get('props')['fontfamily']);
        this.canvasElement.set('fontfamily', this.get('props')['fontfamily']);
    }.observes('this.props.fontfamily')

});