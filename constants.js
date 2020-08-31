const cvFc = require('./conversionFuncs');

const toCheck = 'ָ';

const unicode = cvFc.convertCharStr2CPOLD(cvFc.convertNumbers2Char(toCheck, 'hex'), 'none', 4, 'hex');

console.log(`Unicode string equiv: ${unicode}`);

module.exports = { toCheck };
