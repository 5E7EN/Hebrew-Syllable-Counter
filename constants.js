const hebrewString = 'בָּוְדָה';

const rangesToRemove = [
    /[\u0591-\u05AF]/g, // Irrelevant characters
    /[\u05BC-\u05C7]/g, // More irrelevant characters
    /[\u05D0-\u05F4]/g // Hebrew Letters
];
const weakVowelRegex = /(\u05B6|\u05B7|\u05BB|\u05B4)/;
const resultCheckRegex = /[\u05B0-\u05EA]/g;

module.exports = { hebrewString, rangesToRemove, weakVowelRegex, resultCheckRegex };
