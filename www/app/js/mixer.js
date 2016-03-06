$(function() {
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
});