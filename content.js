const paragraph = document.getElementsByTagName("p");

const rgbToHex = (red, green, blue) => {
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");
    return `#${redHex}${greenHex}${blueHex}`;
};

// `document.querySelector` may return null if the selector doesn't match anything.
if (paragraph) {
    for (let i in paragraph) {
        console.log(paragraph[i].textContent);
        const color = window
            .getComputedStyle(paragraph[i])
            .getPropertyValue("color");
        const colorArray = color.match(/\d+/g);
        const colorCode = rgbToHex(colorArray[0], colorArray[1], colorArray[2]);
        console.log(colorCode);
        const baloon = document.createElement("span");
        baloon.classList.add("baloon");
        baloon.style.cssText = `background-color: ${colorCode}`;
        baloon.textContent = colorCode;
        paragraph[i].appendChild(baloon);
    }
}
