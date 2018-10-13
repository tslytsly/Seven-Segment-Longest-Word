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

	getLongestWord();
}

function draw() {
	background(0);

	if (wordChanged) {
		wordChanged = false;
		displays = [];

		if (dispWord.length > 11) {
			num = dispWord.length - 10;
			ratio = 1 - (num * .04);
		} else {
			ratio = 1;
		}

		ratioSlider.value(ratio);

		for (let i = 0; i < dispWord.length; i++) {
			let chr = dispWord.charAt(i);
			displays.push(new SevSeg(sevChars[chr], i * 160, 0, ratio));
		}
	}

	for (let segs of displays) {
		segs.updateRatio(ratioSlider.value());
		segs.draw();
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