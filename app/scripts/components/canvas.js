/**
 * Canvas view which hold canvas container
 * @type {*}
 */
Proto.Canvas = Ember.View.extend({
    templateName: 'components/canvas',
    didInsertElement: function () {

        this.$('.toolbar > div').draggable({
            revert: "invalid",
            containment: "document",
            helper: "clone",
            cursor: "move"
        });

        var elements = this.get('content').get('model.elements');
        console.log(elements);

    }
});

/**
 * Canvas container view which hold canvas components
 * @type {*}
 */
Proto.CanvasContainer = Ember.ContainerView.extend(Ember.TargetActionSupport, {
    classNames: ['canvas'],
    addAction: 'addToCanvas',

    didInsertElement: function () {

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

        var elements = this.get('content').get('model.elements');

        console.log(elements);

        $.each(elements, function (key, params) {

            self.triggerAction({
                action: 'add',
                target: self,
                actionContext: params
            });

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

    if (attr.item === undefined) {
        type = attr.type;
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
    }

    var cmpName = 'Canvas' + type.charAt(0).toUpperCase() + type.slice(1) + 'Component';
    var cmp = Proto[cmpName].create({data: {left: left, top: top, insert: attr.insert}});
    self.pushObject(cmp);

};

