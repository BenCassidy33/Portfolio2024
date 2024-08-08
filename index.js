'use strict';

import * as anim from "./animations.js"

const NAME = "Benjamin Cassidy";

const nameDisplay = document.getElementById("name");
const cursorDisplay = document.getElementById("cursor")


class KeyFrame {
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


const bannerDisplays = {
    fullName: "Hi! I'm Benjamin Cassidy",
    titleSep: ", a ",
    student: "Student",
    webDeveloper: "Web Developer",
    languages: " and a Javascript, Rust, and Go Developer!",
}

const preDelay = 1000
const postDelay = 1000

const nameKeyframes = [
    new KeyFrame(() => anim.typewriterEffect(0, bannerDisplays.fullName, nameDisplay, null), preDelay, postDelay),
    new KeyFrame(() => anim.typewriterEffect(0, bannerDisplays.titleSep, nameDisplay, null), 0, 0),

    new KeyFrame(() => anim.typewriterEffect(0, bannerDisplays.student, nameDisplay, null), 0, postDelay),
    new KeyFrame(() => anim.deleteTypewriterEffect(bannerDisplays.student.length, bannerDisplays.fullName, nameDisplay, null), preDelay, postDelay),

    new KeyFrame(() => anim.typewriterEffect(0, bannerDisplays.webDeveloper, nameDisplay, null), preDelay, postDelay),
    new KeyFrame(() => anim.deleteTypewriterEffect(bannerDisplays.webDeveloper.length, bannerDisplays.fullName, nameDisplay, null), preDelay, 0),
    new KeyFrame(() => anim.deleteTypewriterEffect(bannerDisplays.titleSep.length, bannerDisplays.titleSep, nameDisplay, null), 0, 0),

    new KeyFrame(() => anim.typewriterEffect(0, bannerDisplays.languages, nameDisplay, null), preDelay, postDelay),
    new KeyFrame(() => anim.deleteTypewriterEffect(bannerDisplays.languages.length, bannerDisplays.languages, nameDisplay, null), preDelay, 0),

    new KeyFrame(() => anim.deleteTypewriterEffect(bannerDisplays.fullName.length, bannerDisplays.fullName, nameDisplay, null), 0, postDelay),
];

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

runAnimations(nameKeyframes)


document.addEventListener("scroll", (_) => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgressLeft").value = scrolled
    document.getElementById("scrollProgressRight").value = scrolled
})

