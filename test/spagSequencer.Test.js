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
	it("should have a new bpm of 100 and still have steps at 32", function()
	{
		sequencer.spagSequencer( "setOption", "bpm", 100 );
		expect(sequencer.data('spagSequencer').options.bpm).toEqual(100);
		expect(sequencer.data('spagSequencer').options.steps).toEqual(32);
	});
	it("should have a time interval of 0.25", function()
	{
		sequencer.spagSequencer("setOption", "bpm", 60);
		sequencer.spagSequencer("setOption", "steps", 16);
		var interval = instance.getDelayTime();
		expect(interval).toEqual(0.25);
	});
	it("should have a time interval of 0.125", function()
	{
		sequencer.spagSequencer("setOption", "bpm", 120);
		sequencer.spagSequencer("setOption", "steps", 16);
		var interval = instance.getDelayTime();
		expect(interval).toEqual(0.125);
	});
	it("function added to sequenceCommand should be called", function()
	{
		var sequenceCommand = jasmine.createSpy( "sequenceCommand" );
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		sequencer.trigger("fire1");
		expect( sequenceCommand ).toHaveBeenCalled();
	});
	it("length of command sequence should match amount of commands added", function()
	{
		var sequenceCommand = jasmine.createSpy( "sequenceCommand" );
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		sequencer.spagSequencer("addEvent", 2, {fire: sequenceCommand});
		expect(instance.sequenceCommands.length).toEqual(3);
	});
	it("play should be called", function()
	{
		spyOn(instance, 'play');
		sequencer.spagSequencer('play');
		expect(instance.play).toHaveBeenCalled();
	});
	it("remove all triggers", function()
	{
		var sequenceCommand = jasmine.createSpy("sequenceCommand");
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		sequencer.spagSequencer("removeAllEvents");
		sequencer.trigger("fire1");
		expect(sequenceCommand).not.toHaveBeenCalled();
	});
	it("pauses at current step", function()
	{
		expect(instance.currentStep).toEqual(1);
		instance.currentStep = 6;
		instance.pause();
		expect(instance.isPlaying).toBe(false);
		expect(instance.currentStep).toEqual(6);
	});
	it("stops and resets current step", function()
	{
		instance.currentStep = 6;
		sequencer.spagSequencer('stop');
		expect(instance.isPlaying).toBe(false);
		expect(instance.currentStep).toEqual(1);
	});
	it("should clear timed out function", function()
	{
		spyOn(instance, 'clearTimedEvent');
		var sequenceCommand = jasmine.createSpy( "sequenceCommand" );
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		sequencer.spagSequencer("stop");
		expect(instance.clearTimedEvent).toHaveBeenCalled();
	});
	it("stop should have correct order of method calls", function()
	{

	});
	// TODO: Test order of function calls in stop
	// TODO: Test that start isn't called while the sequencer is running.
	// TODO: Remove a single event from the array, if necessary
});