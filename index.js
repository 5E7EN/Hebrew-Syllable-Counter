const colors = require('colors');

const constants = require('./constants');
const cvFc = require('./conversionFuncs');

const rangesToRemove = [
    /[\u05D0-\u05F4]/g, // Hebrew Letters

    /[\u0591-\u05AF]/g, // ?
    /[\u05BC-\u05C7]/g // ?
];

const weakVowelRegex = /(\u05B6|\u05B7|\u05BB|\u05B4)/;

const resultCheckRegex = /[\u05B0-\u05EA]/g;

(() => {
    let original = constants.TO_CHECK;
    let modified = original;
    let resultLengthModifier = 0;

    // Remove characters that match removal ranges
    for (const range of rangesToRemove) {
        modified = modified.replace(range, '');
    }

    // Check if each word ends with one or two Sheva's and subtract from end result appropriately
    const splitString = modified.split(' ');

    // Loop through each word in string
    for (const word of splitString) {
        // Find all sheva indices for future processing
        const shevaIndices = [];
        for (let i = 0; i < word.length; i++) {
            if (/\u05B0/.test(word[i])) shevaIndices.push(i);
        }

        // Don't count Sheva if it has preceeding weak vowel
        for (const index of shevaIndices) {
            if (weakVowelRegex.test(word.charAt(index - 1))) {
                resultLengthModifier++;
            }
        }

        // Don't count Sheva if at last index
        if (/\u05B0/.test(word.charAt(word.length - 1))) {
            resultLengthModifier++;
        }
    }

    // Convert strings to unicode for comparsion
    const originalUnicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(original, 'hex'), 'none', 4, 'hex');
    const resultUnicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(modified, 'hex'), 'none', 4, 'hex');

    // Prepare result
    const resultText = resultCheckRegex.test(modified)
        ? [
              '\n---------',
              colors.bold.green(`Total syllables after processing: ${modified.match(resultCheckRegex).length - resultLengthModifier}\n`),
              colors.yellow(`Original unicode string equiv: ${originalUnicode} (${original})`),
              colors.yellow(`Modified unicode string equiv: ${resultUnicode} (${modified})`),
              colors.underline(`URL query: https://www.google.com/search?q=${encodeURIComponent(modified)}`),
              '---------\n'
          ].join('\n')
        : 'Input does not contain Hebrew vowels.';
    console.log(resultText);
})();
