# Hebrew Syllable Detector

Determines how many syllables are in a Hebrew paragraph

# Reference

<https://www.unicode.org/charts/PDF/U0590.pdf>

## To Replace

-   `05B3` -> `05B8`
-   `05B2` -> `05B7`
-   `05B1` -> `05B6`

## To Remove

### Unused ranges within Unicode block

-   `[\u0591-\u05AF]`
-   `[\u05BC-\u05C7]`
-   `[\u05D0-\u05F4]` - (Actual Letters) | 🤔

### Exclusions to ranges

-   `05C4`
-   `05C1`
-   `05C2`

## Misc.

`05BA` = Cholam for Vav  
`05B9` = Cholam (for what??)
