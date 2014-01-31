Proto.PropertyInspectorComponent = Ember.Component.extend({
    isObjExpanded: true,
    isAttrExpanded: true,
    isStyleExpanded: true,

    isFontExpanded: false,
    isBgExpanded: false,

    isElementSelected: false,
    isEventsSelected: true,

    elemid: null,
    isInput: false,
    isText: false,
    isPanel: false,
    isBtn: false,

    canvasElement: {},
    props: {},

    events: [
        {type: 'click', name: 'Click', isPresent: false},
        {type: 'dblclick', name: 'Double Click', isPresent: false},
        {type: 'mouseover', name: 'Mouse Over', isPresent: false},
        {type: 'mouseout', name: 'Mouse Out', isPresent: false},
        {type: 'focus', name: 'Focus', isPresent: false},
        {type: 'blur', name: 'Blur', isPresent: false}

    ],

    setCodeView: 'setCodeView',

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

    repeats: [
        'repeat',
        'repeat-x',
        'repeat-y',
        'no-repeat'
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
        updatePlaceholder: function(text) {
            this.canvasElement.set('placeholder', text);
        },
        updateURL: function(URL) {
            this.canvasElement.set('URL', URL);
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
        updateBgPositionX: function(pos){
            this.canvasElement.set('bgPositionX', pos);
        },
        updateBgPositionY: function(pos){
            this.canvasElement.set('bgPositionY', pos);
        },
        updateFontSize: function(size) {
            this.canvasElement.set('fontsize', size);
        },
        updateBold: function(){
            this.canvasElement.toggleProperty('bold');
        },
        updateItalic: function() {
            this.canvasElement.toggleProperty('italic');
        },
        updateUnderline: function() {
            this.canvasElement.toggleProperty('underline')
        },
        setCodeView: function (eventType) {
            var elementId = this.get('canvasElement.elementId');
            this.sendAction('setCodeView', elementId, eventType);
        }
    },

    updateHasEvents: function () {
        var self = this;

        function filterEvent (event) {
//            console.log(event);
//            debugger;
            var eventFunction = self.get('canvasElement.eventList')[event];
            if(eventFunction){
                var index = eventFunction.indexOf('function () {');
                return eventFunction.length - index !== 18
            }
        }
//        console.warn('events changed');
//        console.debug('dblclick in eventlist');
//        console.log(this.get('canvasElement.eventList')['dblclick']);
//        var dblclick = this.get('canvasElement.eventList')['dblclick'];

//        var events = ['click', 'dblclick', 'blur', 'focus', 'mouseout', 'mouseover'];

        var events = this.get('events');

//        console.log(this.get('events'));
        $.each(events, function(index, event){
//            console.log(event.isPresent);
            console.log(filterEvent(event.type));
            event.isPresent = filterEvent(event.type);
//            event.set('isPresent', filterEvent(event.type));
            console.log(event.isPresent);
        });

    }.observes('canvasElement.eventList.dblclick','canvasElement.eventList.blur','canvasElement.eventList.click',
        'canvasElement.eventList.focus', 'canvasElement.eventList.mouseout', 'canvasElement.eventList.mouseover'),


    update: function () {

        var self = this;
        // TODO: keep list of properties on one place!!!
        var fields = ['text', 'width', 'height', 'x_pos', 'y_pos', 'disabled', 'hint', 'stack', 'recordId', 'type', 'mode',
            'fontsize', 'fontfamily', 'color', 'style', 'bgColor', 'bgSize', 'bgRepeat', 'bgPositionX', 'bgPositionY', 'bgImage', 'bold',
            'italic', 'underline', 'placeholder'];

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
        this.canvasElement.set('fontfamily', this.get('props')['fontfamily']);
    }.observes('this.props.fontfamily'),

    updateBgRepeat: function () {
        this.canvasElement.set('bgRepeat', this.get('props')['bgRepeat']);
    }.observes('this.props.bgRepeat')

});