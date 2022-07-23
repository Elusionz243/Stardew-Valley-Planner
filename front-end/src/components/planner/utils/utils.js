const removeHyphonAndUnderscore = (string) => string.replace(/[-_]/g, " ");

const upperCaseFirstLetter = (string) =>
  removeHyphonAndUnderscore(string)
    .split(/[\s-_]/g)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");

const changeTilePlacement = (x, y, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      let element = document.getElementById(`tile${x + n}-${y + i}`);
      if (element.getAttribute("placeable") === "true")
        element.setAttribute("placeable", "false");
    }
  }
};

export { removeHyphonAndUnderscore, upperCaseFirstLetter, changeTilePlacement };
