const fs = require('node:fs');

// you must have files like: /dict-source/longman.json ...

const dictionaries = ['longman', 'cald', 'lingvo'];

const dictionaryFolder = './dict-source/';

const dictionaryName =  dictionaries.join('-');

const dictionaryTermLanguage = 'en';
const dictionaryLicense = 'Not licensed';
const updateDate = new Date().toISOString();
const formatDescriptor = 'JSONDictionary';

const outputPath = getDictionaryPath(dictionaryName);

const newDictionaryArticles = {};

dictionaries.forEach(dictName => {
	const source = fs.readFileSync(getDictionaryPath(dictName), 'utf-8');
	const json = JSON.parse(source);
	addDictionary(json, dictName);
})


function getDictionaryPath(name) {
	return dictionaryFolder + name + '.json';
}

const newDictionaryToExport = Object.keys(newDictionaryArticles).map(key => {
	return {
		term: key.trim(),
		articles: newDictionaryArticles[key]
	};
}
);

function addDictionary(dict, dictionaryName) {
	let termCounter = 0;	
	dict.terms.forEach(term => {
		let currentTerm = term.term;
		
		if (currentTerm === 'constructor') {
			currentTerm = 'constructor '
		}
		
		if (!newDictionaryArticles[currentTerm]) {
			newDictionaryArticles[currentTerm] = [];
		}
		
		termCounter++;

		term.articles.forEach(art => art.dictionaryName = dictionaryName);

		newDictionaryArticles[currentTerm] = [...(newDictionaryArticles[currentTerm]), ...term.articles];
	});

	console.log(dictionaryName, ': ', termCounter);
}

fs.writeFileSync(outputPath, JSON.stringify({ formatDescriptor, dictionaryName, dictionaryTermLanguage, dictionaryLicense, updateDate, terms: newDictionaryToExport }, null, 2));

console.log('======== Done! ============');
