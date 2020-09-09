const { HEBREW_STRING, LETTER_REGEX } = require('./constants');
const cvFc = require('./conversionFuncs');

/********************** Functions **********************/

function convertUnicode(string) {
    return cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(string, 'hex'), 'none', 4, 'hex');
}

function isLetter(s) {
    const r = LETTER_REGEX.test(s);
    LETTER_REGEX.lastIndex = 0;
    return r;
}

function mapVowels(text = '') {
    const result = [];

    const splitText = text.split(' ');

    for (const [i, word] of splitText.entries()) {
        let letter = '';
        let valBuilder = '';
        let objBuilder = {};

        for (const char of word) {
            if (isLetter(char)) {
                if (letter) {
                    objBuilder.letter = letter;
                    result.push(objBuilder);
                }

                if (valBuilder.length > 0) {
                    objBuilder.vowels = valBuilder;
                } else {
                    if (letter) objBuilder.vowels = null;
                }

                // Set new letter and reset builders
                letter = char;
                objBuilder.wordIndex = i;

                valBuilder = '';
                objBuilder = {};
            } else {
                valBuilder += char;

                // Check if current index is last char and update result
                if (word.substring(word.length - 1) === char && letter) {
                    objBuilder.letter = letter;
                    objBuilder.vowels = valBuilder;
                    objBuilder.wordIndex = i;

                    result.push(objBuilder);
                }
            }
        }
    }

    return result;
}

/*********************** Parsing ***********************/

const unicode = convertUnicode(HEBREW_STRING);
const vowels = mapVowels(HEBREW_STRING);

/********************* Processing **********************/

// TODO: Do stuff
console.log(`Unicode equiv (original): ${unicode}`);
console.log(vowels);
