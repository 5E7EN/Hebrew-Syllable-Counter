# Hebrew Syllable Algorithm

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
-   `[\u05D0-\u05F4]` - (Actual Letters)

### Exclusions to ranges

-   `05C4`
-   `05C1`
-   `05C2`

## Rules

If _Gedolah_ preceeds Shevah, Shevah is considered syllable.  
If _Ketanah_ preceeds Shevah, Shevah is **NOT** considered syllable.

#### Gedolah - Strong

-   Cholam (`05B9` or `05BA`)
-   Tzere (`05B5`)
-   Kamatz (`05B8`)
-   Shoorook (`05BC`)
-   Chiriq _am yad_ (`05B4`)

#### Ketanah - Weak

-   Kamatz Katan ()
-   Segol (`05B6`)
-   Pasach (`05B7`)
-   Kubutz (`05BB`)
-   Chiriq (`05B4`)

## Misc.

`05BA` = Cholam for Vav  
`05B9` = Cholam (for what??)
