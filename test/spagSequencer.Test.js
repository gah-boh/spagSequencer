describe( "Sequencer", function()
{
	var sequencer, instance;
	beforeEach( function()
	{
		sequencer = $('<div id="sequencerDiv"></div>').spagSequencer({
			steps: 32
		});
		instance = sequencer.data('spagSequencer');

		return $(sequencer).appendTo($('body')).html("<div id='PluginPage'>");

	});
	it("should return a default bpm of 140", function()
	{
		expect(instance.options.bpm).toEqual(140);
	});
	it("should have 32 steps defined", function()
	{
		expect(instance.options.steps).toEqual(32);
	});
	it("length of command sequence array should be 32", function()
	{
		expect(instance.commandSequence.length).toEqual(32);
	});
	it("should have a new bpm of 100 and still have steps at 32", function()
	{
		sequencer.spagSequencer( "setOption", "bpm", 100 );
		expect(sequencer.data('spagSequencer').options.bpm).toEqual(100);
		expect(sequencer.data('spagSequencer').options.steps).toEqual(32);
	});
	it("should have a time interval of 1", function()
	{
		sequencer.spagSequencer("setOption", "bpm", 60);
		sequencer.spagSequencer("setOption", "steps", 16);
		var interval = instance.getDelayTime();
		expect(interval).toEqual(0.25);
	});
	it("should have function added to commandSequence", function()
	{
		var DELETEME;
		var sequenceCommand = jasmine.createSpy( "sequenceCommand" );
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		sequencer.trigger("fire1");
		expect( sequenceCommand ).toHaveBeenCalled();
	});
	it("play should be called", function()
	{
		spyOn(instance, 'play');
		sequencer.spagSequencer('play');
		expect(instance.play).toHaveBeenCalled();
	});
});