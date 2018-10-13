let badLetters = /[gkmqvwxzio]/;
let longestWord = "";
let words;
let dispWord;
let ratioSlider;
let wordInput;
let ratio;
let wordChanged = true;

let nums = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B, 0x77, 0x1f, 0x4e, 0x3d, 0x4f, 0x47];
let sevChars = {
	"0": 0x7E,
	"1": 0x30,
	"2": 0x6D,
	"3": 0x79,
	"4": 0x33,
	"5": 0x5B,
	"6": 0x5F,
	"7": 0x70,
	"8": 0x7F,
	"9": 0x7B,
	" ": 0x00,
	"A": 0x77,
	"a": 0x7D,
	"B": 0x7F,
	"b": 0x1F,
	"C": 0x4E,
	"c": 0x0D,
	"D": 0x7E,
	"d": 0x3D,
	"E": 0x4F,
	"e": 0x6f,
	"F": 0x47,
	"f": 0x47,
	"G": 0x5E,
	"g": 0x7B,
	"H": 0x37,
	"h": 0x17,
	"I": 0x30,
	"i": 0x10,
	"J": 0x3C,
	"j": 0x38,
	"K": 0x37,
	"k": 0x17,
	"L": 0x0E,
	"l": 0x06,
	"M": 0x55,
	"m": 0x55,
	"N": 0x15,
	"n": 0x15,
	"O": 0x7E,
	"o": 0x1D,
	"P": 0x67,
	"p": 0x67,
	"Q": 0x73,
	"q": 0x73,
	"R": 0x77,
	"r": 0x05,
	"S": 0x5B,
	"s": 0x5B,
	"T": 0x46,
	"t": 0x0F,
	"U": 0x3E,
	"u": 0x1C,
	"V": 0x27,
	"v": 0x23,
	"W": 0x3F,
	"w": 0x2B,
	"X": 0x25,
	"x": 0x25,
	"Y": 0x3B,
	"y": 0x33,
	"Z": 0x6D,
	"z": 0x6D,
}

let displays = [];

function preload() {
	words = loadStrings('assets/words.txt');
}

function setup() {
	let canvas = createCanvas(windowWidth, 400);
	canvas.parent('canvas');
	ratioSlider = createSlider(.25, 2, 1, .1);
	ratioSlider.parent('slider');

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
	wordInput = createInput(dispWord);
	wordInput.parent('inputBox');
	wordInput.input(inpEvnt);
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
		// segs.updateVal(nums[index]);
		segs.updateRatio(ratioSlider.value());
		segs.draw();
	}
}

function inpEvnt() {
	dispWord = this.value();
	wordChanged = true;
}