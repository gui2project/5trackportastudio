/**
 *  @file   track-label.js
 *
 *  Holds the track label code, a track label is editable by the user unless
 *  it is for the master track
 *
 */
$.fn.genParent = genParent;

// Function for creating editable text
$.fn.tracklabel = function () {
    var trackId,
        trackLabelDisplay,
        labelType = function (id) {
            if ($(id)
                .genParent(3)
                .hasClass('master')) {
                $(id)
                    .addClass('master-label');
            } else {
                $(id)
                    .addClass('track-label');
            }
        };

    // Add mixer-editable class
    $(this)
        .addClass('mixer-editable');

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

        $(trackLabelDisplay)
            .html($(this)
                .find('span.text')
                .html());
    });

    // Check if you were clicked on
    $(this)
        .on('click', function () {
            var textElement,
                text,
                lastName;

            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            // Check if you're in edit mode
            if (!$(this)
                .hasClass('mixer-enabled')) {

                // Save track name
                text = $(this)
                    .find('span.text')
                    .text();

                lastName = $(this)
                    .attr('last-name');

                // Change to editable
                $(this)
                    .find('span.edit-icon')
                    .css({
                        'display': 'none'
                    })
                    .end()
                    .find('span.text')
                    .css({
                        'overflow': 'visible'
                    })
                    .html('')
                    .append($('<input></input>')
                        .addClass('editable-text')
                        .attr('last-name', lastName)
                        .attr('type', 'text')
                        .attr('placeholder', text)
                        .val(text))
                    .end()
                    .find('input')
                    .focus();
            }
        });

    // When you lose focus
    $(this)
        .on('focusout enterKey escapeKey', function (e) {
            var text,
                lastName;

            if ($(this)
                .hasClass('master-label')) {
                return;
            }

            lastName = $(this)
                .attr('last-name');

            // Take out of edit mode
            $(this)
                .removeClass('mixer-enabled')
                .find('span.edit-icon')
                .css({
                    'display': ''
                })
                .end()
                .find('span.text')
                .css({
                    'overflow': ''
                });

            // Get text from the input field
            text = $(this)
                .find('input')
                .val();

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