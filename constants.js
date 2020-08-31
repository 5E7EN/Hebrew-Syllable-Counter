const cvFc = require('./conversionFuncs');

const toCheck = 'תוֹדָה';

const unicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(toCheck, 'hex'), 'none', 4, 'hex');
console.log(`Original unicode string equiv: ${unicode}`);

module.exports = { toCheck };
