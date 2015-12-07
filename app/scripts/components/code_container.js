Proto.CodeContainer = Ember.View.extend(Ember.TargetActionSupport, {
    init: function () {
        this.set("initialized", false);
        this._super();
    },

    classNames: ['code'],
    templateName: "editor/code",
    updateRecordEvents: 'updateRecordEvents',
    activeElement: null,
    oldEvent: null,

    valueWillChange: function(obj, keyName, value){
        this.set('oldEvent', this.get('controller.eventType'));
    }.observesBefore('controller.eventType'),

    eventTypeChanged: function () {

        if (!this.get("initialized")) {
            var textArea = document.getElementById("text-area");
            this.set('editor', CodeMirror.fromTextArea(textArea, {
                lineNumbers: true,
                mode: "javascript",
                autofocus: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                gutters: ["CodeMirror-lint-markers"],
                lint: true,
                extraKeys: {"Ctrl-Space": "autocomplete"}
            }));
            this.set("initialized", true);
        }

        var elementId = this.get('controller.elementId');
        this.set('activeElement', Ember.View.views[elementId]);

//        for changes in events from the property inspector
        if (this.get('isVisible')) { //this.get('activeElement') && this.get('activeElement.elementId') !== "document")
            this.triggerAction({
                action: 'save',
                target: this
            });
        }
    }.observes('controller.eventType'),

    becameVisible: function () {
        this.get('editor').refresh();
        if (this.get('initialized')) {
            this.triggerAction({
                action: 'edit',
                target: this
            });
        }
    },

    becameHidden: function(){
      this.triggerAction({
          action: 'save',
          target: this
      });
    },

    actions: {
        save: function () {
          console.log('save');
          var self = this;
          var text = self.get('editor').getDoc().getValue();
          var tmpLines = text.split(/\n\$/g);
          var lines = [];
          var elements = self.get('controller.elements');

          $.each(tmpLines, function(key, val){
            lines[key] = val[0] === "$" ? val + "\n" : "$" + val + "\n";
          });

          $.each(lines, function(key, val){
            var id = val.match(/((#btn(\d)+)|(#input(\d)+)|(#text(\d)+)|(#panel(\d)+))/gm);
            var event = val.match(/blur|click|dblclick|focus|mouseout|mouseover|ready/gm);
            if(id !== null && id !== undefined){
              $.each(elements, function(key1, val1){
                if("#"+val1.recordId === id[0]){
                  val1.eventList[event] = val;
                  self.get('controller').send('updateRecordEvents', {
                    recordId: val1.recordId,
                    eventList: val1.eventList
                  });
                }
              });
            }
          });
        },
        edit: function () {
          // console.log('edit');
          var self = this;
          var eventMap = [ 'blur', 'click', 'dblclick', 'focus', 'mouseout', 'mouseover', 'ready' ];
          var elements = self.get('controller.elements');
          var text = "";

          $.each(elements, function(k, v){
            var elementId = v.elementId;
            var activeElement = Ember.View.views[elementId];
            var eventList = activeElement.eventList;
            $.each(eventMap, function(key, val){
              var code = eventList[val] || "";
              elementId = "\"#" + v.recordId + "\"";
              text += code === "" ? "$(" + elementId + ")." + val + "(function(){\n" + code + "\n});\n\n" : code;
            });
          });

          var jseditor = self.get('editor')
          jseditor.getDoc().setValue(text);

          var lines = jseditor.getDoc().getValue().split(/\n/g);
          $.each(lines, function(key, val){
            if(val.match(/\$|(}\);)/)){
              jseditor.getDoc().markText(
                {line: key, ch: 0},
                {line: key, ch: 100},
                {readOnly: true, className: 'read-only'}
              );
            }
            // console.log('edit done');
          });
        }
    }

});
