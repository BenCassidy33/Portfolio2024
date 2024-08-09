'use strict';
//import { KeyFrame, typewriterEffect, deleteTypewriterEffect } from "./animations";
import * as pages from "./pages.js"

class Terminal {
    constructor() {
        this.prefix = `<span style="color: green; font-size: 32px;">❯</span>`

        this.lastCmds = []
        this.lastCmdOffset = 0
        this.terminalHeader = "Welcome to My Website! Type 'help' for help or use the header buttons to navigate ( ◠ ‿ ◠ )"
        this.terminalElement = document.getElementById("terminal")
        this.currentDirectoryPrefix = "~/"

        this.notFound = "<p>Command not found! Type 'help' for help!</p>"

        this.terminalOutput = ""

        this.commands = {
            cd: "Changes the website section.",
            ls: "Lists the sections of the current website section you are in.",
            find: "Allows you to search for the website section you are looking for.",
            clear: "Clears the terimal screen",
            open: "Allows you to view the content of the ",
            help: "Brings this page back up."
        }

        this.files = {
            name: "home",
            type: "directory",
            files: ["index.html", "test.html"],

            about_me: {
                name: "about_me",
                type: "directory",
                files: ["about_me.html", "my_experience.html"]
            },

            contact_me: {
                name: "contact_me",
                type: "file",
                name: "contact_me.html",
                path: "./pages/contact_me"
            }

        }

        this.currentDirectory = this.files


        this.Update(this.terminalHeader)
    }

    updatePrefixDir(last) {
        last !== "home" ? this.currentDirectoryPrefix = this.currentDirectoryPrefix.concat(`${last}/`) : this.currentDirectoryPrefix = "~/"
    }

    Cd(dir) {
        let error = null

        if (dir === "home" || dir === ".." || dir === "" || dir === "../") {
            this.currentDirectory = this.files
            this.updatePrefixDir("home")
            this.Update("")
        }

        for (let item of Object.keys(this.currentDirectory)) {
            if (item === 'type') {
                continue;
            }

            if (item === 'files') {
                for (let file of this.currentDirectory[item]) {
                    if (file === dir) {
                        error = `<p>Cannot cd into ${dir}, is a file, not a directory. see 'help' for help</p>`
                    }
                }

                continue;
            }

            if (item === dir) {
                this.updatePrefixDir(dir)
                this.currentDirectory = item
                this.OpenDefault()
                this.Update("")

            }
        }
    }

    //getDirPath(lastDirectory, requestedDirectory) {
    //    if (directory === requestedDirectory) {
    //        `${directory}`
    //    }
    //
    //    if (directory !== requestedDirectory) {
    //        let subDir = Object.keys(directory)
    //
    //        if (Object.keys(subDir) === null) {
    //            return;
    //        }
    //
    //        for (let dir in Object.keys(lastDirectory)) {
    //            return `/${this.getDirPath(dir, requestedDirectory)}`
    //        }
    //    }
    //}

    ParseCommand(cmd) {
        this.lastCmds.push(cmd)

        switch (true) {
            default:
                this.Update(this.notFound)
                break

            case (cmd === "help"):
                this.Help()
                break;

            case (cmd === "ls"):
                this.Ls()
                break;

            case (cmd.split(" ")[0] === "cd"):
                this.Cd(cmd.slice(3));
                break;

            case (cmd === "clear"):
                this.SoftClear()
                break;

            case (cmd.split(" ")[0] === "open"):
                this.Open(cmd.slice(5))
                break;
        }
    }

    Help() {
        this.Update(`
         <p>cd: Changes the website section.</p>
         <p>ls: Lists the sections of the current website section you are in.</p>
         <p>clear: Clears the terimal screen.</p>
         <p>open: Allows you to view the content of the section. (Will automatically open the default page in each dir)</p>
         <p>help: Brings this page back up.</p>
        `)
        //<p>find: Allows you to search for the website section you are looking for.</p>
    }

    totalClear() {
        this.terminalElement.innerHTML = ""
    }


    SoftClear() {
        this.Update()
    }

    Open(page) {
        console.log(`Attempting to open default page Name: ${this.currentDirectory}`,
            pages.pages[`${this.currentDirectory.name}_index`]);
        page = page.slice(0, -5);
        console.log(page);
        let content = pages.pages[`${this.currentDirectory}_${page}`]
    }

    OpenDefault() {
        document.getElementById("sectionPage").innerHTML =
            pages.pages[`${this.currentDirectory.name}_index`];
    }

    Ls() {
        let result = `<p>${this.currentDirectoryPrefix}</p>`

        for (let item of Object.keys(this.currentDirectory)) {


            if (item === 'type' || item === 'name') {
                continue;
            }

            if (item === 'files') {
                for (let file of this.currentDirectory[item]) {
                    result = result.concat(`<p>|- ${file}</p>`)
                }
                continue;
            }

            result = result.concat(`<p>|-   ${item}/</p>`)

        }

        //this.Update(`${Object.keys(this.currentDirectory)}`)
        this.Update(result)
    }

    Update(result, clear) {
        let input =
            `<form id="terminalCmd" clsss="cmd"><span>${this.currentDirectoryPrefix} ${this.prefix}   </span><input type="text" id="input" required></input></form>`

        if (clear) {
            terminalElement.innerHTML = input
            return;
        }

        this.totalClear()
        //if (this.lastCmds[-1] !== 'clear' && this.lastCmds[-1]) {
        //    this.terminalElement.innerHTML += `<p> ${this.lastCmds[this.lastCmds.length - 1]}</p>`
        //}

        if (result) {
            this.terminalElement.innerHTML += `<p> ${result}</p> `
        }
        this.terminalElement.innerHTML += input
        this.lastCmdOffset = 0

        document.getElementById("input").focus()
    }

}

const terminal = new Terminal()
//const cmdInput = document.getElementById("terminalCmd")

document.getElementById("terminal").addEventListener('submit', (event) => {
    event.preventDefault();
    const inputField = document.getElementById("input");
    const cmdValue = inputField.value.trim();
    inputField.value = '';
    terminal.ParseCommand(cmdValue);
});

/// TODO
//document.addEventListener("keydown", (event) => {
//    if (event.key === 'ArrowUp') {
//        console.log("Len: ", terminal.lastCmds.length)
//
//        if (terminal.lastCmds.length === 0) {
//            document.querySelector("input").value = ""
//        }
//        else if (terminal.lastCmds.length - terminal.lastCmdOffset - 1 < 0) {
//            document.querySelector("input").value = terminal.lastCmds[0]
//        } else {
//            document.querySelector("input").value = terminal.lastCmds[terminal.lastCmds.length - terminal.lastCmdOffset - 1]
//        }
//    }
//
//    if (event.key === 'ArrowDown') {
//        console.log(terminal.lastCmds)
//        if (terminal.lastCmdOffset - 1 >= terminal.lastCmds.length) {
//            document.querySelector("input").value = ""
//        }
//        else if (terminal.lastCmdOffset + 1 > terminal.lastCmds.length - 1) {
//            document.querySelector("input").value = terminal.lastCmds[terminal.lastCmdOffset - 1]
//        } else {
//            document.querySelector("input").value = terminal.lastCmds[terminal.lastCmds.length + terminal.lastCmdOffset - 1]
//        }
//    }
//    terminal.lastCmdOffset += 1
//})

