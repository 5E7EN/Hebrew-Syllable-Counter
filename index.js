const constants = require('./constants');

const generalRegex = /[\u0591-\u05C7]/g;
const hebrewCharsRegex = /[\u05D0-\u05F4]/g;

const checkNiqqud = (string) => {
    /* Get amount of all Niqqudos from input */
    let niqqudos = (string.match(generalRegex) || '').length;
    let hebrewChars = (string.match(hebrewCharsRegex) || '').length;
    console.log(`Total detected Hebrew letters: ${hebrewChars}`);
    console.log(`Total detected Niqqudos: ${niqqudos}`);

    /* Conditions */
    // Ignore Shin and Sin - Subtract each intance from original length
    if (/\u05C1/g.test(string)) niqqudos = niqqudos - string.match(/\u05C1+/g).length; // Shin
    if (/\u05C2/g.test(string)) niqqudos = niqqudos - string.match(/\u05C2+/g).length; // Sin

    // Check if message ends with one or two Sheva's and subtract appropriately
    if ((/\u05B0/g.test(string.charAt(string.length - 1)) && /\u05B0/g.test(string.charAt(string.length - 3))) || /\u05B0/g.test(string.charAt(string.length - 1))) {
        if (/\u05B0/g.test(string.charAt(string.length - 1)) && /\u05B0/g.test(string.charAt(string.length - 3))) niqqudos = niqqudos - 2;
        else if (/\u05B0/g.test(string.charAt(string.length - 1))) niqqudos = niqqudos - 1;
    }

    /* Result */
    const result = generalRegex.test(string) ? `Syllables after processing: ${niqqudos}` : `Input does not contain Hebrew vowels.`;
    return result;
};

const result = checkNiqqud(constants.toCheck);
console.log(result);
