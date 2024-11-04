# JSON-dictionary utils

## uniter.js

You can use it to unite several json dictionaries.

## Dictionary to Anki

You can convert the json-dictionary to an anki text file (to import in Anki).

It also creates the copy of the json-dictionary with "externalId", which you can use 
with Foreign Reader.

1. Go to src/dictionary-to-anki.js file
2. change "dictionaryPath", "newDictionaryPath", "ankiExportTextPath", "ankiDeckId" (any string without space)
3. go to the root folder
4. run `npm run to-anki`

## See also:

[dictionary.interface.ts](https://github.com/andrew2020wit/foreign-reader/blob/master/dictionary/dictionary.interface.ts)

[Foreign Reader](https://github.com/andrew2020wit/foreign-reader)


This code is under MIT-license.
