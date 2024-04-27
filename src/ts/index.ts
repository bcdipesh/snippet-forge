// Select DOM elements
const userInput = document.querySelector(".user-input") as HTMLInputElement;
const nameInput = document.querySelector("#name") as HTMLInputElement;
const prefixInput = document.querySelector("#prefix") as HTMLInputElement;
const descriptionInput = document.querySelector(
  "#description"
) as HTMLInputElement;
const snippetInput = document.querySelector("#snippet") as HTMLInputElement;
const copyBtn = document.querySelector(".copy-btn") as HTMLButtonElement;

interface UserInputObject {
  name: string;
  prefix: string;
  description: string;
  snippet: string[];
}

/**
 * Gathers user input from the input field and returns
 * an object containing all the input value.
 *
 * @returns {UserInputObject} Object with values of input field.
 */
const collectUserInput = (): UserInputObject => {
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
 * @param {UserInputObject} Object with values of input field.
 */
const setSnippet = ({
  name,
  prefix,
  description,
  snippet,
}: UserInputObject): void => {
  // Create a snippet object with the arguments passed
  const snippetObject = {
    [name]: {
      prefix,
      body: [...snippet],
      description,
    },
  };

  let snippetJSONString = JSON.stringify(snippetObject, undefined, 4);

  const openingCurlyBraceIndex = snippetJSONString.indexOf("{");
  const closingCurlyBraceIndex = snippetJSONString.lastIndexOf("}");

  // Remove the extra opening and curly braces of the JSONString
  // to get the desired result
  snippetJSONString = snippetJSONString.substring(
    openingCurlyBraceIndex + 1,
    closingCurlyBraceIndex
  );

  // Select DOM and insert the formatted JSON string output of the generated snippet
  const resultDom = document.querySelector(
    ".result pre code"
  ) as HTMLPreElement;
  resultDom.innerText = snippetJSONString;
};

/**
 * Generates a snippet from the input provided by
 * the user.
 *
 * @param {KeyboardEvent} event	Keyboard event.
 */
const generateSnippet = (event: KeyboardEvent): void => {
  // Reset old clipboard data and copy button text
  copyBtn.innerText = "Copy Snippet";
  navigator.clipboard.writeText("");

  const { name, prefix, description, snippet } = collectUserInput();
  setSnippet({ name, prefix, description, snippet });
};

/**
 * Copy snippet to the clipboard.
 *
 * @param {MouseEvent} event Mouse event.
 */
const copyToClipboard = (event: MouseEvent): void => {
  // Get the snippet
  const resultDom = document.querySelector(
    ".result pre code"
  ) as HTMLPreElement;
  const snippet = resultDom.innerText;

  // Copy only if the snippet is not empty
  if (snippet.trim()) {
    // Copy the snippet
    navigator.clipboard.writeText(snippet);

    // Notify user that snippet it copied
    copyBtn.innerText = "Snippet Copied Successfully!";
  }
};

// Add event listener
userInput.addEventListener("keyup", generateSnippet);
copyBtn.addEventListener("click", copyToClipboard);
