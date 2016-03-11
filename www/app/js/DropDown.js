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
        },

        /**
         *  @name   close
         *
         *  Closes the menu
         */
        close: function(){
            $(_this.id).slideUp( 600 );
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
                //sort FX catalog by name
                json.sort(function(a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });

                // add items to catalog
                json.forEach(function(item){
                    var htmlObj = item;
                    $(_this.id + ' .fx-catalog-panel').append(htmlObj);
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
                $(_this.id + ' .information-panel-actions').html(obj.actions);
            }
        },
        // api loaders
        load: {

            /**
             *  @name mixCatalog
             *
             *  retrieves mixCatalog information for display
             *
             *  @return     data    the information retrieved
             */
            mixCatalog: function(){
                // /api/get/projects/user/:id
            },

            /**
             *  @name account
             *
             *  retrieves account information for display
             *
             *  @return     data    the information retrieved
             */
            account: function(){
                // /api/get/user/:id
            }
        },

        /**
         *  @name display
         *
         *  displays or hides a panel
         */
        display: function(bool, toggleclass){
            bool ? $(_this.id + ' ' + toggleclass).addClass("display") :
                   $(_this.id + ' ' + toggleclass).removeClass("display");
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

        var state = false;

        this.panel.display(state, '.fx-catalog-panel' );
        this.panel.display(state, '.account-panel-name' );
        this.panel.display(state, '.mix-catalog-panel' );
        this.panel.display(state, '.login-panel' );
        this.panel.display(state, '.register-panel' );
        this.panel.display(state, '.information-panel' );
        this.panel.display(state, '.about-panel' );
        this.panel.display(state, '.contact-panel' );

        state = true;

        switch (view){
            case 'FX':
                this.panel.display(state, '.fx-catalog-panel' );
                this.panel.display(state, '.account-panel-name' );
                this.dropdown.open();
                return;

            case 'MIX':
                this.panel.display(state, '.mix-catalog-panel' );
                this.panel.display(state, '.account-panel-name' );
                this.dropdown.open();
                return;

            case 'LOGIN':
                this.panel.display(state, '.login-panel' );
                this.panel.display(state, '.about-panel' );
                this.dropdown.open();
                return;

            case 'REGISTER':
                this.panel.display(state, '.register-panel' );
                this.panel.display(state, '.about-panel' );
                this.dropdown.open();
                return;

        }
    };
};