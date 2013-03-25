$(document).ready( function ()
{
	$('.sample-pad').each( function ()
	{
		var $this = $(this);
		$this.jPlayer(
		{
			ready: function()
			{
				$this.jPlayer("setMedia",
				{
					wav: $this.data('file')
				});
			},
			supplied: "wav",
			size: "100px"
		});
	});
	$('.sample-pad').click( function()
	{
		//alert("Testing");
		$(this).jPlayer("play");
	});
});