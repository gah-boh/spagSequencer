(function($){

	var SpagSequencer = function( element, options )
	{
		this.element = $(element);
		this.options = $.extend({}, $.fn.spagSequencer.defaults, options);
	};

	SpagSequencer.prototype = 
	{
		// TODO: Understand constructor in the prototype and lowercase.
		constructor: SpagSequencer,

		setOptions: function(options)
		{

			$(this).each( function(key, value){
				this.setOption(key, value);
			});
		},

		setOption: function(key, value)
		{
			this.options[key] = value;
		}
	};

	$.fn.spagSequencer = function( options )
	{
		return this.each( function()
			{
				var $this = $(this);
				var data = $this.data('spagSequencer');
				if(!data) {
					$this.data( 'spagSequencer', (data = new SpagSequencer(this, options)) );
				}
				if( typeof options == 'string'){
					var args = Array.prototype.slice.call( arguments, 1 );
					data[options].apply( data, args );
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