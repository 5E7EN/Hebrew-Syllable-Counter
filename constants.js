const HEBREW_STRING = 'בְּבַקָשָהה';

const REMOVAL_RANGES = [
    /[\u0591-\u05AF]/g, // Trup characters
    /[\u05BD-\u05C7]/g // Other irrelevant/trup characters
];

const lettersByName = {
    alef: '\u05D0', // א HEBREW LETTER ALEF
    bet: '\u05D1', // ב HEBREW LETTER BET
    gimel: '\u05D2', // ג HEBREW LETTER GIMEL
    dalet: '\u05D3', // ד HEBREW LETTER DALET

    he: '\u05D4', // ה HEBREW LETTER HE
    vav: '\u05D5', // ו HEBREW LETTER VAV
    zayin: '\u05D6', // ז HEBREW LETTER ZAYIN

    het: '\u05D7', // ח HEBREW LETTER HET
    tet: '\u05D8', // ט HEBREW LETTER TET
    yod: '\u05D9', // י HEBREW LETTER YOD

    kaf: '\u05DB', // כ HEBREW LETTER KAF
    lamed: '\u05DC', // ל HEBREW LETTER LAMED
    mem: '\u05DE', // מ HEBREW LETTER MEM
    nun: '\u05E0', // נ HEBREW LETTER NUN

    samekh: '\u05E1', // ס HEBREW LETTER SAMEKH
    ayin: '\u05E2', // ע HEBREW LETTER AYIN
    pe: '\u05E4', // פ HEBREW LETTER PE
    tsadi: '\u05E6', // צ HEBREW LETTER TSADI

    qof: '\u05E7', // ק HEBREW LETTER QOF
    resh: '\u05E8', // ר HEBREW LETTER RESH
    shin: '\u05E9', // ש HEBREW LETTER SHIN
    tav: '\u05EA', // ת HEBREW LETTER TAV

    finalKaf: '\u05DA', // ך HEBREW LETTER FINAL KAF
    finalMem: '\u05DD', // ם HEBREW LETTER FINAL MEM
    finalNun: '\u05DF', // ן HEBREW LETTER FINAL NUN
    finalPe: '\u05E3', // ף HEBREW LETTER FINAL PE
    finalTsadi: '\u05E5' // ץ HEBREW LETTER FINAL TSADI
};

const vowelsByName = {
    patah: '\u05B7', //  ַ HEBREW POINT PATAH
    qamats: '\u05B8', //  ָ HEBREW POINT QAMATS
    tsere: '\u05B5', //  ֵ HEBREW POINT TSERE
    hiriq: '\u05B4', //  ִ HEBREW POINT HIRIQ
    shuruqDagesh: '\u05BC',

    segol: '\u05B6', //  ֶ HEBREW POINT SEGOL
    holamHaser: '\u05BA', //  ֺ HEBREW POINT HASER

    holam: '\u05B9', //  ֹ HEBREW POINT HOLAM
    qubuts: '\u05BB', //  ֻ HEBREW POINT QUBUTS
    sheva: '\u05B0', //  ְ HEBREW POINT SHEVA
    hatafSegol: '\u05B1', //  ֱ HEBREW POINT HATAF SEGOL
    hatafPatah: '\u05B2', //  ֲ HEBREW POINT HATAF PATAH
    hatafQamats: '\u05B3' //  ֳ HEBREW POINT HATAF QAMATS
};

const begadkefatLetters = [
    lettersByName.bet,
    lettersByName.gimel,
    lettersByName.dalet,
    lettersByName.kaf,
    lettersByName.finalKaf,
    lettersByName.pe,
    lettersByName.finalPe,
    lettersByName.tav
];

module.exports = { HEBREW_STRING, REMOVAL_RANGES, lettersByName, vowelsByName, begadkefatLetters };
