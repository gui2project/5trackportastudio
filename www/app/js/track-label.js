/**
 *  @file   track-label.js
 *
 *  Holds the track label code, a track label is editable by the user unless
 *  it is for the master track
 *
 */
// Function for creating editable text
$.fn.tracklabel = function () {

    // Add mixer-editable class
    $(this)
        .addClass('mixer-editable');

    // Variable to hold track original name
    var original = $(this)
        .html();

    var labelType = function (id) {
        if ($(id)
            .parent()
            .parent()
            .parent()
            .hasClass('master')) {
            $(id)
                .addClass('master-label');
        } else {
            $(id)
                .addClass('track-label');
        }
    };

    this.each(function () {
        labelType(this);
    });

    // Check if you were clicked on
    $(this)
        .on('click', function () {
            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Save last name
            if ($(this)
                .text() === '') {
                $(this)
                    .attr('last-name');
            } else {
                $(this)
                    .attr('last-name', $(this)
                        .text());
            }

            // Check if you're in edit mode
            if (!$(this)
                .hasClass('mixer-enabled')) {
                // Change to editable
                $(this)
                    .addClass('mixer-enabled');

                // Save track name
                var text = $(this)
                    .text();

                // Add input field
                $(this)
                    .html('');
                $(this)
                    .append('<input class="editable-text col-md-11 col-sm-11 col-xs-11" last-name="' + $(this)
                        .attr('last-name') + '" type="text" placeholder="' + text + '" value="' + text + '"></input>');

                // Focus onto the field
                $(this)
                    .find('input')
                    .focus();
            }
        });

    // When you lose focus
    $(this)
        .on('focusout enterKey escapeKey', function (e) {
            var text;

            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Take out of edit mode
            $(this)
                .removeClass('mixer-enabled');

            // Get text from the input field
            if (e.type === 'escapeKey') {
                text = '';
            } else {
                text = $(this)
                    .find('input')
                    .val();

                if (text.length > 14){
                    text = text.substring(0, 12) + '...';
                }

            }

            // Check if input is empty

            if (text === '') {
                $(this)
                    .text($(this)
                        .attr('last-name'));
            } else {
                $(this)
                    .text(text);
            }

            $(this)
                .remove('input');
        });

    // Detect key releases
    $(this)
        .on('keyup', function (e) {
            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Check if enter key was pressed
            if (e.keyCode === 13) {
                $(this)
                    .trigger('enterKey');
            }

            // If escape key was pressed
            if (e.keyCode === 27) {
                $(this)
                    .trigger('escapeKey');
            }
        });
};