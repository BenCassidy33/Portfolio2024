let builder = ""


/**
 * Returns a promise that resolves when typing is complete
 * @param {number} index
 * @param {string} text 
 * @param {HTMLElement} textElement
 * @param {HTMLElement} cursorElement 
 */
export function typewriterEffect(index, text, textElement, cursorElement) {
  return new Promise((resolve) => {
    if (index < text.length) {
      builder += text[index];
      textElement.innerText = builder;
      //cursorElement.style.marginLeft = `${Math.ceil(textElement.clientWidth)}px`
      setTimeout(() => typewriterEffect(index + 1, text, textElement, cursorElement).then(resolve), 75);
    } else {
      resolve()
    }
  });
}

/**
 * Deletes characters from the text element
 * @param {number} index
 * @param {string} text 
 * @param {HTMLElement} textElement
 * @param {HTMLElement} cursorElement 
 */
export function deleteTypewriterEffect(index, text, textElement, cursorElement) {
  return new Promise((resolve) => {
    if (index > 0) {
      builder = builder.slice(0, -1);
      textElement.innerText = builder;
      //cursorElement.style.marginLeft = `${Math.ceil(textElement.clientWidth)}px`
      setTimeout(() => deleteTypewriterEffect(index - 1, text, textElement, cursorElement).then(resolve), 75);
    } else {
      resolve();
    }
  });
}


document.addEventListener("scroll", (_) => {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("scrollProgressLeft").value = scrolled
  document.getElementById("scrollProgressRight").value = scrolled
})

