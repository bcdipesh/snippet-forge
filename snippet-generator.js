'use strict';

// select DOM elements
const userInput = document.querySelector('.user-input');
const nameInput = document.querySelector('#name');
const prefixInput = document.querySelector('#prefix');
const descriptionInput = document.querySelector('#description');
const snippetInput = document.querySelector('#snippet');
const copyBtn = document.querySelector('.copy-btn');

/**
 * Gathers user input from the input field and returns
 * an object containing all the input value.
 *
 * @returns {Object} Object with values of input field.
 */
const collectUserInput = () => {
	return {
		name: nameInput.value.trim(),
		prefix: prefixInput.value.trim(),
		description: descriptionInput.value.trim(),
		snippet: snippetInput.value.split(/\r?\n/),
	};
};

/**
 * Helper function that generates a snippet object with the
 * parameters passed to it and then displays it to the DOM.
 *
 * @param {string} name 		The name of the snippet.
 * @param {string} prefix 		The shortcut to trigger the snippet.
 * @param {string} description 	The description for the snippet.
 * @param {string} snippet 		The actual snippet snippet.
 */
const setSnippet = (name, prefix, description, snippet) => {
	// create a snippet object with the arguments passed
	const snippetObject = {
		[name]: {
			prefix,
			body: [...snippet],
			description,
		},
	};

	let snippetJSONString = JSON.stringify(snippetObject, undefined, 4);

	const openingCurlyBraceIndex = snippetJSONString.indexOf('{');
	const closingCurlyBraceIndex = snippetJSONString.lastIndexOf('}');

	// remove the extra opening and curly braces of the JSONString
	// to get the desired result
	snippetJSONString = snippetJSONString.substring(
		openingCurlyBraceIndex + 1,
		closingCurlyBraceIndex
	);

	// select DOM and insert the formatted JSON string output of the generated snippet
	document.querySelector('.result pre code').innerText = snippetJSONString;
};

/**
 * Generates a snippet from the input provided by
 * the user.
 *
 * @param {Object} e	The event object.
 */
const generateSnippet = (e) => {
	// reset old clipboard data and copy button text
	copyBtn.innerText = 'Copy Snippet';
	navigator.clipboard.writeText('');

	const { name, prefix, description, snippet } = collectUserInput();
	setSnippet(name, prefix, description, snippet);
};

/**
 * Copy snippet to clipboard
 */
const copyToClipboard = (e) => {
	// get the snippet
	const snippet = document.querySelector('.result pre code').innerText;

	// copy only if the snippet is not empty
	if (snippet.trim()) {
		// copy the snippet
		navigator.clipboard.writeText(snippet);

		// notify user that snippet it copied
		copyBtn.innerText = 'Snippet Copied Successfully!';
	}
};

// add event listener
userInput.addEventListener('keyup', generateSnippet);
copyBtn.addEventListener('click', copyToClipboard);
