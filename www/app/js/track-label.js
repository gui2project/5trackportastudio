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

            var textElement = $(this)
                .find('span.text');

            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Save last name
            if (textElement
                .text() === '') {
                textElement
                    .attr('last-name');
            } else {
                textElement
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
                var text = textElement
                    .text();

                // Add input field
                textElement
                    .html('')
                    .append('<input class="editable-text" last-name="' +
                        textElement.attr('last-name') +
                        '" type="text" placeholder="' + text +
                        '" value="' + text + '"></input>');
                console.log($(this));

                //  Styling to remove hover edit button
                textElement
                    .css({
                        'overflow': 'visible'
                    });
                $(this)
                    .children('span.edit-icon')
                    .css({
                        'display': 'none'
                    });

                // Focus onto the field
                textElement
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
            }

            //  Styling to add back hover edit button
            $(this)
                .find('span.edit-icon')
                .css({
                    'display': 'block'
                });
            $(this)
                .children('span.text')
                .css({
                    'overflow': 'hidden'
                });

            // Check if input is empty
            if (text === '') {
                $(this)
                    .find('span.text')
                    .text($(this)
                        .attr('last-name'));
            } else {
                $(this)
                    .find('span.text')
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