Proto.PropertyInspectorComponent = Ember.Component.extend({
    isAttrExpanded: false,
    isStyleExpanded: false,
    isObjExpanded: true,
    isEventsExpanded: false,
    isFontExpanded: false,
    isBgExpanded: false,

    elemid: null,
    canvasElement: {},
    props: {},

    didInsertElement: function () {
        this.set('props.text', 'TEST');
    },

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
        }
    },

    actions: {
//        editTitle: function(){
//            var titleObject = this.get('title');
//            var title = titleObject.title;
//            var id = titleObject.id;
//            this.sendAction('action', title, id);
//        },
        updateText: function (text) {

//            var elemid = this.get('elemid');

            this.canvasElement.set('text', text);
            this.canvasElement.set('width', 300);


            //console.log(params);
            //console.log(this.get('elementId'));
        }
    },

    update: function () {

        var canvasElement = Ember.View.views[this.get('elemid')];
        this.set('canvasElement', Ember.View.views[this.get('elemid')]);

        this.set('props.text', canvasElement.get('text'));

    }.observes('elemid')
});

