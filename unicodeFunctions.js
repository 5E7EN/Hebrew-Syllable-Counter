function hex2char(hex) {
    // converts a single hex number to a character
    // note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
    // hex: string, the hex codepoint to be converted
    var result = '';
    var n = parseInt(hex, 16);
    if (n <= 0x10ffff) result += String.fromCodePoint(n);
    else result += 'hex2Char error: Code point out of range: ' + dec2hex(n);
    return result;
}

function dec2hex(textString) {
    return (textString + 0).toString(16).toUpperCase();
}

function convertCharString(textString, parameters, pad, type) {
    // converts a string of characters to code points, separated by space
    // textString: string, the string to convert
    // parameters: string enum [ascii, latin1], a set of characters to not convert
    // pad: boolean, if true, hex numbers lower than 1000 are padded with zeros
    // type: string enum[hex, dec, unicode, 0x], whether output should be in hex or dec or unicode U+ form
    var haut = 0;
    var n = 0;
    var CPstring = '';
    var afterEscape = false;
    for (var i = 0; i < textString.length; i++) {
        var b = textString.charCodeAt(i);
        if (b < 0 || b > 0xffff) {
            CPstring += 'Error in convertChar2CP: byte out of range ' + dec2hex(b) + '!';
        }
        if (haut != 0) {
            if (0xdc00 <= b && b <= 0xdfff) {
                if (afterEscape) {
                    CPstring += ' ';
                }
                if (type == 'hex') {
                    CPstring += dec2hex(0x10000 + ((haut - 0xd800) << 10) + (b - 0xdc00));
                } else if (type == 'unicode') {
                    CPstring += 'U+' + dec2hex(0x10000 + ((haut - 0xd800) << 10) + (b - 0xdc00));
                } else if (type == 'zerox') {
                    CPstring += '0x' + dec2hex(0x10000 + ((haut - 0xd800) << 10) + (b - 0xdc00));
                } else {
                    CPstring += 0x10000 + ((haut - 0xd800) << 10) + (b - 0xdc00);
                }
                haut = 0;
                continue;
                afterEscape = true;
            } else {
                CPstring += 'Error in convertChar2CP: surrogate out of range ' + dec2hex(haut) + '!';
                haut = 0;
            }
        }
        if (0xd800 <= b && b <= 0xdbff) {
            haut = b;
        } else {
            if (b <= 127 && parameters.match(/ascii/)) {
                CPstring += textString.charAt(i);
                afterEscape = false;
            } else if (b <= 255 && parameters.match(/latin1/)) {
                CPstring += textString.charAt(i);
                afterEscape = false;
            } else {
                if (afterEscape) {
                    CPstring += ' ';
                }
                if (type == 'hex') {
                    cp = dec2hex(b);
                    if (pad) {
                        while (cp.length < 4) {
                            cp = '0' + cp;
                        }
                    }
                } else if (type == 'unicode') {
                    cp = dec2hex(b);
                    if (pad) {
                        while (cp.length < 4) {
                            cp = '0' + cp;
                        }
                    }
                    CPstring += 'U+';
                } else if (type == 'zerox') {
                    cp = dec2hex(b);
                    if (pad) {
                        while (cp.length < 4) {
                            cp = '0' + cp;
                        }
                    }
                    CPstring += '0x';
                } else {
                    cp = b;
                }
                CPstring += cp;
                afterEscape = true;
            }
        }
    }
    return CPstring;
}

function convertNumbers2Char(str, type) {
    // converts a string containing number sequences to a string of characters
    // str: string, the input
    // type: string enum [none, hex, dec, utf8, utf16], what to treat numbers as

    if (type === 'hex') {
        str = str.replace(/([A-Fa-f0-9]{2,8}\b)/g, function (matchstr, parens) {
            return hex2char(parens);
        });
    } else if (type === 'dec') {
        str = str.replace(/([0-9]+\b)/g, function (matchstr, parens) {
            return dec2char(parens);
        });
    } else if (type === 'utf8') {
        str = str.replace(
            /(( [A-Fa-f0-9]{2})+)/g,
            //str = str.replace(/((\b[A-Fa-f0-9]{2}\b)+)/g,
            function (matchstr, parens) {
                return convertUTF82Char(parens);
            }
        );
    } else if (type === 'utf16') {
        str = str.replace(/(( [A-Fa-f0-9]{1,6})+)/g, function (matchstr, parens) {
            return convertUTF162Char(parens);
        });
    }
    return str;
}

module.exports = { convertCharString, convertNumbers2Char };
