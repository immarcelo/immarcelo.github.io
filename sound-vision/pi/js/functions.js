var ctx;
window.addEventListener('load', init, false);
	function init() {
	try {
	// Fix up for prefixing
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	ctx = new AudioContext();
	}
	catch(e) {
	alert('Web Audio API is not supported in this browser');
	}
}


	var vw = window.innerWidth;
	var vh = window.innerHeight;
  
	//SETUP CANVAS
	 
    var canvas = document.getElementById('stage');
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

	//SETUP AUDIO
	function audioSetup() {
		console.log('audioSetup');
		audio = document.getElementById('track');
		audioSrc = ctx.createMediaElementSource(audio);
		analyser = ctx.createAnalyser();
		analyser.fftSize =  128;
		audioSrc.connect(analyser);
		analyser.connect(ctx.destination);
		//DETECCAO DE PEAK
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
		F_length = frequencyData.length;
		
	}
	

	



	//OUTROS SETUPS
	function map_range(value, low1, high1, low2, high2) {
	  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	 //PEAK CALC
	// var values = 0;
	// for (var k = 0; k < F_length; k++) {
	//   values += frequencyData[k];
	// }
	// average = values / F_length;


	// analyser.getByteFrequencyData(frequencyData);