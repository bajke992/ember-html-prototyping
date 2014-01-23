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
                        actionContext: {item: ui.draggable, event: event}
                    });
                }

            }
        });

    },

    actions: {
        add: function (attr) {
            Proto.addElement(attr, this);
        }
    }

});


/**
 * Add element on the canvas
 * @param attr
 * @param self
 */
Proto.addElement = function (attr, self) {

    var left = attr.event.pageX - self.$().offset().left;
    var top = attr.event.pageY - self.$().offset().top;

    var map = ['btn', 'input', 'text', 'panel'];
    var className = attr.item.attr('class');
    var type;

    $.each(map, function (key, val) {
        if (className.search(val) !== -1) {
            type = val;
            return false;
        }
    });

    var cmpName = 'Canvas' + type.charAt(0).toUpperCase() + type.slice(1) + 'Component';
    var cmp = Proto[cmpName].create({position: {left: left, top: top}});
    self.pushObject(cmp);

};

