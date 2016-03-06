/*******************************/
/*  Name:       tracklabel.js  */
/*  Author:     Ramon Meza     */
/*  Created on: 2/11/2016      */
/*  Updated on: 3/6/2016       */
/*******************************/
// Function for creating editable text
$.fn.tracklabel = function() {
    // Add mixer-editable class
    $(this).addClass('mixer-editable');
    
    // Variable to hold track original name
    var original = $(this).html();
    
    // Check if you were clicked on
    $(this).on('click', function() {
        // Save last name
        original = $(this).text();
        
        // Check if you're in edit mode
        if(!$(this).hasClass('mixer-enabled')) {
            // Change to editable
            $(this).addClass('mixer-enabled');
            
            // Save track name
            var text = $(this).text();
            
            // Add input field
            $(this).html('<input type="text" placeholder="' + text + '"></input>');
            
            // Focus onto the field
            $(this).find('input').focus();
        }
    });
    
    // When you lose focus
    $(this).on('focusout enterKey escapeKey', function(e) {
        // Take out of edit mode
        $(this).removeClass('mixer-enabled');
        
        // Get text from the input field
        if(e.type == "escapeKey")
            var text = "";
        else
            var text = $(this).find('input').val();
        
        // Check if input is empty
        if(text == "")
            $(this).text(original);
        else 
            $(this).text(text);
            
        if($(this).text() == "")
            $(this).text("Track");
    });
    
    // Detect key releases
    $(this).on('keyup', function(e) {
        // Check if enter key was pressed
        if(e.keyCode == 13)
            $(this).trigger('enterKey');
            
        // If escape key was pressed
        if(e.keyCode == 27)
            $(this).trigger('escapeKey');
    });
};