Proto.ApplicationController = Ember.ArrayController.extend({
    needs: ['screen', 'index'],
    open: false,
    jsContent: '',
    styleContent: '',
    htmlContentBody: '',
    projects: [

    ],
    init: function(){
      var projects = this.get('store').find('projects');
      this.set('projects', projects);
    },
    actions: {
        createProject: function () {
            this.get('controllers.index').send('createProject');
        },
        exportProject: function() {
          // var JSZip = require('jszip');
          var self = this;
          var zip = new JSZip();
          var img = zip.folder("img");
          var css = zip.folder("css");
          var js = zip.folder("js");

          self.get('jsContent', '');
          self.get('styleContent', '');
          self.get('htmlContentBody', '');

          self.set('styleContent',
              '.btn {\n\tbackground-color: #90daf4;\n\tborder: none;\n\tborder-radius:0px;\n\t-moz-border-radius:0px;\n\t-webkit-border-radius:0px;\n}\n\n' +
              '.input {\n\tborder: 1px solid #ccc;\n\tcolor: #333;\n\tbox-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.075);\n\t-webkit-box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.075);\n\t-moz-box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.075);\n}\n\n' +
              '.panel {\n\tborder: none;\n\tbackground-color: #f3f3f3;\n}\n\n' +
              '.text {\n\tmin-width: 50px;\n\tline-height:40px;\n}\n\n'
          );

          var project_id = window.location.hash.split('/')[2];
          this.get('store').find('projects', project_id).then(function (record) {
              var id = record.get('id');
              var name = record.get('name');
              var screens = record.get('screens');

              screens.then(function (res) {
                  var content = res.get('content');
                  $.each(content, function (k1, screen) {
                      self.set('htmlContentBody', '');
                      var elements = screen.get('elements');
                      $.each(elements, function (k2, element) {
                        var eventList = element.eventList;
                        $.each(eventList, function (k3, event) {
                            self.set('jsContent', self.get('jsContent') + event);
                        });
                        self.set('styleContent', self.get('styleContent') +
                        '#' + element.recordId + ' {'
                        + '\n\t' + 'position: absolute;'
                        + '\n\t' + 'left: ' + element.x_pos + 'px;'
                        + '\n\t' + 'top: ' + element.y_pos + 'px;'
                        + '\n\t' + 'width: ' + (element.width !== null ? element.width : 0) + 'px;'
                        + '\n\t' + 'height: ' + (element.height !== null ? element.height : 0) + 'px;'
                        + '\n\t' + 'z-index: ' + element.stack + ';\n'
                        + '}\n\n');
                        switch (element.type) {
                          case 'btn':
                            var tmpHtml = "\n\t\t<button id=\"" + element.recordId + "\"" + (element.disabled ? " disabled " : " ") + "class=\"" + element.type + "\" title=\"" + element.hint + "\" >" + element.text + "</button>";
                            self.set('htmlContentBody', self.get('htmlContentBody') + tmpHtml);
                            break;
                          case 'input':
                            var tmpHtml = "\n\t\t<input type=\"text\" id=\"" + element.recordId + "\"" + (element.disabled ? " disabled " : " ") + "class=\"" + element.type + "\" placeholder=\"" + element.text + "\" title=\"" + element.hint + "\" />";
                            self.set('htmlContentBody', self.get('htmlContentBody') + tmpHtml);
                            break;
                          case 'panel':
                            var tmpHtml = "\n\t\t<div id=\"" + element.recordId + "\" class=\"" + element.type + (element.disabled ? " disabled " : "") + "\" title=\"" + element.hint + "\" ></div>";
                            self.set('htmlContentBody', self.get('htmlContentBody') + tmpHtml);
                            break;
                          case 'text':
                            var tmpHtml = "\n\t\t<span id=\"" + element.recordId + "\" class=\"" + element.type + (element.disabled ? " disabled " : "") + "\" placeholder=\"" + element.text + "\" title=\"" + element.hint + "\" >" + element.text + "</span>";
                            self.set('htmlContentBody', self.get('htmlContentBody') + tmpHtml);
                            break;
                          default:
                            break;
                        }
                      });
                      var htmlHead = "\t<head>\n\t\t<link rel=\"stylesheet\" href=\"css/styles.css\">\n\t\t<script src=\"//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js\"></script>\n\t\t<script src=\"js/main.js\"></script>\n\t</head>\n";
                      var htmlBody = "\t<body>" + self.get('htmlContentBody') + "\n\t</body>\n"
                      var htmlFile = "<html>\n" + htmlHead + htmlBody + "</html>";


                      zip.file(screen.get('data').name+".html", htmlFile);
                  });
              });
          }).then(function(){
            js.file('main.js', self.get('jsContent'));
            css.file('styles.css', self.get('styleContent'));
            var content = zip.generate({type: "blob"});
            saveAs(content, "protoDesign.zip");
            console.log(zip);
          });
        },
        /**
         * This method is saving project into database but it's still not listed from that same database
         */
        saveProject: function () {

            console.log('saveProject');
            var project_id = window.location.hash.split('/')[2];

            this.get('store').find('projects', project_id).then(function (record) {

                var id = record.get('id');
                var name = record.get('name');
                var screensRel = record.get('screens');

                screensRel.then(
                    function (result) {

                        var screens = [];
                        var content = result.get('content');

                        content.forEach(function (screen) {

                            var elements = screen.get('elements');
                            var cleanElements = [];

                            elements.forEach(function (props) {
                                var cleanProps = {};
                                for (var k in props) {
                                    if (props.hasOwnProperty(k)) { cleanProps[k] = props[k]; }
                                }
                                cleanElements.push(cleanProps);
                            });
                            screens.push({name: screen.get('name'), elements: cleanElements});
                        });

                        $.ajax({
                            url: '/api/projects/' + record.get('project_id'),
                            type: 'PUT',
                            data: {
                                name: name,
                                screens: screens
                            },
                            success: function (response) {
                                console.log('success!');
                                console.log(response);
                            },
                            error: function (response) {
                                console.log('error!');
                                console.log(response);
                            }
                        });

                    }
                );

            });

        },
        openOpenProject: function () {
            this.set('open', true);
        },
        closeOpenProject: function () {
            this.set('open', false);
        },
        chooseProject: function (project) {
            // console.log("chose project " + project.name);
            this.set('open', false);
        },
        runProject: function () {
          this.get('controllers.screen').send('toggleFullscreen');
        }
    }
});
