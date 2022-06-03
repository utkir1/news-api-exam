let $_ = (selector, node = document) => {
  return node.querySelector(selector);
}

let $$_ = (selector, node = document) => {
  return node.querySelectorAll(selector);
}

// Function for create HTML elements
let createElement = (tag, classes = '', content = '', node = null) => {
  let element = document.createElement(tag);
  element.setAttribute("class", classes);
  element.innerHTML = content;
  if (node !== null) {
    node.appendChild(element);
  }
  return element;
}