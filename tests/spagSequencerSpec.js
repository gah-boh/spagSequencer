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

	afterEach( function()
	{
		sequencer.spagSequencer("stop");
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
		sequencer.spagSequencer("start");
		spyOn(instance, 'fire');
		sequencer.spagSequencer("stop");
		expect(instance.fire).not.toHaveBeenCalled();

	});

	it("Start called twice should stop and start again", function()
	{
		sequencer.spagSequencer("start");
		spyOn(instance, 'stop');
		spyOn(instance, 'play');
		sequencer.spagSequencer("start");
		expect(instance.stop).toHaveBeenCalled();
		expect(instance.play).toHaveBeenCalled();
	});

	it("Should remove single command", function()
	{
		var sequenceCommand = jasmine.createSpy("sequenceCommand");
		var commandToRemove = jasmine.createSpy("commandToRemove");
		sequencer.spagSequencer("addEvent", 1, {fire: sequenceCommand});
		var removeMe = sequencer.spagSequencer("addEvent", 1, {fire: commandToRemove});
		sequencer.spagSequencer("removeEvent", removeMe);
		sequencer.spagSequencer("fire");
		expect(commandToRemove).not.toHaveBeenCalled();
		expect(sequenceCommand).toHaveBeenCalled();
		expect(instance.sequenceCommands.length).toEqual(1);
	});

	it("Should remove one command out of two identical ones", function()
	{
		var command1 = jasmine.createSpy("command");
		var command2 = jasmine.createSpy("command");
		sequencer.spagSequencer("addEvent", 1, {fire: command1});
		var removeMe = sequencer.spagSequencer("addEvent", 1, {fire: command2});
		sequencer.spagSequencer("fire");
		instance.currentStep = 1;
		sequencer.spagSequencer("removeEvent", removeMe);
		sequencer.spagSequencer("fire");
		expect(instance.sequenceCommands.length).toEqual(1);
		expect(command2.callCount).toEqual(1);
		expect(command1.callCount).toEqual(2);
	});

	it("Should call command at correct time", function()
	{
		var flag = false;
		var command = jasmine.createSpy("command");
		sequencer.spagSequencer("addEvent", 2, {fire: command});
		sequencer.spagSequencer("start");

		runs(function(){
			setTimeout(function(){flag = true;}, 150);
		});

		waitsFor(function(){ return flag }, "The command should have been called", 200);

		runs(function()
		{
			expect(command.callCount).toEqual(1);
		});

	});

	it("Should pause at the correct time", function()
	{
		var command = jasmine.createSpy("command");
		var afterCommand = jasmine.createSpy("afterCommand");
		sequencer.spagSequencer("addEvent", 10, {fire: command, afterFire: afterCommand});
		instance.currentStep = 10;
		instance.fire();
		instance.pause();
		expect(instance.currentStep).toEqual(11);
		sequencer.spagSequencer("fireFromPause");
		expect(afterCommand.callCount).toEqual(1);
	});

	it("loop to be set in the options", function()
	{
		expect(instance.options.loop).toBeTruthy();
	});

	it("loop turned off should call stop after the last step", function()
	{
		sequencer.spagSequencer("setOption", "loop", false);
		var command = jasmine.createSpy("fireCommand");
		var afterCommand = jasmine.createSpy("afterFireCommand");
		spyOn(instance, "pause");
		sequencer.spagSequencer("addEvent", 32, {fire: command, afterFire: afterCommand});
		instance.currentStep = 32;
		instance.fire();
		expect(command).toHaveBeenCalled();
		expect(instance.pause.callCount).toEqual(1);
		expect(instance.currentStep).toEqual(1);
	});

	it("looping can be toggled", function()
	{
		sequencer.spagSequencer("toggleLoop");
		expect(instance.options.loop).toBeFalsy();
		sequencer.spagSequencer("toggleLoop");
		expect(instance.options.loop).toBeTruthy();
	});

	it("reverse will make the current step the previous one", function()
	{
		sequencer.spagSequencer("setOption", "reverse", true);
		instance.fire();
		expect(instance.currentStep).toEqual(32);
	});

	it("should fire on add if option is enabled", function()
	{
		sequencer.spagSequencer("setOption", "fireOnAdd", true);
		var command = jasmine.createSpy("fireOnAddCommand");
		sequencer.spagSequencer("addEvent", 1, {fire: command});
		expect(command).toHaveBeenCalled();
	});

	it("should not fire on add when option is disabled", function()
	{
		var command = jasmine.createSpy("fireOnAddCommand");
		sequencer.spagSequencer("addEvent", 1, {fire: command});
		expect(command).not.toHaveBeenCalled();
	});
});










