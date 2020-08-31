const colors = require('colors');

const constants = require('./constants');
const cvFc = require('./conversionFuncs');

const resultCheckRegex = /[\u05B0-\u05EA]/g;

const rangesToRemove = [
    /[\u05D0-\u05F4]/g, // Hebrew Letters

    /[\u0591-\u05AF]/g, // ?
    /[\u05BC-\u05C7]/g // ?
];

(() => {
    let original = constants.TO_CHECK;
    let modified = original;

    // Remove characters that match removal ranges
    for (const range of rangesToRemove) {
        modified = modified.replace(range, '');
    }

    // Convert strings to unicode for comparsion
    const originalUnicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(original, 'hex'), 'none', 4, 'hex');
    const resultUnicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(modified, 'hex'), 'none', 4, 'hex');

    // Prepare result
    const resultText = resultCheckRegex.test(modified)
        ? [
              '\n---------',
              colors.bold.green(`Total syllables after processing: ${modified.match(resultCheckRegex).length}\n`),
              colors.yellow(`Original unicode string equiv: ${originalUnicode}`),
              colors.yellow(`Modified unicode string equiv: ${resultUnicode}`),
              colors.underline(`URL query: https://www.google.com/search?q=${encodeURIComponent(modified)}`),
              '---------\n'
          ].join('\n')
        : 'Input does not contain Hebrew vowels.';
    console.log(resultText);
})();

// const checkNiqqud = (string) => {
//     /* Get amount of all Niqqudos from input */
//     let niqqudos = (string.match(generalRegex) || '').length;
//     let hebrewChars = (string.match(hebrewCharsRegex) || '').length;
//     console.log(`Total detected Hebrew letters: ${hebrewChars}`);
//     console.log(`Total detected Niqqudos: ${niqqudos}`);

//     /* Conditions */

//     // Ignore Shin and Sin - Subtract each intance from original length
//     if (/\u05C1/g.test(string)) niqqudos = niqqudos - string.match(/\u05C1+/g).length; // Shin
//     if (/\u05C2/g.test(string)) niqqudos = niqqudos - string.match(/\u05C2+/g).length; // Sin

//     // Check if message ends with one or two Sheva's and subtract appropriately
// if ((/\u05B0/g.test(string.charAt(string.length - 1)) && /\u05B0/g.test(string.charAt(string.length - 3))) || /\u05B0/g.test(string.charAt(string.length - 1))) {
//     if (/\u05B0/g.test(string.charAt(string.length - 1)) && /\u05B0/g.test(string.charAt(string.length - 3))) niqqudos = niqqudos - 2;
//     else if (/\u05B0/g.test(string.charAt(string.length - 1))) niqqudos = niqqudos - 1;
// }

//     /* Result */
//     const result = generalRegex.test(string) ? `Syllables after processing: ${niqqudos}` : `Input does not contain Hebrew vowels.`;
//     return result;
// };
