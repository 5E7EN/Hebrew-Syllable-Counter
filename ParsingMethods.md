# Hebrew String Parsing Methods/Algorithms

## Objective

Detect amount of syllables in Hebrew string.

## Techniques

### Method #1 - Selective removal (semi iterative)

#### Steps:

1. Remove all characters except vowels
2. Iterate once to fetch indices of occuring _Shevas_
3. For every _Sheva_ occurance, make the following checks:

    - If _Sheva_ has preceeding weak vowel, reduce end result by 1 (_Sheva_ not counted)
    - If _Sheva_ has preceeding strong vowel, increase end result by 1 (_Sheva_ counted)
    - If word starts with _Dagesh_ preceeding _Sheva_, reduce end result by 1 (_Sheva_ not counted)

4. Remove other redundant _Dageshes_
5. Match string against result regex (vowel unicode range) and subtract by result length modifier as determined above

#### Cons

-   Unable to apply letter based conditions due to step #1

### Method #2 - Vowel/Letter Mapping (iterative)

#### Steps:

1. Initialize (l)etter string, (v)alue builder string, and object (b)uilder object
2. Iterate through string char by char to construct vowels to letter map:
    - If char is letter -
        - If **l** string is populated and no value exists in `letter` key in **b** object, push **o** object to result array
        - If values exist in **v** string, set `vowels` key as **v** string in **b** object - otherwise, if **l** string is populated, set `vowels` key as `NULL` in **b** object
        - Set **l** string as char for future key assignment
        - Reset/clear **v** string and **b** object
    - If char isn't letter -
        - If char is last in word
            - Set `letter` key as **l** string and `vowels` key as **v** string in **o** object and push **o** object to result array
        - Otherwise
            - Append char to **v** string (until processed upon detection of next letter)
3. Continue at step 2 of method #1

#### Cons

TBA
