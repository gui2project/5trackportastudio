/**
 *  @file   track-label.js
 *
 *  Holds the track label code, a track label is editable by the user unless
 *  it is for the master track
 *
 */
// Function for creating editable text
$.fn.tracklabel = function () {
    var trackId, trackSelector, trackLabelDisplay;
    //track-name-display-3
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
        if ($(this)
            .closest('.track')
            .attr('id')) {
            trackId = $(this)
                .closest('.track')
                .attr('id')
                .substr(6) - 1;
        } else {
            trackId = 'master';
        }
        trackLabelDisplay = '#track-name-display-' + trackId;

        labelType(this);

        $(this)
            .attr('data-stat-label', trackLabelDisplay)
            .attr('last-name', $(this)
                .text());

        var originalText = $(this)
            .children('span.text')
            .html();

        $(trackLabelDisplay)
            .html(originalText);
    });

    // Check if you were clicked on
    $(this)
        .on('click', function () {

            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Check if you're in edit mode
            if (!$(this)
                .hasClass('mixer-enabled')) {

                var textElement = $(this)
                    .find('span.text');

                // Save track name
                var text = textElement
                    .text();

                // Change to editable
                //  Styling to remove hover edit button
                $(this)
                    // Take out of edit mode
                    .find('span.edit-icon')
                    .css({
                        'display': 'none'
                    });

                // Add input field
                textElement
                    .html('')
                    .css({
                        'overflow': 'visible'
                    })
                    .append('<input class="editable-text" last-name="' +
                        $(this)
                        .attr('last-name') +
                        '" type="text" placeholder="' + text +
                        '" value="' + text + '"></input>')
                    .end()
                    .find('input')
                    .focus();
            }
        });

    // When you lose focus
    $(this)
        .on('focusout enterKey escapeKey', function (e) {
            var text;
            var lastName = $(this)
                .attr('last-name');

            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Take out of edit mode
            $(this)
                .removeClass('mixer-enabled')
                .find('span.edit-icon')
                .css({
                    'display': ''
                })
                .end()
                .children('span.text')
                .css({
                    'overflow': ''
                });

            // Get text from the input field
            if (text === '') {
                text = lastName;
            } else {
                text = $(this)
                    .find('input')
                    .val();
            }

            if (text === '') {
                text = lastName;
            }

            $($(this)
                    .attr('data-stat-label'))
                .html(text);

            $(this)
                .find('span.text')
                .text(text)
                .attr('last-name', text)
                .end()
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