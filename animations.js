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

/**
    @param {KeyFrame[]} frames
*/
async function runAnimations(frames) {
  while (true) {
    for (let i = 0; i < frames.length; i++) {
      await frames[i].runPreDelay();
      await frames[i].run();
      await frames[i].runPostDelay();
    }

  }
}


export class KeyFrame {
  /**
    @param {BlobCallback} run
    @param {number | null} preDelay - delay before the animation starts in ms
    @param {number | null} postDelay - delay before the animation ends in ms
  */
  constructor(run, preDelay = 0, postDelay = 0) {
    this.run = run;
    this.preDelay = preDelay;
    this.postDelay = postDelay;
  }

  runPreDelay() {
    return new Promise(resolve => setTimeout(resolve, this.preDelay))
  }

  runPostDelay() {
    return new Promise(resolve => setTimeout(resolve, this.postDelay))
  }

  run() {
    return this.run()
  }
}


