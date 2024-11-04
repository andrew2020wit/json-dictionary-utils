const fs = require('node:fs');

// Change values:

const dictionaryPath = './dict-source/cald.json';
const newDictionaryPath = './dict-source/cald-with-ext-id.json'
const ankiExportTextPath = './dict-source/anki-export-text.csv';
const ankiDeckId = 'cald';

// Don't change: (if you not sure)

const source = fs.readFileSync(dictionaryPath, 'utf-8');
const dict = JSON.parse(source);

let ankiForImportText = '';

let termCounter = 0;
let articleCounter = 0;
let definitionCounter = 0;
let exampleCounter = 0;

dict.terms.forEach(term => {
    termCounter++;
    const termName = term.term;

    term.articles?.forEach(article => {
        articleCounter++;
        const partOfSpeech = article.partOfSpeech;
        const transcription = article.transcription;

        article.definitions?.forEach(definition => {
            definitionCounter++;

            const definitionText = definition.definition;
            const level = definition.level;
            const lexicalUnit = definition.lexicalUnit;
            const synonym = definition.synonym;
            const antonym = definition.antonym;

            definition.examples?.forEach(example => {
                exampleCounter++;

                const originalExampleText = example.original;
                const exampleTranslation = example.translation;

                const externalId = ankiDeckId + '-'
                    + 't' + termCounter
                    + 'a' + articleCounter
                    + 'd' + definitionCounter
                    + 'e' + exampleCounter;

                example.externalId = externalId;

                const addToAnki = true;

                if (addToAnki) {
                    ankiForImportText += wrapTextField(externalId)
                        + wrapTextField(termName)
                        + wrapTextField(partOfSpeech)
                        + wrapTextField(transcription)
                        + wrapTextField(definitionText)
                        + wrapTextField(level)
                        + wrapTextField(lexicalUnit)
                        + wrapTextField(synonym)
                        + wrapTextField(antonym)
                        + wrapTextField(originalExampleText)
                        + wrapTextField(exampleTranslation)
                        + '\n';
                }
            })
        })
    });
});

fs.writeFileSync(newDictionaryPath, JSON.stringify(dict, null, 2));

fs.writeFileSync(ankiExportTextPath, ankiForImportText);

function wrapTextField(text) {
    return '"' + (text?.replaceAll('"', '`') || '') + '"' + ';';
}