var sourceCode = ""
var sourceContainer, sourceElement, accessMessageElement;

var startIndex = 0;
var endIndex = 0;
var cursorChar = "|";

var locked = false;

const CHARS_PER_STROKE = 3;
const load_source_code = () => {
    var client = new XMLHttpRequest();
    client.open('GET', './code.txt');     
    client.onreadystatechange = function () {
        sourceCode = client.responseText;
    }
    client.send();
}

const getElements = () => {
    sourceContainer = document.getElementById("container");
    sourceElement = document.getElementById("source");
}

const update_screen = () => {
    if (!locked) {
        endIndex += CHARS_PER_STROKE;
        sourceElement.textContent = sourceCode.substring(startIndex, endIndex);

        //scroll position
        window.scrollTo(0, sourceContainer.scrollHeight);

        //update_cursor
        sourceElement.textContent += cursorChar;
    }

}

function update_cursor() {
    var text = sourceElement.textContent;
    var lastChar = text.charAt(text.length - 1);
    if (lastChar === cursorChar) {
        sourceElement.textContent = text.substring(0, text.length - 1);
    }
    else {
    sourceElement.textContent += cursorChar;
    }
}
const init = () => {
    load_source_code()
    getElements()
    window.setTimeout(update_cursor, 500);
}

init()


// Automate
setInterval(update_screen, 100)

// Keyboard Press
// window.onkeydown = (e) => {
//     update_screen()
// };
