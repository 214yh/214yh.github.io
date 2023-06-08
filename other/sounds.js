
// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// variables
// var notes = {4: {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21}}
var notesStr = `4,41.2,43.7,46.2,49,51.9,55,58.3,61.7,65.4,69.3,73.4,77.8,82.4,87.3,92.5,98,103.8,110,116.5,123.5,130.8,138.6
3,55,58.3,61.7,65.4,69.3,73.4,77.8,82.4,87.3,92.5,98,103.8,110,116.5,123.5,130.8,138.6,146.8,155.6,164.8,174.6,185
2,73.4,77.8,82.4,87.3,92.5,98,103.8,110,116.5,123.5,130.8,138.6,146.8,155.6,164.8,174.6,185,196,207.7,220,233.1,246.9
1,98,103.8,110,116.5,123.5,130.8,138.6,146.8,155.6,164.8,174.6,185,196,207.7,220,233.1,246.9,261.6,277.2,293.7,311.1,329.6`;

var notesStr2 = `4,E,F,F#,G,G#,A,A#,B,C,C#,D,D#,E,F,F#,G,G#,A,A#,B,C,C#
3,A,A#,B,C,C#,D,D#,E,F,F#,G,G#,A,A#,B,C,C#,D,D#,E,F,F#
2,D,D#,E,F,F#,G,G#,A,A#,B,C,C#,D,D#,E,F,F#,G,G#,A,A#,B
1,G,G#,A,A#,B,C,C#,D,D#,E,F,F#,G,G#,A,A#,B,C,C#,D,D#,E`;



var notes = {};  // 4th string 3rd fret: noteDict[(4, 3)] = 49
var noteNames = {};
var numStrings;
var numFrets;

var currString = 4;
var currFret = 0;
var currNote = 'E';

var hz = 41.2;
var duration = 1;

var planetHue = 'BLUE';

// document elements
var playButton;
var resultText;
var displayInput;
var planet;
var planetUrl;

var helpText = 'Left: play, middle: check answer, right: shuffle.'

function loadElements() {
	playButton = document.getElementById('play-button-ID');
	resultText = document.getElementById('device-output-ID');
	displayInput = document.getElementById('device-input-ID');
	planet = document.getElementById('planet-ID');
	planetUrl = document.getElementById('planet-url-ID');
}

function loadNotes() {
	// Create nested array for notes 
	// notes[string][fret] = hz
	var temp = notesStr.split('\n');
	var temp2 = notesStr2.split('\n');

	numStrings = temp.length;

	for (let i = 0; i < numStrings; i++) {
		let stringID = temp[i][0];
		console.log(stringID);
		notes[stringID] = temp[i].split(',').slice(1);
		noteNames[stringID] = temp2[i].split(',').slice(1);
	}
	numFrets = notes[1].length;

	console.log(4, 0, noteNames[4][0]);
}


function playSound() {
	// Called when play button is clicked, play hz for duration seconds
	// TODO: waveform
	console.log('playing sound');
	// create Oscillator node
	var oscillator = audioCtx.createOscillator();
	oscillator = audioCtx.createOscillator();
	oscillator.type = "triangle";
	oscillator.frequency.value = hz;
	oscillator.connect(audioCtx.destination);
	oscillator.start(audioCtx.currentTime);
	oscillator.stop(audioCtx.currentTime + duration);
}

function generateRandomNote() {
	// Randomize the hz played by the button
	currString = Math.floor(Math.random() * ((numStrings+1) - 1) + 1);
	currFret = Math.floor(Math.random() * (numFrets));

	hz = notes[currString][currFret];
	currNote = noteNames[currString][currFret];

	updateDisplayText('Generated new note');

	// console.log(currString, currFret, hz, currNote);
}

function updateDisplayText(outputStr) {
	resultText.innerHTML += '<br><br>' + outputStr;
}

function checkAnswer(element) {
	if (element.id == 'button-check-ID' || event.key == 'Enter') {
		let answer = displayInput.value.split(',');
		if (answer.length == 1 && answer[0].toLowerCase() == 'help') {
			updateDisplayText(helpText);
			return;
		}
		if (answer.length != 3) {
			console.log('Incorrect answer length');
			// resultText.innerHTML += '<br>Please answer in the form of [string],[fret],[note]. Example: 4,0,e';
			updateDisplayText('Please answer in the form of [string],[fret],[note]. Example: 4,0,e');
			return;
		} else {
			let stringNum = parseInt(answer[0], 10);
			let fretNum = parseInt(answer[1], 10);
			let noteName = answer[2].toUpperCase();

			if (noteNames[stringNum][fretNum] != noteName) {
				console.log('String/fret combo does not match note name');
				updateDisplayText('String/fret combo does not match note name.');
				return;
			}

			if (noteName != currNote) {
				console.log('Incorrect note');
				updateDisplayText('Incorrect');
				return;
			}

			console.log('correct');
			console.log(currString, currFret, noteName);
			if (event.key == 'Enter') {
				element.value = '';
			}
			
			let answerHz = notes[stringNum][fretNum];
			updateDisplayText('Correct note (' + noteName + ').<br>You answered: string ' + stringNum + ' fret ' + fretNum + ', which is ' + answerHz + 'hz. Played was ' + hz + 'hz (e.g. ' + currString + ', ' + currFret + ').');
			// resultText.innerHTML += '<br>Correct note (' + noteName + ').<br>You answered: string ' + stringNum + ' fret ' + fretNum + ', which is ' + answerHz + 'hz. Played was ' + hz + 'hz (e.g. ' + currString + ', ' + currFret + ').';
		}
	}
}

function updatePlanet() {
	// Update planet color and URL accordingly
	// red: 160, purple: 80 blue: 0
	if (planetHue == 'BLUE') {
		planet.style.filter = 'hue-rotate(160deg)';
		planet.title = 'どっかにいるの運命の人、エンゼル、ハニー';
		planetUrl.href = 'https://youtu.be/ysESQ1Ci110';
		planetHue = 'RED';
	} else if (planetHue == 'RED') {
		planet.style.filter = 'hue-rotate(80deg)';
		planet.title = 'ダムス兄貴の大失策';
		planetUrl.href = 'https://youtu.be/SBe4mPXXMOo';
		planetHue = 'PURPLE';
	} else {
		planet.style.filter = '';
		planet.title = '世界の真ん中はここだよ';
		planetUrl.href = 'https://youtu.be/E4sq2rBnmpE';
		planetHue = 'BLUE';
	}
	console.log('updated planet color ', planetHue);
}

window.onload = function () {
	loadElements();
	loadNotes();
	updateDisplayText(helpText);
	setInterval(updatePlanet, 30000);
	// generateRandomNote();
};