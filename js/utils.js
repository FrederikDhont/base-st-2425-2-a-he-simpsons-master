// Hulp functies

/**
 * Creates a new HTML element with optional properties.
 *
 * @param {object} options - The options for creating the element.
 * @param {string} options.tagName - The tag name of the element (e.g., 'div', 'p').
 * @param {string} [options.id] - The ID of the element.
 * @param {string} [options.innerText] - The text content of the element.
 * @param {string|string[]} [options.classes] - A single class name or an array of class names to add.
 * @param {string} [options.src] - The source path for elements like `<img>`.
 * @param {object} [options.events] - An object of event listeners where the key is the event name (e.g., 'click') and the value is the handler function.
 *
 * @returns {HTMLElement} The newly created HTML element.
 *
 * @example
 * // Create a button element with classes and event listeners
 * const button = createElement({
 *   tagName: 'button',
 *   innerText: 'Click me',
 *   classes: ['btn', 'primary'],
 *   events: {
 *     click: () => alert('Button clicked!'),
 *     mouseover: () => console.log('Hovered on button')
 *   }
 * });
 *
 * document.body.appendChild(button);
 */
function createHTMLElement({
  tagName,
  id,
  innerText,
  classes,
  src,
  events = {},
}) {
  if (!tagName) {
    throw new Error("tagName is required");
  }

  const element = document.createElement(tagName);

  // Id
  if (id) element.id = id;

  // Inner text
  if (innerText !== undefined) element.innerText = innerText;

  // Class(es)
  if (classes) {
    if (Array.isArray(classes)) {
      element.classList.add(...classes);
    } else if (typeof classes === "string") {
      element.classList.add(classes);
    }
  }

  // Path of img source
  if (src) element.src = src;

  // Add event listeners
  for (const [event, handler] of Object.entries(events)) {
    element.addEventListener(event, handler);
  }

  return element;
}

/**
 * Capitalizes the first letter of a string and replaces all "-" with spaces.
 *
 * @param {string} str - The input string
 * @returns {string} The transformed string
 *
 * @example
 * capitalizeAndFormat("hello-world") // "Hello world"
 * capitalizeAndFormat("make-it-nice") // "Make it nice"
 */
function capitalizeAndFormat(str) {
  if (typeof str !== "string" || !str.length) return str;

  // Replace - with whitespace
  const replaced = str.replace("-", " ");

  // Uppercase first character + rest of string
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
}
