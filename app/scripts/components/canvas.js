/**
 * Canvas view which hold canvas container
 * @type {*}
 */
Proto.Canvas = Ember.View.extend({
    templateName: 'components/canvas',
    didInsertElement: function () {
      // console.log('Canvas didInsertElement');
        this.$('.toolbar > div').draggable({
            revert: "invalid",
            containment: "document",
            helper: "clone",
            cursor: "move"
        });
    },

    actions: {
        chooseTheme: function(theme) {
            console.log('theme', theme);
            // console.log(Ember.View.views['document'].get('theme'));
            Ember.View.views.document.set('theme', theme);
            // console.log(Ember.View.views['document'].get('theme'));
        }
    }
});

/**
 * Canvas container view which hold canvas components
 * @type {*}
 */
Proto.CanvasContainer = Ember.ContainerView.extend(Ember.TargetActionSupport, {
    classNames: ['canvas'],
    classNameBindings: ['theme'],

    showDropDown: false,

    theme: 'flat',


    parentViewDidChange: function () {
        console.log('parent change');
    },

    didInsertElement: function () {
      // console.log('CanvasContainer didInsertElement');
        var self = this;

        self.$().selectable({
            filter: ".canvas-element"
        });

        self.$().droppable({
            accept: ".toolbar > div, .canvas > .canvas-element",
            activeClass: "over",
            drop: function( event, ui ) {

                var add = (ui.draggable.attr('class').search('canvas-element') === -1) ? true : false;

                if (add) {
                    self.triggerAction({
                        action: 'add',
                        target: self,
                        actionContext: {item: ui.draggable, event: event, insert: true}
                    });
                }

            }
        });

    },

    actions: {
        add: function (attr) {
            Proto.addElement(attr, this);
        }
    },

    eventList: {}

});


/**
 * Add element on the canvas
 * @param attr
 * @param self
 */
Proto.addElement = function (attr, self) {

    var left = (attr.event !== undefined) ? attr.event.pageX - self.$().offset().left : attr.x_pos;
    var top = (attr.event !== undefined) ? attr.event.pageY - self.$().offset().top : attr.y_pos;

    var type;
    var recordId;
    var eventList;
    var elementId;

    if (attr.item === undefined) {
        type = attr.type;
        recordId = attr.recordId;
        elementId = attr.elementId;
        eventList = attr.eventList;
    } else {
        var map = ['btn', 'input', 'text', 'panel'];
        var className = attr.item.attr('class');

        // TODO: this can be done better, without need to loop and compare each valid class
        $.each(map, function (key, val) {
            if (className.search(val) !== -1) {
                type = val;
                return false;
            }
        });

        // recordId = 'cmp-' + (new Date()).getTime();
        var time = (new Date()).getTime();
        recordId = type + time;
        elementId = null;
    }

    var cmpName = 'Canvas' + type.charAt(0).toUpperCase() + type.slice(1) + 'Component';
    var cmp = Proto[cmpName].create({data: {left: left, top: top, insert: attr.insert, recordId: recordId, eventList: eventList || {}, elementId: elementId}});
    // console.log("Proto.addElement");
    self.pushObject(cmp);

};
