/**
 *  Contains the class for the DropDown menu.
 *
 *  @name   DropDown.js
 */

/**
 *  This is the DropDown class it determines what content is
 *  displayed in the menu.
 *
 *  @class   DropDown
 */
function DropDown() {

    var _this = this;

    this.dropDownId = null; //  The dropDownId of the DropDown element
    this.navigationId = null; //  The navigationId of the DropDown element
    this.state = false; //  True for open, false for closed
    this.speed = 400; //  Speed of DropDown animation
    this.history = [];

    /**
     *  Initializes the DropDown menu, should be run on load.
     *
     *  Examples:
     *
     *      var dropDown = new DropDown();
     *      ...
     *      dropDown.init({
     *          {String} dropDownId: The DropDown id of the DropDown element,
     *          {String} navigationId: The navigation menu id of the DropDown element
     *      });
     *
     *  @method  DropDown.init
     *  @param  {Object}    Object  The initialization object
     */
    this.init = function (obj) {
        console.log('--- Initializing dropdown with:', obj);

        // Set values
        _this.dropDownId = dVar(obj.dropDownId, '');
        _this.navigationId = dVar(obj.navigationId, '');
        _this.speed = dVar(obj.speed, 400);

        _this.panel.set.fxCatalog();
        // Close on external click
        $(document)
            .mouseup(function (e) {

                if ($(e.target)
                    .is(['.trip-content',
                        '.trip-block',
                        '.trip-next',
                        '.trip-prev',
                        '.trip-close'
                    ].join(', '))) {
                    console.log(e.target);
                    return;
                }

                if (_this.state &&
                    (!$(_this.dropDownId)
                        .is(e.target) &&
                        $(_this.dropDownId)
                        .has(e.target)
                        .length === 0) &&
                    (!$(_this.navigationId)
                        .is(e.target) &&
                        $(_this.navigationId)
                        .has(e.target)
                        .length === 0)) {

                    console.log('closing on external click');
                    _this.dropdown.close();
                }
            });
    };

    //  Keeps track of panel state history
    this.stateHistory = {
        /**
         *  Adds a non duplicate state.
         *
         *  @method DropDown.stateHistory.push
         *  @param  {String}    State to add
         */
        push: function (view) {

            if (_this.history[_this.history.length - 1] === view) {
                return;
            }

            _this.history.push(view);
        },

        /**
         *  Gets last state, and removes it. Always leaves the first state.
         *
         *  @method DropDown.stateHistory.pop
         *  @return {String}    The last state
         */
        pop: function () {

            if (_this.history.length === 1) {
                return _this.stateHistory.top();
            }

            return _this.history.pop();
        },

        /**
         *  Gets current state.
         *
         *  @method DropDown.stateHistory.top
         *  @return {String}    The current state.
         */
        top: function () {
            var popped = _this.history.pop();

            _this.history.push(popped);

            return popped;
        },
        /**
         *  Gets all the stored states, where the index corresponds to the order.
         *
         *  @method DropDown.stateHistory.top
         *  @return {Array.String}    Array of states.
         */
        all: function () {
            return _this.history;
        }
    };

    //  DropDown
    this.dropdown = {
        /**
         *  Opens the DropDown menu
         *
         *  @method   DropDown.open
         *  @param  {Integer} speed The speed to open the dropdown.
         */
        open: function (speed) {
            var cssScroll = {
                hidden: {
                    'overflow': 'hidden'
                },
                on: {
                    'overflow': ''
                }
            };

            speed = dVar(speed, _this.speed);

            console.log('  Opening "dropdown"');

            $(_this.dropDownId)
                .find('.holder')
                .css(cssScroll.hidden)
                .end()
                .find('.dropdown-left')
                .css(cssScroll.hidden)
                .fadeIn(speed)
                .end()
                .find('.dropdown-right')
                .css(cssScroll.hidden)
                .fadeIn(speed)
                .end()
                .slideDown(speed, function () {
                    _this.state = true;
                    setTimeout(function () {
                        $(_this.dropDownId)
                            .find('.holder')
                            .css(cssScroll.on)
                            .end()
                            .find('.dropdown-left')
                            .css(cssScroll.on)
                            .end()
                            .find('.dropdown-right')
                            .css(cssScroll.on)
                            .end();
                    }, speed);
                });
        },

        /**
         *  Closes the DropDown menu
         *
         *  @method   DropDown.close
         *  @param {Integer} speed The speed to close the dropdown
         */
        close: function (speed) {
            var cssScroll = {
                hidden: {
                    'overflow': 'hidden'
                },
                on: {
                    'overflow': ''
                }
            };

            speed = dVar(speed, _this.speed);

            console.log('  Closing "dropdown"');

            $(_this.dropDownId)
                .find('.holder')
                .css(cssScroll.hidden)
                .end()
                .find('.dropdown-left')
                .css(cssScroll.hidden)
                .fadeOut(speed)
                .end()
                .find('.dropdown-right')
                .css(cssScroll.hidden)
                .fadeOut(speed)
                .end()
                .slideUp(speed, function () {
                    _this.state = false;
                    setTimeout(function () {
                        $(_this.dropDownId)
                            .find('.holder')
                            .css(cssScroll.on)
                            .end()
                            .find('.dropdown-left')
                            .css(cssScroll.on)
                            .end()
                            .find('.dropdown-right')
                            .css(cssScroll.on)
                            .end();

                    }, speed);
                });
        },

        /**
         *  Toggles the DropDown
         *
         *  @method  DropDown.toggle
         */
        toggle: function () {
            if (_this.state) {
                _this.dropdown.close();
                return;
            }
            _this.dropdown.open();
        }
    };

    // Panel actions
    this.panel = {
        // setters
        set: {
            /**
             *  Adds effects to the fx catalog
             *
             *  Examples:
             *
             *      var dropDown = new DropDown();
             *      ...
             *      dropDown.panel.set.fxCatalog();
             *
             *  @method     DropDown.panel.set.fxCatalog
             */
            fxCatalog: function () {
                console.log('dropdown.panel.set.fxCatalog');
                var container = _this.dropDownId + ' .fx-catalog-panel .content';

                _this.panel.load({
                        url: '/api/get/doc/fx-catalog'
                    }, function () {
                        //  Clear catalog
                        $(container)
                            .html('');
                    },
                    function (data) {
                        //  sort FX catalog by name
                        data.sort(function (a, b) {
                            if (a.title < b.title) {
                                return -1;
                            }
                            if (a.title > b.title) {
                                return 1;
                            }
                            return 0;
                        });

                        //  Add remove item to begining
                        data.unshift({
                            title: 'Remove',
                            desc: 'Remove the effect applied to a track.',
                            image: '/app/img/effects/system-delete-212121.png',
                            objArray: 'track',
                            func: 'toggleEffect',
                            parameter: 'CLEAR'
                        });

                        //  add items to catalog
                        data.forEach(function (item) {

                            //  Build effect button
                            item.id = ('effect-item-' + item.title)
                                .toLowerCase()
                                .replace(/\s/g, '');

                            item.src = item.image ? item.image : '/app/img/favicon-black.png';

                            //  Add effect button
                            $(container)
                                .append($('<div></div>')
                                    .addClass(['col-lg-2', 'col-md-2', 'col-sm-4', 'col-xs-4', 'square-wrapper'].join(' '))
                                    .append($('<button></button>')
                                        .addClass(['square-inner', 'fx-catalog-panel-item'].join(' '))
                                        .attr('id', item.id)
                                        .append($('<img/>')
                                            .addClass(['fx-catalog-panel-item-image', 'square-image-centered'].join(' '))
                                            .attr('src', item.src))
                                        .append('<br/>')
                                        .append($('<span></span>')
                                            .addClass('fx-catalog-panel-item-title')
                                            .html(item.title))));

                            //  Add Handler
                            $('#' + item.id)
                                .on('click', function () {

                                    trackNumber = parseInt($('main')
                                        .attr('data-effect-switch'));

                                    if (item.title === 'Remove') {
                                        item.src = '/app/img/effects/system-add-212121.png';
                                    }

                                    //Turn on effect
                                    window[item.objArray][trackNumber][item.func](item.parameter);

                                    //  Update effect image on track
                                    $('#track-' + (1 + trackNumber))
                                        .find('.fx-box img')
                                        .attr('src', item.src);

                                    _this.show('BACK');

                                })
                                .mouseover(function () {
                                    _this.panel.set.information(item);
                                    _this.panel.display.toggle(true, '.information-panel');
                                });
                        });
                    },
                    function () {
                        console.log('dropdown.panel.set.fxCatalog: Error');
                        $(container)
                            .html('There was a problem loading the FX-Catalog.');
                    });
            },

            /**
             *  Adds mixes to the mix catalog
             *
             *  Examples:
             *
             *      var dropDown = new DropDown();
             *      ...
             *      dropDown.panel.set.mixCatalog([{
             *              {String} title = The title of an mixObj,
             *              {String} date  = The date of a mixObj creation,
             *              {String} image = The URL to the icon image of an mixObj
             *          },
             *          ...
             *      ]);
             *
             *  @method     DropDown.panel.set.mixCatalog
             *  @param      {Array.mixObj}      json   An array of mixObjects
             */
            mixCatalog: function (json) {
                console.log('dropdown.panel.set.mixCatalog');

                //sort mix catalog by name
                json.sort(function (a, b) {
                    if (a.date < b.date) {
                        return -1;
                    }
                    if (a.date > b.date) {
                        return 1;
                    }
                    return 0;
                });

                // add items to catalog
                json.forEach(function (item) {

                    $(_this.dropDownId)
                        .find('.mix-catalog-panel')
                        .append(item);
                });
            },

            /**
             *  Sets the account panel information
             *
             *  Examples:
             *
             *      var dropDown = new DropDown();
             *      ...
             *      dropDown.panel.set.account();
             *
             *  @method DropDown.panel.set.account
             */
            account: function () {
                _this.panel.load({
                    url: '/api/post/find-user/',
                    method: 'POST',
                    data: {
                        id: ts.user_id
                    }
                }, function () {
                    console.log('MIX', ts);
                }, function (data) {

                    $(_this.dropDownId)
                        .find('.account-user-name')
                        .html(data.name)
                        .end()
                        .find('.account-user-email')
                        .html(data.email);

                }, function (data) {

                    $(_this.dropDownId)
                        .find('.account-user-name')
                        .html('Unknown user name')
                        .end()
                        .find('.account-user-email')
                        .html('Unknown user email');

                });
            },

            /**
             *  Sets the api panel information
             *
             *  Examples:
             *
             *      var dropDown = new DropDown();
             *      ...
             *      dropDown.panel.set.api();
             *
             *  @method DropDown.panel.set.api
             */
            api: function () {
                _this.panel.load({
                    url: '/api/get/help/'
                }, function () {
                    $('#api')
                        .html('');
                }, function (data) {
                    data.forEach(function (item) {
                        var params = '',
                            paramOptions = '';

                        item.param.forEach(function (param) {
                            for (var key in param) {
                                paramOptions = param[key].opt.join(' | ');

                                item.url = item.url.replace(key,
                                    '<span class="api-url-param">' + key + '</span>');

                                params = $('<div></div>')
                                    .append($('<div></div>')
                                        .addClass('api-row-tabbed')
                                        .append($('<span></span>')
                                            .addClass('api-item-param')
                                            .html(key))
                                        .append($('<span></span>')
                                            .addClass('api-item-param-description')
                                            .html(param[key].desc)));

                                if (paramOptions) {
                                    params = params.append($('<div></div>')
                                        .addClass('api-row-options')
                                        .append($('<span></span>')
                                            .addClass('api-item-param-options')
                                            .html(paramOptions)));
                                }
                            }
                        });

                        $('#api')
                            .append($('<div></div>')
                                .addClass(['panel-entry', 'row', 'form-group', 'col-md-12', 'col-sm-12', 'col-xs-12'].join(' '))
                                .append($('<div></div>')
                                    .addClass('api-row')
                                    .append($('<span></span>')
                                        .addClass('api-item-url')
                                        .html(item.url)))
                                .append(params)
                                .append($('<div></div>')
                                    .addClass('api-row-tabbed')
                                    .append($('<span></span>')
                                        .addClass('api-item')
                                        .html(item.desc))));
                    });
                }, function () {
                    console.log('api-failed');
                });
            },
            /**
             *  Adds selected item descriptions, titles, images, etc
             *
             *  Examples:
             *
             *      var dropDown = new DropDown();
             *      ...
             *      dropDown.panel.set.information({
             *          {String}    title:   The title of the information being displayed
             *          {URL}       image:   The URL of an image to display
             *          {String}    desc:    The description of the content being displayed
             *      });
             *
             *  @method DropDown.panel.set.information
             *  @param  {Object}    obj     The selected item information object
             */
            information: function (obj) {
                console.log('dropdown.panel.set.information', obj);

                $(_this.dropDownId)
                    .find('.information-panel')
                    .find('.information-title')
                    .html(obj.title)
                    .end()
                    .find('.information-panel')
                    .find('.information-description')
                    .html(obj.desc);
            }
        },

        /**
         *  Loads information for panels and handles succesful returns and failures. It is
         *  A modification of the $.ajax function
         *
         *  @method DropDown.panel.load
         *  @param  {Object}    options     an $.ajax settings object
         *  @param  {Function}  pre         the function to run before the ajax call
         *  @param  {Function}  success     the function to call after a succesful ajax call
         *  @param  {Function}  fail        the function to call after a failed ajax call
         */
        load: function (options, pre, success, fail) {
            console.log('dropdown.panel.load');
            pre();

            $.ajax(options)
                .done(success)
                .fail(fail);
        },

        //  Display methods
        display: {
            /**
             *  Displays or hides a panel from view.
             *
             *  @method DropDown.panel.display.toggle
             *  @param  {Boolean}   state           The display state of a panel
             *  @param  {String}    toggleClass     The panel class to control
             */
            toggle: function (state, toggleClass) {
                var showSpace = ['.information-panel'];

                if (state) {

                    showSpace.forEach(function (className) {
                        _this.panel.display.spaceHolder(className, toggleClass);
                    });

                    $(_this.dropDownId)
                        .find(toggleClass)
                        .addClass('display');

                    return;
                }

                $(_this.dropDownId)
                    .find(toggleClass)
                    .removeClass('hide-hold-space')
                    .removeClass('display');
            },
            /**
             *  Makes a panel take up space on first view.
             *
             *  @method DropDown.panel.display.toggle
             *  @param  {Boolean}   className       The display state of a panel
             *  @param  {String}    toggleClass     The panel class to control
             */
            spaceHolder: function (className, toggleClass) {

                if (toggleClass === className) {

                    if (!($(_this.dropDownId)
                            .find(toggleClass)
                            .hasClass('display'))) {

                        $(_this.dropDownId)
                            .find(toggleClass)
                            .addClass('hide-hold-space');

                        return;
                    }

                    $(_this.dropDownId)
                        .find(toggleClass)
                        .removeClass('hide-hold-space');
                }
            },
            /**
             *  Modify the display state of all panels
             *
             *  @method DropDown.panel.display.all
             *  @param  {Boolean}   state           The state to place all panels
             */
            all: function (state) {
                _this.panel.display.left(state);
                _this.panel.display.right(state);
            },
            /**
             *  Modify the display state of all left side panels
             *
             *  @method DropDown.panel.display.left
             *  @param  {Boolean}   state           The state to place left side panels
             */
            left: function (state) {
                _this.panel.display.toggle(state, '.account-panel');
                _this.panel.display.toggle(state, '.login-panel');
                _this.panel.display.toggle(state, '.register-panel');
                _this.panel.display.toggle(state, '.information-panel');
                _this.panel.display.toggle(state, '.information-actions-panel');
            },
            /**
             *  Modify the display state of all right side panels
             *
             *  @method DropDown.panel.display.right
             *  @param  {Boolean}   state           The state to place right side panels
             */
            right: function (state) {
                _this.panel.display.toggle(state, '.fx-catalog-panel');
                _this.panel.display.toggle(state, '.mix-catalog-panel');
                _this.panel.display.toggle(state, '.about-panel');
                _this.panel.display.toggle(state, '.contact-panel');
                _this.panel.display.toggle(state, '.api-panel');
                _this.panel.display.toggle(state, '.tutorial-panel');
            }
        },

        //  Wait Screens
        wait: {
            /**
             *  Start a wait screen. {Currently disabled}
             *
             *  @method DropDown.panel.display.wait.start
             *  @param  {Enum}   position   LEFT|RIGHT|ALL The wait screen(s) to start displaying.
             */
            start: function (position) {
                console.log('dropdown.panel.wait.start');
                return;
                /*switch(position){
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
                }*/
            },
            /**
             *  Stop a wait screen. {Currently disabled}
             *
             *  @method DropDown.panel.display.wait.start
             *  @param  {Enum}   position   LEFT|RIGHT|ALL The wait screen(s) to stop displaying.
             */
            stop: function (position) {
                console.log('dropdown.panel.wait.stop');
                return;
                /*switch(position){
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
                }*/
            }
        }

    };

    //  Navigation Bar
    this.navigation = {
        //  Display Methods
        display: {
            /**
             *  Toggle the display of a navbar element
             *
             *  @method DropDown.navigation.display.toggle
             *  @param  {Boolean}   state       The display state to place a navbar element in
             *  @param  {String}    toggleClass The class of the navbar element to modify
             */
            toggle: function (state, toggleclass) {

                if (state) {
                    $(_this.navigationId)
                        .find('.navbar-right-links')
                        .find(toggleclass)
                        .addClass('display');
                    return;
                }

                $(_this.navigationId)
                    .find('.navbar-right-links')
                    .find(toggleclass)
                    .removeClass('display');
            },
            /**
             *  Toggle the display of all navbar elements
             *
             *  @method DropDown.navigation.display.all
             *  @param  {Boolean}   state       The display state to place all navbar element in
             */
            all: function (state) {
                _this.navigation.display.secured(state);
                _this.navigation.display.unsecured(state);
            },
            /**
             *  Toggle the display of all secured view navbar elements
             *  This is the logged in state
             *
             *  @method DropDown.navigation.display.secured
             *  @param  {Boolean}   state       The display state to place all secured view navbar element in
             */
            secured: function (state) {
                console.log('  Toggling display of "auth" to', state);
                _this.navigation.display.toggle(state, '.link-sign-out');
                _this.navigation.display.toggle(true, '.link-tutorial');
            },
            /**
             *  Toggle the display of all unsecured view navbar elements
             *  This is the logged out state
             *
             *  @method DropDown.navigation.display.unsecured
             *  @param  {Boolean}   state       The display state to place all unsecured view navbar element in
             */
            unsecured: function (state) {
                console.log('  Toggling display of "anon" to', state);
                _this.navigation.display.toggle(state, '.link-sign-in');
                _this.navigation.display.toggle(state, '.link-register');
                _this.navigation.display.toggle(true, '.link-tutorial');
            },
            /**
             *  Toggle the Logged in view state
             *
             *  @method DropDown.navigation.display.lock
             *  @param  {Boolean}   state       The state of the secured view
             */
            lock: function (state) {
                _this.navigation.display.secured(state);
                _this.navigation.display.unsecured(!state);
            }
        }
    };

    /**
     *  Resets the dropdown, clears set values
     *
     *  @method DropDown.reset
     */
    this.reset = function () {
        this.panel.set.information({
            title: '',
            desc: '',
            actions: ''
        });

        $('.dropdown')
            .find('.holder')
            .removeClass('sticky-wrapper');
    };

    /**
     *  Makes the views that the dropdown manages
     *
     *  @method DropDown.show
     *  @param  {String}  view    The view to display
     *  @param  {String}  opt     Options to pass the views
     */
    this.show = function (view, opt) {

        //  Setting default variables
        opt = dVar(opt, false);

        console.log('--- Showing view:', view);

        //  Handling the opening and closing of the dropdown
        if (view === 'TOGGLE') {
            this.dropdown.toggle();
            return;
        }

        this.panel.display.toggle(false, '.api-panel');

        this.reset();

        //  Switching views
        switch (view) {
        case 'ALL':
            this.stateHistory.push(view);

            this.panel.display.all(true);

            return;

        case 'INIT':
            this.stateHistory.push(view);

            this.panel.display.all(false);

            this.panel.display.toggle(true, '.register-panel');
            this.panel.display.toggle(true, '.login-panel');
            this.panel.display.toggle(true, '.about-panel');
            return;

        case 'LOGGED_OUT':
            this.stateHistory.push(view);

            this.panel.display.all(false);

            this.panel.display.toggle(true, '.login-panel');
            this.panel.display.toggle(true, '.about-panel');
            return;

        case 'FX':
            this.stateHistory.push(view);

            this.panel.display.all(false);

            $('.dropdown .holder')
                .addClass('sticky-wrapper');

            this.panel.display.toggle(true, '.information-panel');
            this.panel.display.toggle(true, '.information-actions-panel');
            this.panel.display.toggle(true, '.fx-catalog-panel');

            return;

        case 'MIX':
            this.stateHistory.push(view);

            this.panel.display.all(false);

            this.panel.set.account();

            this.panel.display.toggle(true, '.account-panel');
            this.panel.display.toggle(true, '.mix-catalog-panel');

            return;

        case 'LOGIN':
            this.stateHistory.push(view);

            this.panel.display.all(false);
            this.panel.display.toggle(true, '.login-panel');
            this.panel.display.toggle(true, '.about-panel');
            return;

        case 'REGISTER':
            this.stateHistory.push(view);

            this.panel.display.all(false);
            this.panel.display.toggle(true, '.register-panel');
            this.panel.display.toggle(true, '.about-panel');
            return;

        case 'API':
            this.stateHistory.push(view);

            this.panel.display.toggle(true, '.api-panel');

            return;

        case 'RESET':
            this.show(this.stateHistory.top());
            return;

        case 'BACK':

            _this.dropdown.toggle();
            var waitforclose = setInterval(function () {
                console.log('BACKING UP A VIEW');
                if (_this.state === false) {
                    console.log('BACKING UP COMPLETED');

                    _this.reset();
                    _this.stateHistory.pop();
                    _this.show(_this.stateHistory.pop());
                    clearInterval(waitforclose);
                }
            }, 10);

            return;
        }
    };
}