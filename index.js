const { HEBREW_STRING, LETTER_REGEX, REMOVAL_REGEX_RANGES, SHEVA_REGEX, letters, vowels } = require('./constants');
const cvFc = require('./conversionFuncs');

/********************** Functions **********************/

function convertUnicode(string) {
    return cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(string, 'hex'), 'none', 4, 'hex');
}

function isLetter(string = '') {
    return letters.includes(string);
}

function mapVowels(word = '') {
    const results = [];

    let vowelBuilder = '';
    let letterBuilder = {};

    for (const char of word) {
        console.log(`Found ${char} (${convertUnicode(char)})`);
        if (isLetter(char)) {
            // Check if first occurance of letter
            if (!letterBuilder.letter) {
                console.log(`Building first letter: ${char}`);
                letterBuilder.letter = char;
            } else {
                console.log(`Found another letter: ${char} -> Saving old letter with vowels and building new...`);

                // Update vowels; then push previous builder into result
                if (vowelBuilder.length > 0) {
                    letterBuilder.vowels = vowelBuilder;
                } else {
                    letterBuilder.vowels = null;
                }

                results.push(letterBuilder);
                vowelBuilder = '';

                // Check if letter is last char
                if (word.charAt(word.length - 1) === char) {
                    letterBuilder = { letter: char, vowels: null };
                    results.push(letterBuilder);
                    vowelBuilder = '';
                } else {
                    letterBuilder = { letter: char };
                }
            }
        } else {
            // Check if vowel is last char
            if (word.charAt(word.length - 1) === char) {
                vowelBuilder += ` ${char} (${convertUnicode(char)})`;
                letterBuilder.vowels = vowelBuilder;
                results.push(letterBuilder);
                vowelBuilder = '';
            } else {
                vowelBuilder += ` ${char} (${convertUnicode(char)})`;
            }
        }
    }

    return results;
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
console.log(`Original unicode equiv: ${origUnicode}`);

console.log(words);

// Process words
for (const [index, word] of words.entries()) {
    console.log(`Analyzing word #${index}...`);

    const shevaIndices = findShevas(word);
    for (const shevaIndex of shevaIndices) {
        console.log(`Found sheva at index #${shevaIndex} (on letter ${word[shevaIndex].letter})`);
    }
}

console.log(`Modified unicode equiv: ${workingUnicode}`);
console.log('------------------------------------');
