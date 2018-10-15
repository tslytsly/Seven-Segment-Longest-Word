/*
My version of Daniel Shiffman's Coding Challenge:
https://thecodingtrain.com/CodingChallenges/117-seven-segment.html

Calculates the longest word that can be displayed on Seven-Segment displays (using Tom Scott's example https://youtu.be/zp4BMR88260)
Creates multiple Seven Segment Displays and shows the word.

User can alter the list of "bad letters" and also free type their own words.

Added Decimal point.

By Tom Sealey
*/

let badLetters = /[gkmqvwxzio]/;
let longestWord
let words;
let dispWord;
let ratioSlider;
let wordInput;
let badCharsInp;
let regenBtn;
let ratio;
let wordChanged = true;
let sevChars;
let colRadio;

let displays = [];

function preload() {
	words = loadStrings('assets/words.txt');
	sevChars = loadJSON('assets/chars.json');
}

function setup() {
	let canvas = createCanvas(windowWidth, 400);
	canvas.parent('canvas');
	ratioSlider = createSlider(.25, 2, 1, .1);
	ratioSlider.parent('slider');

	badCharsInp = createInput('gkmqvwxzio');
	badCharsInp.parent('disallowedChars');
	badCharsInp.input(badCharsEvnt);

	regenBtn = createButton('Regenerate Longest Word');
	regenBtn.parent('regen');
	regenBtn.mousePressed(getLongestWord);

	wordInput = createInput('');
	wordInput.parent('inputBox');
	wordInput.input(inpEvnt);

	colRadio = createRadio();
	colRadio.option('red');
	colRadio.option('green');
	colRadio.option('blue');
	colRadio.parent('colRadio');
	colRadio.value('red');

	getLongestWord();
}

function draw() {
	background(0);

	if (wordChanged) {
		wordChanged = false;
		updateSegs();
	}

	for (let segs of displays) {
		segs.updateRatio(ratioSlider.value());
		segs.draw();
	}
}

function updateSegs() {
	displays = [];

	if (dispWord.length > 11) {
		num = dispWord.length - 10;
		ratio = 1 - (num * .04);
	} else {
		ratio = 1;
	}

	ratioSlider.value(ratio);
	let arrOffset = 0;
	for (let i = 0; i < dispWord.length; i++) {
		let chr = dispWord.charAt(i);
		if (chr === "." && i != 0 && (displays[i - 1 - arrOffset].val & 0x80) == 0) {
			displays[i - 1 - arrOffset].val |= 0x80;
			arrOffset++;
		} else {
			displays.push(new SevSeg(sevChars[chr], (i - arrOffset) * 160, 0, ratio));
		}
	}
}

function inpEvnt() {
	dispWord = this.value();
	wordChanged = true;
}

function badCharsEvnt() {
	badLetters = new RegExp('[' + this.value() + ']');
}

function getLongestWord() {
	wordChanged = true;
	longestWord = "";
	for (let testWord of words) {

		if (testWord.length <= longestWord.length) {
			continue;
		}
		if (testWord.match(badLetters)) {
			continue;
		}

		longestWord = testWord;
	}
	dispWord = longestWord;
	console.log(longestWord);
}
