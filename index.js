const { HEBREW_STRING, LETTER_REGEX, REMOVAL_REGEX_RANGES, SHEVA_REGEX } = require('./constants');
const cvFc = require('./conversionFuncs');

/********************** Functions **********************/

function convertUnicode(string) {
    return cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(string, 'hex'), 'none', 4, 'hex');
}

function isLetter(string = '') {
    const result = LETTER_REGEX.test(string);
    LETTER_REGEX.lastIndex = 0;
    return result;
}

function mapVowels(word = '') {
    const result = [];

    let letter = '';
    let valBuilder = '';
    let objBuilder = {};

    for (const char of word) {
        if (isLetter(char)) {
            if (letter && !objBuilder.letter) {
                objBuilder.letter = letter;
                if (word.charAt(word.length - 1) === char) objBuilder.letter = char;

                result.push(objBuilder);
            }

            if (valBuilder.length > 0) {
                objBuilder.vowels = valBuilder;
            } else {
                if (letter) objBuilder.vowels = null;
            }

            // Set new letter and reset builders
            letter = char;
            valBuilder = '';
            objBuilder = {};
        } else {
            valBuilder += char;

            // Check if current index is last char and update result
            if (word.charAt(word.length - 1) === char && letter) {
                objBuilder.letter = letter;
                objBuilder.vowels = valBuilder;

                result.push(objBuilder);
            }
        }
    }

    return result;
}

function splitAndMapVowels(text = '') {
    const result = [];
    const splitText = text.split(' ');

    for (const word of splitText) {
        result.push(mapVowels(word));
    }

    return result;
}

function findShevas(mappedWord = []) {
    const shevaIndices = [];

    for (let i = 0; i < mappedWord.length; i++) {
        if (SHEVA_REGEX.test(mappedWord[i].vowels)) shevaIndices.push(i);
    }

    return shevaIndices;
}

/*********************** Parsing ***********************/

let workingString = HEBREW_STRING;
const origUnicode = convertUnicode(HEBREW_STRING);

// Remove characters that should be ignored
for (const range of REMOVAL_REGEX_RANGES) {
    workingString = workingString.replace(range, '');
}

const workingUnicode = convertUnicode(workingString);
const words = splitAndMapVowels(workingString);

/********************* Processing **********************/

console.log('------------------------------------');
console.log(`Original unicode equiv (original): ${origUnicode}`);

console.log(words);

// Process words
for (const [index, word] of words.entries()) {
    console.log(`Analyzing word #${index}...`);

    const shevaIndices = findShevas(word);
    for (const shevaIndex of shevaIndices) {
        console.log(`Found sheva at index #${shevaIndex} (on letter ${word[shevaIndex].letter})`);
    }
}

console.log(`Modified unicode equiv (original): ${workingUnicode}`);
console.log('------------------------------------');
