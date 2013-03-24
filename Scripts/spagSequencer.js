/*Spag Sequencer*/
(function($){

    var SequenceEvent = function( element, step, options )
    {
        this.element = element;
        this.step = step;
        this.options = $.extend({}, this.defaults, options);
        this.init();
    };

    SequenceEvent.prototype =
    {
        constructor: SequenceEvent,

        defaults:
        {
            fire: function(){},
            done: function(){}
        },

        init: function()
        {
            var self = this;
            this.element.on("fire" + this.step, function(){self.options.fire()});
            this.element.off("afterFire" + this.step, function(){this.options.done()});
	        var DELETEME;
        }
    };

    var SpagSequencer = function( element, options )
    {
        this.element = $(element);
        this.options = $.extend({}, $.fn.spagSequencer.defaults, options);

        this.commandSequence = [];

        this.prepareSequence();
    };

    SpagSequencer.prototype =
    {
        // TODO: Understand constructor in the prototype and lowercase.
        constructor: SpagSequencer,

        setOption: function (key, value)
        {
            this.options[key] = value;
            this.prepareSequence();
        },

        prepareSequence: function()
        {
            this.commandSequence.length = this.options.steps;
            var fire;
            var done;
            for (var i = 1; i <= this.options.steps; i++) {
                fire = "fire" + i;
                done = "done" + i;
                $.event.trigger({
                    type: fire,
                    message: "Is this necessary? -Gabo",
                    time: new Date()
                });
            }
        },

        addEvent: function( step, calls )
        {
            // TODO: This may not be needed to be put in an array.
            this.commandSequence.push( new SequenceEvent(this.element, step, calls ) );
        },

        getDelayTime: function()
        {
            var beatPerSecond = this.options.bpm / 60;
            return beatPerSecond / (this.options.steps / 4);
        },

        play: function()
        {
            // TODO: Finish this

        }
    };

    $.fn.spagSequencer = function( options )
    {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each( function()
            {
                var $this = $(this);
                var data = $this.data('spagSequencer');
                if(!data) {
                    $this.data( 'spagSequencer', (data = new SpagSequencer(this, options)) );
                }
                if(typeof options == "string")
                {
                    data[options].apply(data, args);
                }
            });
    };

    // TODO: Understand constructor using the jQuery function and uppercase.
    $.fn.spagSequencer.Constructor = SpagSequencer;

    $.fn.spagSequencer.defaults =
    {
        bpm:    140,
        steps:  16
    };

})(jQuery);