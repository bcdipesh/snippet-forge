'use strict';

// select DOM elements
const userInput = document.querySelector('.user-input');
const nameInput = document.querySelector('#name');
const prefixInput = document.querySelector('#prefix');
const descriptionInput = document.querySelector('#description');
const snippetInput = document.querySelector('#snippet');

const snippetName = document.querySelector('.snippet-name');
const snippetPrefix = document.querySelector('.snippet-prefix');
const snippetBody = document.querySelector('.snippet-body');
const snippetDescription = document.querySelector('.snippet-description');

const collectUserInput = () => {
	return {
		name: nameInput.value.trim(),
		prefix: prefixInput.value.trim(),
		description: descriptionInput.value.trim(),
		snippet: snippetInput.value.split(/\r?\n/),
	};
};

const setSnippet = (name, prefix, description, snippet) => {
	snippetName.innerText = name;
	snippetPrefix.innerText = prefix;
	snippetDescription.innerText = description;
	snippetBody.innerHTML = '';
	snippet.forEach((userSnippet, index) => {
		const paragraph = document.createElement('p');

		if (snippet.length - 1 === index) {
			paragraph.innerText = `"${userSnippet}"`;
		} else {
			paragraph.innerText = `"${userSnippet}",`;
		}

		snippetBody.appendChild(paragraph);
	});
};

const generateSnippet = (e) => {
	const { name, prefix, description, snippet } = collectUserInput();
	setSnippet(name, prefix, description, snippet);
};

// add event listener
userInput.addEventListener('keyup', generateSnippet);
