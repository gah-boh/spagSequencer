function SequencerExample() {

	this.$sampler = $('#sampler-container');
	this.sampleFolder = "samples/electro/";
	this.samples = ['CYCdh_Eleck01-Kick01.wav', 'CYCdh_Eleck01-Snr01.wav', 'CYCdh_Eleck01-ClHat01.wav', 'CYCdh_Eleck01-Snr02.wav'];

	this.$sampler.spagSequencer({bpm:140});

	// Create columns
	for (var i=1; i < 17; i++) {
		var columnTemplate = '<div id="sampler-step-'+i+'" class = "sampler-step"><div class="light" id="light-'+i+'"></div></div>';
		this.$sampler.append(columnTemplate);
		this.createLightEvents(i);
		this.createSamplePads(i);
	};

	$('#start').on('click', function(){$('#sampler-container').spagSequencer("start");});
	$('#stop').on('click', function(){$('#sampler-container').spagSequencer("stop");});
	$('#pause').on('click', function(){$('#sampler-container').spagSequencer("pause");});
	$('#loop').on('click', function(){$('#sampler-container').spagSequencer("toggleLoop");});

	$('#sampler-container').delegate('.sample-pad', 'click', this.toggleSamplePad.bind(this));

};

SequencerExample.prototype = {

	toggleSamplePad: function(event) {
		var pad = $(event.target);
		if(pad.hasClass('active-sample')) {
			this.turnSampleOff(pad);
		}
		else {
			this.turnSampleOn(pad);
		}
	},

	turnSampleOn: function(pad) {
		pad.addClass('active-sample');
		var step = pad.data('step');
		$('<audio></audio>').insertAfter(pad).attr('src', pad.data('sample'));
		var audioElement = pad.next('audio').get(0);
		var command = this.$sampler.spagSequencer('addEvent', step, {fire: function(){audioElement.play();}});
		pad.data('command', command);
	},

	turnSampleOff: function(pad) {
		pad.removeClass('active-sample');
		var command = pad.data('command');
		this.$sampler.spagSequencer("removeEvent", command);
		pad.next('audio').remove().end().removeData('command');
	},

	createLightEvents: function(step) {
		var lightOn = function(){$('#light-' + step).addClass('light-on');};
		var lightOff = function(){$('#light-' + step).removeClass('light-on');};
		this.$sampler.spagSequencer("addEvent", step, {fire: lightOn, afterFire: lightOff});
	},

	createSamplePads: function(step) {
		var $stepColumn = $('#sampler-step-' + step);

		for( var i = 0; i < this.samples.length; i++)
		{
			var currentSample = this.sampleFolder + this.samples[i];
			var sampleTemplate = '<div class="sample-pad" data-step='+step+' data-sample="'+currentSample+'"></div>';
			$stepColumn.append(sampleTemplate);
		}
	}
};