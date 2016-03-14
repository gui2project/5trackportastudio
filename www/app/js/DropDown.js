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

    this.dropDownId = null;     //  The dropDownId of the dropdown element
    this.navigationId = null;   //  The navigationId of the dropdown element

    this.state = false;  //  true for open, false for closed

    /**
     *  @name   init
     *
     *  Initializes the dropdown menu, should be run on load.
     *
     *  @param  dropDownId      The dropDownId of the dropdown element
     *
     */
    this.init = function(dropDownId, navigationId){
        _this.dropDownId = dropDownId;
        _this.navigationId = navigationId;

        // Close on external click
        $(document).mouseup(function (e) {
            if ((!$(_this.dropDownId).is(e.target) &&
                    $(_this.dropDownId).has(e.target).length === 0) &&
                (!$(_this.navigationId).is(e.target) &&
                    $(_this.navigationId).has(e.target).length === 0)){
                    _this.dropdown.close();
                }});

        this.show('INIT');
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
        open: function(open){
            open = _this.default(open, true);
            if (open) {
                $(_this.dropDownId).slideDown( 600 );
                _this.state = true;
            } else {
                _this.dropdown.close();
            }
        },

        /**
         *  @name   close
         *
         *  Closes the menu
         */
        close: function(){
            $(_this.dropDownId).slideUp( 600 );
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

                var container = _this.dropDownId + ' .fx-catalog-panel .content';

                //sort FX catalog by name
                json.sort(function(a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });

                // add items to catalog
                $(container).html("");
                json.forEach(function(item){
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
                    $(_this.dropDownId + ' .mix-catalog-panel').append(htmlObj);
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
                $(_this.dropDownId + ' .account-user-name').html(obj.name);
                $(_this.dropDownId + ' .account-user-email').html(obj.email);
            },

            /**
             *  @name   information
             *
             *  Adds selected item descriptions, titles, images, etc
             *
             *  @param  obj    The json object that holds the extra information
             */
            information: function(obj){
                $(_this.dropDownId + ' .information-panel-title').html(obj.title);
                $(_this.dropDownId + ' .information-panel-image').html(obj.image);
                $(_this.dropDownId + ' .information-panel-desc').html(obj.desc);
                //$(_this.dropDownId + ' .information-panel-actions').html(obj.actions);
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
         *  displays or hdropDownIdes a panel
         */
        display:{
            toggle: function(bool, toggleclass){
                bool ? $(_this.dropDownId + ' ' + toggleclass).addClass("display") :
                        $(_this.dropDownId + ' ' + toggleclass).removeClass("display");
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
                _this.panel.display.toggle(state, '.api-panel' );
            }
        },

        wait: {
            start: function (position) {
               return;
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
                return;
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

    this.navigation = {
        display:{
            toggle: function(bool, toggleclass){
                bool ?  $(_this.navigationId + ' ' + toggleclass).addClass("display") :
                        $(_this.navigationId + ' ' + toggleclass).removeClass("display");
            },
            all: function(state){
                _this.navigation.display.secured(state);
                _this.navigation.display.unsecured(state);
            },
            secured: function(state){
                _this.navigation.display.toggle(state, '.link-sign-out' );
            },
            unsecured: function(state){
                _this.navigation.display.toggle(state, '.link-sign-in' );
                _this.navigation.display.toggle(state, '.link-register' );
            },
            lock: function(state){
                _this.navigation.display.secured(state);
                _this.navigation.display.unsecured(!state);
            }
        }
    };

    this.default = function(opt, def) {
        return (typeof opt === 'undefined') ? def : opt;
    };

    /**
     *  @name   show
     *
     *  Makes the views that the dropdown can hold
     *
     *  @param  view    The view to display
     */
    this.show = function(view, opt, open){

        var url, success, pre, fail, state;

        opt = _this.default(opt, false);
        open = _this.default(open, true);
        state = true;

        if (view == 'TOGGLE'){
            this.dropdown.toggle();
            return;
        }

        this.panel.display.all(false);
        this.navigation.display.lock(opt);

        switch (view){
            case 'ALL':
                this.panel.display.all(true);
                this.dropdown.open(open);
                return;

            case 'INIT':

                this.panel.display.toggle(state, '.login-panel' );
                this.panel.display.toggle(state, '.register-panel' );
                this.panel.display.toggle(state, '.about-panel' );
                return;

            case 'FX':
                url = "/api/get/effects";
                pre = function(){_this.panel.wait.start('RIGHT');};
                success = function(data){
                    _this.panel.set.fxCatalog(data);
                    _this.panel.wait.stop('RIGHT');

                    _this.panel.display.toggle(true, '.fx-catalog-panel' );
                    _this.panel.display.toggle(true, '.account-panel-name' );

                    _this.dropdown.open(open);
                };
                fail = function(data) {
                    alert('ERROR');
                    _this.panel.wait.stop('RIGHT');

                    _this.panel.display.toggle(true, '.fx-catalog-panel' );
                    _this.panel.display.toggle(true, '.account-panel-name' );

                    _this.dropdown.open(open);
                }

                this.panel.load(url, pre, success, fail);

                return;

            case 'MIX':
                this.panel.display.toggle(state, '.mix-catalog-panel' );

                var url = '/api/get/user/' + ts.user_id;
                var pre = function(){
                    _this.panel.wait.start('LEFT');
                };
                var success = function(data){
                    _this.panel.set.account(data);
                    _this.panel.wait.stop('LEFT');
                    _this.panel.display.toggle(state, '.account-panel' )
                };
                var fail = function(data){
                    _this.panel.set.account({name: 'Unknown user name', email: 'Unknown user email'});
                    _this.panel.wait.stop('LEFT');
                    _this.panel.display.toggle(state, '.account-panel' )
                };

                _this.panel.load(url, pre, success, fail);
                this.dropdown.open(open);
                return;

            case 'LOGIN':
                this.panel.display.toggle(state, '.login-panel' );
                this.panel.display.toggle(state, '.about-panel' );
                this.dropdown.open(open);
                return;
            case 'REGISTER':
                this.panel.display.toggle(state, '.register-panel' );
                this.panel.display.toggle(state, '.about-panel' );
                this.dropdown.open(open);
                return;
            case 'API':

                url = '/api/get/help/';
                pre = function(){
                    $("#api").html('');
                    _this.panel.wait.start('RIGHT');
                };
                success = function(data) {
                    data.forEach(function(item){
                        var opt, params, desc, url, pn, pd, po;
                        pn = pd = po = params = desc = '';

                        item.param.forEach(function(param){
                            for ( var key in param) {
                                //console.log(key, param[key].desc );
                                pn = key;
                                pd = param[key].desc;
                                po = '';
                                po = param[key].opt.join(' | ');

                                params += '<div class="api-row-tabbed"><span class="api-item-param">' + pn +'</span><span class="api-item-param-description">' + pd + '</span></div>';
                                if (po) params += '<div class="api-row-options"><span class="api-item-param-options">'+ po + '</span></div>';
                            }
                        });

                        url = '<div class="api-row"><span class="api-item-url">' + item.url + '</span></div>'

                        desc = '<div class="api-row-tabbed"><span class="api-item">' + item.desc + '</span></div>';
                        html = '<div class="api-entry row form-group col-md-12 col-sm-12 col-xs-12">' + url + params + desc + '</div>'

                        $("#api").append(html);
                    });
                    //_this.panel.wait.stop('RIGHT');
                    _this.panel.display.toggle(state, '.api-panel' );
                };

                fail = function(){ console.log('api-failed'); _this.panel.wait.stop('RIGHT');};
                _this.panel.load(url, pre, success, fail);
                this.dropdown.open(open);
                return;

        }
    };
};