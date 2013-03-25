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
            this.element.on("fire" + self.step, self.options.fire);
            this.element.on("afterFire" + self.step, self.options.done);
        },

        removeEvents: function()
        {
	        var self = this;
            this.element.off("fire" + self.step, self.options.fire);
            this.element.off("afterFire" + self.step, self.options.done);
        }
    };

    var SpagSequencer = function( element, options )
    {
        this.element = $(element);
        this.options = $.extend({}, $.fn.spagSequencer.defaults, options);
	    this.playing = false;
	    this.currentStep = 1;

        this.sequenceCommands = [];

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
            // TODO: Clean this
            //this.sequenceCommands.length = this.options.steps;
            var fire;
            var done;
            for (var i = 1; i <= this.options.steps; i++) {
                fire = "fire" + i;
                done = "afterFire" + i;
                $.event.trigger({
                    type: fire,
                    message: "Is this necessary? -Gabo",
                    time: new Date()
                });
                $.event.trigger({
                    type: done,
                    message: "Is this really necessary? -Gabo",
                    time: new Date()
                });
            }
        },

        addEvent: function( step, calls )
        {
            // TODO: This may not be needed to be put in an array.
            this.sequenceCommands.push( new SequenceEvent(this.element, step, calls ) );
        },

        removeAllEvents: function()
        {
	        var self = this;
            for( var i=0; i < this.sequenceCommands.length; i++)
            {
                self.sequenceCommands[i].removeEvents();
            }
            this.sequenceCommands.length = 0;
        },

        getDelayTime: function()
        {
            var beatPerSecond = 60 / this.options.bpm;
            return beatPerSecond / (this.options.steps / 4);
        },

        play: function()
        {
            // TODO: Finish this
	        if(this.isPlaying)
	        {
		        this.fire();
	        }
        },

        start: function()
        {
            this.isPlaying = true;
            this.play();
        },

        pause: function()
        {
            this.isPlaying = false;
	        this.clearTimedEvent();
        },

        stop: function()
        {
            this.isPlaying = false;
            this.done(this);
            this.currentStep = 1;
	        this.clearTimedEvent();
        },

	    fire: function()
	    {
            // TODO: Clean this.
		    var self = this;
		    $(this.element).trigger("fire" + this.currentStep);
		    this.currentStep++;
		    if(this.currentStep > this.options.steps)
		    {
			    //console.log("YO");
			    this.currentStep = 1;
		    }
            // TODO: Do I need to wrap self.done in a function???
		    this.timeout = setTimeout(function(){self.done(self)}, (this.getDelayTime() * 1000) );
	    },

	    done: function(self)
	    {
            // TODO: CLEAN THIS self may not be necessary!
		    var previousStep = self.currentStep - 1 == 0 ? self.options.steps : self.currentStep - 1;
		    $(self.element).trigger("afterFire" + previousStep);
//		    this.element.trigger("done" + previousStep);
		    self.play();
	    },

	    clearTimedEvent: function()
	    {
		    clearTimeout(this.timeout);
		    this.timeout = null;
	    }
    };

    var old = $.fn.spagSequencer;

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

    $.fn.spagSequencer.noConflict = function()
    {
        $.fn.spagSequencer = old;
        return this;
    }

})(jQuery);