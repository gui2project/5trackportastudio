$(function() {
    /* Add data to the mute & record buttons */
    $('.mute button').attr('data-muted', 0);
    $('.record button').attr('data-armed', 0);
    
    /* Set up track names */
    $('.name').tracklabel();
    
    /* Set up EQ knobs */
    $('.eq input').knob({
        width: 75,
        height: 75,
        min: -12,
        max: 12,
        angleOffset: -125,
        angleArc: 250,
        cursor: 20,
        displayInput: false
    });
    $('.eq input').val(0).trigger('change');
    
    /* Set up pan knobs */
    $('.pan input').knob({
        width: 75,
        height: 75,
        min: -1,
        max: 1,
        step: 0.1,
        angleOffset: -125,
        angleArc: 250,
        cursor: 20,
        displayInput: false
    });
    $('.pan input').val(0).trigger('change');
    
    /* Set up volume sliders */
    $('.slider').slider({
        reversed : true,
        precision: 2,
        min  : 0.00,
        max  : 1.00,
        step: 0.01,
        value: 0.70,
        orientation: 'vertical',
        tooltip_position:'left'
    });
    
    /* Knob function */
    $('canvas').on('mousedown', function() {
        $(this).addClass('changing');
    }).on('mousemove', function() {
        // Check if dragging
        if(!$(this).hasClass('changing')) {
            return;
        }
        
        // Get track number and value of the knob
        var trackNumber = $(this).parent().parent().parent().attr('class').split('track-')[1];
        var knobValue = $(this).parent().find('input').val();
        
        // Check which knob you are (EQ or pan)
        if($(this).parent().parent().hasClass('eq')) {
            // Get EQ type (high, mid, low)
            var eqType = $(this).parent().parent().parent().parent().attr('class').split(' ')[1];
            
            // Do eq changing here
        } else if($(this).parent().parent().hasClass('pan')) {
            // Do pan changing here
        }
    });
    $(document).on('mouseup', function() {
        // Remove changing
        $('.changing').removeClass('changing');
    });
    
    /* Slider function */
    $('.slider').on('change', function() {
        // Get track number and value of the slider
        var trackNumber = $(this).parent().parent().attr('class').split('track-')[1];
        var sliderVal = $(this).val();
        
        // Do what you will here (changing volume)
    });
    
    /* Mute buttons */
    $('.mute button').on('click', function() {
        // Get track number and value of the knob
        var trackNumber = $(this).parent().parent().attr('class').split('track-')[1];

        // Check variables
        var isMuted = $(this).attr('data-muted');
        
        // Toggle armed
        if(isMuted) {
            // Turn off armed
            $(this).attr('data-muted', 0);
            
            // Add code for un-muting a track
        } else {
            // Turn on armed
            $(this).attr('data-muted', 1);
            
            // Add code for muting a track
        }
    });
    
    /* Recording buttons */
    $('.record button').on('click', function() {
        // Get track number and value of the knob
        var trackNumber = $(this).parent().parent().attr('class').split('track-')[1];

        // Check variables
        var isArmed = $(this).attr('data-armed');
        
        // Toggle armed
        if(isArmed) {
            // Turn off armed
            $(this).attr('data-armed', 0);
            
            // Add code for un-arming a track
        } else {
            // Turn on armed
            $(this).attr('data-armed', 1);
            
            // Add code for arming a track
        }
    });
});