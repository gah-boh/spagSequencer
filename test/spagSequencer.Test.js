describe( "Sequencer", function()
{
	var sequencer;
	beforeEach( function()
	{
		sequencer = $('<div></div>').spagSequencer({
			steps: 32
		});
	});
	it("should return a default bpm of 140", function()
	{
		expect(sequencer.data('spagSequencer').options.bpm).toEqual(140);
	});
	it("should have 32 steps defined", function()
	{
		expect(sequencer.data('spagSequencer').options.steps).toEqual(32);
	});
	it("should have a new bpm of 100 and still have steps at 32", function()
	{
		sequencer.spagSequencer( "setOptions", "bpm", 100 );
		expect(sequencer.data('spagSequencer').options.bpm).toEqual(100);
		expect(sequencer.data('spagSequencer').options.steps).toEqual(32);
	});
});