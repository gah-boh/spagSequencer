spagSequencer

Initialize the sequencer by calling it on a jQuery object
var element = $('#element');
element.spagSequencer();

or

$('#element').spagSequencer;

Options
give the sequencer an object on initialization or by calling the setOption(<option>, <value>)
available options:
 bpm:			<integer>		Beats Per Minute, controls the speed.
 steps:			<integer>		Steps per bar in 8's
 loop:			<boolean>		loop the sequencer after it finishes a sequence
 reverse:		<boolean>		play the sequence in reverse
 fireOnAdd:		<boolean>		fire the command when it's added

Adding commands to the sequencer
 To add a command call the sequencer with "addEvent", the step to fire the command in the bar, and and object
 with either the fire command, afterFire command or both.
 This returns the event object that will be needed to be passed to the sequencer if you need to remove it.
 	element.spagSequencer("addEvent", <step>, {"fire": <function for fire>, "afterFire": <function for after the fire});

Removing commands from the sequencer
 To remove a command from the sequencer you need to pass back the return value from the addEvent command.
  element.spagSequencer("removeEvent", event);
 
 To remove all the elements call the removeAllEvents method:
  element.spagSequencer("removeAllEvents");

