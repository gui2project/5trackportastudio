/**
 *  @file   DropDown.js
 *
 *  Contains the class for the dropdown menu.
 */

/**
 *  @name   DropDown
 *
 *  This is the dropdown class it determines what content is
 *  displayed in the menu.
 *
 */
var DropDown = function(){

    var _this = this;

    this.id = null;     //  The id of the dropdown element
    this.state = false;  //  true for open, false for closed

    /**
     *  @name   init
     *
     *  Initializes the dropdown menu, should be run on load.
     *
     *  @param  id      The id of the dropdown element
     *
     */
    this.init = function(id){
        this.setId(id);
        this.show('INIT');
    };

    /**
     *  @name   setId
     *
     *  Sets the dropdown id
     *
     *  @param  myid    The id of the dropdown element
     */
    this.setId = function(myid){
        _this.id = myid;
    };

    /**
     *  @name   dropdown
     *
     *  Dropdown actions
     */
    this.dropdown = {
        /**
         *  @name   open
         *
         *  Opens the menu
         */
        open: function(){
            $(_this.id).slideDown( 600 );
            _this.state = true;
        },

        /**
         *  @name   close
         *
         *  Closes the menu
         */
        close: function(){
            $(_this.id).slideUp( 600 );
            _this.state = false;
        },

        /**
         *  @name   toggle
         *
         *  Toggles the dropdown
         */
         toggle: function(){
             _this.state ? _this.dropdown.close() : _this.dropdown.open() ;
        }
    };

    /**
     *  @name   panel
     *
     *  Panel actions
     */
    this.panel = {
        // setters
        set: {
            /**
             *  @name   fxCatalog
             *
             *  Adds effects to the fx catalog
             *
             *  @param  json    The json object that holds the effects information
             */
            fxCatalog: function(json){

                var container = _this.id + ' .fx-catalog-panel .content';

                //sort FX catalog by name
                json.sort(function(a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });

                // add items to catalog
                $(container).html("");
                json.forEach(function(item){
                    console.log(item);
                    var title = '<span class="fx-catalog-panel-item-title">' + item.title + '</span';
                    var desc = '<span class="fx-catalog-panel-item-desc">' + item.desc + '</span';
                    var image = '<span class="fx-catalog-panel-item-image">' + item.image + '</span';

                    var htmlObj = '<div class="fx-catalog-panel-item">' +image+title+desc+ '</div>';

                    $(container).append(htmlObj);
                });
            },

            /**
             *  @name   fxCatalog
             *
             *  Adds mixes to the mix catalog
             *
             *  @param  json    The json object that holds the mix information
             */
            mixCatalog: function(json){
                //sort mix catalog by name
                json.sort(function(a, b){
                    if(a.date < b.date) return -1;
                    if(a.date > b.date) return 1;
                    return 0;
                });

                // add items to catalog
                json.forEach(function(item){
                    var htmlObj = item;
                    $(_this.id + ' .mix-catalog-panel').append(htmlObj);
                });
            },

            /**
             *  @name   account
             *
             *  Adds account information
             *
             *  @param  obj    The json object that holds the account information
             */
            account: function(obj){
                $(_this.id + ' .account-panel-name').html(obj.name);
                $(_this.id + ' .account-panel-email').html(obj.email);
            },

            /**
             *  @name   information
             *
             *  Adds selected item descriptions, titles, images, etc
             *
             *  @param  obj    The json object that holds the extra information
             */
            information: function(obj){
                $(_this.id + ' .information-panel-title').html(obj.title);
                $(_this.id + ' .information-panel-image').html(obj.image);
                $(_this.id + ' .information-panel-desc').html(obj.desc);
                //$(_this.id + ' .information-panel-actions').html(obj.actions);
            }
        },

        // api loaders
        load: function(url, pre, success, fail){
            pre();

            $.ajax({
                url: url
            }).done(success).fail(fail);
        },

        /**
         *  @name display
         *
         *  displays or hides a panel
         */
        display:{
            toggle: function(bool, toggleclass){
                bool ? $(_this.id + ' ' + toggleclass).addClass("display") :
                        $(_this.id + ' ' + toggleclass).removeClass("display");
            },
            all: function(state){
                _this.panel.display.left(state);
                _this.panel.display.right(state);
            },
            left: function(state){
                _this.panel.display.toggle(state, '.account-panel' );
                _this.panel.display.toggle(state, '.login-panel' );
                _this.panel.display.toggle(state, '.register-panel' );
                _this.panel.display.toggle(state, '.information-panel' );
            },
            right: function(state){
                _this.panel.display.toggle(state, '.fx-catalog-panel' );
                _this.panel.display.toggle(state, '.mix-catalog-panel' );
                _this.panel.display.toggle(state, '.about-panel' );
                _this.panel.display.toggle(state, '.contact-panel' );
            }
        },

        wait: {
            start: function (position) {
                switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }
            },
            stop: function (position) {
                switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }
            }
        }

    };

    /**
     *  @name   show
     *
     *  Makes the views that the dropdown can hold
     *
     *  @param  view    The view to display
     */
    this.show = function( view ){

        var url, success, pre, fail, state;
        var url1 = "/api/get/projects/user/56e154d5cc33fe584c3756a8";
            //var url = "/api/get/projects/user/:id";

            var url2 = "/api/get/user/56e154d5cc33fe584c3756a8";
        if (view == 'TOGGLE'){
            this.dropdown.toggle();
            return;
        }

        this.panel.display.all(false);

        state = true;

        switch (view){
            case 'ALL':
                this.panel.display.all(true);
                this.dropdown.open();
                return;

            case 'INIT':
                this.panel.display.toggle(state, '.login-panel' );
                this.panel.display.toggle(state, '.register-panel' );
                this.panel.display.toggle(state, '.about-panel' );
                return;

            case 'FX':
                url = "/api/get/effects";
                pre = function(){
                    _this.panel.wait.start('RIGHT');
                };
                success = function(data){
                    console.log(data);
                    _this.panel.set.fxCatalog(data);
                    _this.panel.wait.stop('RIGHT');

                    _this.panel.display.toggle(true, '.fx-catalog-panel' );
                    _this.panel.display.toggle(true, '.account-panel-name' );

                    _this.dropdown.open();
                };
                fail = function(data) {
                    console.log(data);
                    alert('ERROR');
                    _this.panel.wait.stop('RIGHT');

                    _this.panel.display.toggle(true, '.fx-catalog-panel' );
                    _this.panel.display.toggle(true, '.account-panel-name' );

                    _this.dropdown.open();
                }

                this.panel.load(url, pre, success, fail);

                return;

            case 'MIX':
                this.panel.display.toggle(state, '.mix-catalog-panel' );
                this.panel.display.toggle(state, '.account-panel-name' );
                this.dropdown.open();
                return;

            case 'LOGIN':
                this.panel.display.toggle(state, '.login-panel' );
                this.panel.display.toggle(state, '.about-panel' );
                this.dropdown.open();
                return;

            case 'REGISTER':
                this.panel.display.toggle(state, '.register-panel' );
                this.panel.display.toggle(state, '.about-panel' );
                this.dropdown.open();
                return;
        }
    };
};