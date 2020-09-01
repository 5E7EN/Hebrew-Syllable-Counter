const colors = require('colors');

const { hebrewString, rangesToRemove, strongVowelRegex, weakVowelRegex, resultCheckRegex } = require('./constants');
const cvFc = require('./conversionFuncs');

let modified = hebrewString;
let resultLengthModifier = 0;

// Remove characters that should be ignored
for (const range of rangesToRemove) {
    modified = modified.replace(range, '');
}

// Split string for processing
const splitString = modified.split(' ');

// Loop through each word in string
for (const word of splitString) {
    // Find all Sheva indices for future processing
    const shevaIndices = [];
    for (let i = 0; i < word.length; i++) {
        if (/\u05B0/.test(word[i])) shevaIndices.push(i);
    }

    for (const index of shevaIndices) {
        // Don't count Sheva if it has preceeding weak vowel
        if (weakVowelRegex.test(word.charAt(index - 1))) {
            resultLengthModifier++;
        }
        // Count Sheva if it has preceeding strong vowel
        if (strongVowelRegex.test(word.charAt(index - 1))) {
            resultLengthModifier--;
        }
    }

    // Don't count Sheva if at last index
    if (/\u05B0/.test(word.charAt(word.length - 1))) {
        resultLengthModifier++;
    }
}

// Convert strings to unicode for comparsion
const originalUnicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(hebrewString, 'hex'), 'none', 4, 'hex');
const resultUnicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(modified, 'hex'), 'none', 4, 'hex');

// Prepare result
const resultText = resultCheckRegex.test(modified)
    ? [
          '\n---------',
          colors.bold.green(`Total syllables after processing: ${modified.match(resultCheckRegex).length - resultLengthModifier}\n`),
          colors.yellow(`Original unicode string equiv: ${originalUnicode} (${hebrewString})`),
          colors.yellow(`Modified unicode string equiv: ${resultUnicode} (${modified})`),
          colors.underline(`URL query: https://www.google.com/search?q=${encodeURIComponent(modified)}`),
          '---------\n'
      ].join('\n')
    : 'Input does not contain Hebrew vowels.';
console.log(resultText);
