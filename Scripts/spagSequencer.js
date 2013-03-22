(function($){

	var SequenceEvent = function( step, options )
	{
		this.step = step;
		this.options = $.extend({}, this.defaults, options);
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
			$(this).on("fire" + this.step, this.options.fire());
			//$.off("afterFire" + this.step, this.options.done());
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
			// for (var i = 0; i < this.options.steps; i++) {
			// 	$.
			// };
		},

		addEvent: function( step, calls )
		{
			// TODO: This may not be needed to be put in an array.
			this.commandSequence.push( new SequenceEvent( step, calls ) );
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