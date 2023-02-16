'use strict';

// select DOM elements
const userInput = document.querySelector('.user-input');
const nameInput = document.querySelector('#name');
const prefixInput = document.querySelector('#prefix');
const descriptionInput = document.querySelector('#description');
const snippetInput = document.querySelector('#snippet');

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
		prefix,
		body: [...snippet],
		description,
	};

	// select DOM and insert the formatted JSON string output of the generated snippet
	document.querySelector(
		'.result pre code'
	).innerText = `"${name}":${JSON.stringify(snippetObject, undefined, 4)}`;
};

/**
 * Generates a snippet from the input provided by
 * the user.
 *
 * @param {Object} e	The event object.
 */
const generateSnippet = (e) => {
	const { name, prefix, description, snippet } = collectUserInput();
	setSnippet(name, prefix, description, snippet);
};

// add event listener
userInput.addEventListener('keyup', generateSnippet);
