const HEBREW_STRING = 'בְּבַקָשָה';

const LETTER_REGEX = /[\u05D0-\u05EA]/;
const REMOVAL_REGEX_RANGES = [
    /[\u0591-\u05AF]/g, // Trup characters
    /[\u05BD-\u05C7]/g // Other irrelevant/trup characters
];
const SHEVA_REGEX = /\u05B0/;

module.exports = { HEBREW_STRING, LETTER_REGEX, REMOVAL_REGEX_RANGES, SHEVA_REGEX };
