const { HEBREW_STRING, REMOVAL_RANGES, lettersByName, vowelsByName } = require('./constants');
const { convertCharString, convertNumbers2Char } = require('./unicodeFunctions');

//#region Functions

function convertUnicode(string) {
    return convertCharString(convertNumbers2Char(string, 'hex'), 'none', 4, 'hex');
}

function isLetter(string = '') {
    return Object.values(lettersByName).includes(string);
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
                vowelBuilder += char; // ` ${char} (${convertUnicode(char)})`
                letterBuilder.vowels = vowelBuilder;
                results.push(letterBuilder);
                vowelBuilder = '';
            } else {
                vowelBuilder += char; // ` ${char} (${convertUnicode(char)})`
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

function isShevaCounted(word = [], letterPairIndex = 0) {
    // !- Sheva is on first letter of word
    if (letterPairIndex === 0) {
        return true;
    }

    // !- Sheva also hash degash
    if (word[letterPairIndex].vowels.includes(vowelsByName.shuruqDagesh)) {
        return true;
    }

    // !- Next letter is same as current, and has no vowels
    if (word[letterPairIndex].letter === word[letterPairIndex + 1].letter && word[letterPairIndex + 1].vowels === null) {
        return true;
    }

    // May need to implement skipping next word for this; since only second is counted
    // !- Sheva is not on last letter of word, next letter also has sheva, and isn't 2nd to last letter
    if (
        letterPairIndex !== word.length - 1 &&
        word[letterPairIndex + 1].vowels?.includes(vowelsByName.sheva) &&
        letterPairIndex + 1 !== word.length - 1
    ) {
        return true;
    }

    return false;
}

//#endregion

//#region Parsing

let workingString = HEBREW_STRING;
const origUnicode = convertUnicode(HEBREW_STRING);

// Remove characters that should be ignored
for (const range of REMOVAL_RANGES) {
    workingString = workingString.replace(range, '');
}

//#endregion

const workingUnicode = convertUnicode(workingString);
const words = splitAndMapVowels(workingString);

//#region Processing

let totalSyllableCount = 0;

console.log('------------------------------------');
console.log(`Original unicode equiv: ${origUnicode}`);

console.log(words);

// Process words
for (const [index, word] of words.entries()) {
    console.log(`Analyzing word #${index + 1}...`);

    for (const [letterPairIndex, letterPair] of word.entries()) {
        if (letterPair.vowels !== null) {
            if (letterPair.vowels.includes(vowelsByName.sheva)) {
                // Check sheva conditions
                if (isShevaCounted(word, letterPairIndex)) {
                    totalSyllableCount++;
                }
            } else {
                // Check if vowel is Dagesh only
                if (/^\u05BC$/.test(letterPair.vowels)) {
                    // Ensure the letter is vav
                    if (letterPair.letter === lettersByName.vav) {
                        totalSyllableCount++;
                    }
                } else {
                    // Increment count for any other vowels
                    totalSyllableCount++;
                }
            }
        }
    }
}

//#endregion

console.log(`Modified unicode equiv: ${workingUnicode}`);
console.log('------------------------------------');

console.log(`TOTAL SYLLABLES: ${totalSyllableCount}`);
