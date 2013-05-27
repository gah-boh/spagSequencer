## spagSequencer

spagSequencer is a jQuery sequencing plugin. It will take a function as an event which means you can pass
animations, sounds, ...anything. A bpm and amount of steps per
measure can be configured. Steps are events per measure for example 16 steps on a 160 bpm sequence will have 4
beats in 1 second but you can put 16 events (quarter notes) in that one second.

### Initialization

Initialize the sequencer by calling it on a jQuery object 

	var element = $('#element');
	element.spagSequencer();

or

	$('#element').spagSequencer();

### Options
give the sequencer an object on initialization or by calling the method:

	element.spagSequencer( 'setOption', <option>, <value>);

**available options:**  
	*bpm*:			*integer*		Beats Per Minute, controls the speed  
	*steps*:		*integer*		Steps per measure
	*loop*:			*boolean*		loop the sequencer after it finishes a sequence  
	*reverse*:		*boolean*		play the sequence in reverse  
	*fireOnAdd*:	*boolean*		fire the command when it's added  

### Adding Events 
 To add a command call the sequencer with "addEvent", the step to fire the command in the bar, and and object
 with either the fire command, afterFire command or both.
 This returns the event object that will be needed to be passed to the sequencer if you need to remove it.

 	element.spagSequencer("addEvent", <step>, {"fire": <function for fire>, "afterFire": <function for after the fire});

### Removing Events
 To remove a command from the sequencer you need to pass back the return value from the addEvent command.

	element.spagSequencer("removeEvent", event);
 
 To remove all the elements call the removeAllEvents method:

	element.spagSequencer("removeAllEvents");

### Controls
Call 'start', 'pause', 'stop' to control the sequencer.

	element.spagSequencer("start");
	element.spagSequencer("pause");
	element.spagSequencer("stop");
