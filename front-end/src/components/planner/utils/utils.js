const removeHyphonAndUnderscore = (string) => string.replace(/[-_]/g, " ");

const upperCaseFirstLetter = (string) =>
  removeHyphonAndUnderscore(string)
    .split(/[\s-_]/g)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");

const changeTilePlacementToTrue = (x, y, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      let element = document.getElementById(`tile${x + n}-${y + i}`);
      element.setAttribute("placeable", "true");
    }
  }
};

const changeTilePlacementToFalse = (x, y, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      let element = document.getElementById(`tile${x + n}-${y + i}`);
      if (element.getAttribute("placeable") === "true")
        element.setAttribute("placeable", "false");
    }
  }
};

const validateTiles = (x, y, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      const element = document.getElementById(`tile${x + n}-${y + i}`);
      if (element.getAttribute("placeable") === "false") return false;
    }
  }
};

const changeTileBackground = (x, y, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      let element = document.getElementById(`tile${x + n}-${y + i}`);
      element.getAttribute("placeable") === "true"
        ? (element.style.background = "rgba(0,255,0,0.3)")
        : (element.style.background = "rgba(255,0,0,0.3)");
    }
  }
};

const removeTileBackground = (x, y, width, height) => {
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      document.getElementById(`tile${x + n}-${y + i}`).style.background =
        "none";
    }
  }
};

const unplaceableTiles = (x, y) => {
  x = parseInt(x);
  y = parseInt(y);
  if (
    (y <= 6 && x >= 46 && x <= 52) ||
    (y <= 7 && x <= 39) ||
    (y <= 7 && x >= 42 && x <= 45) ||
    (y === 7 && x === 48) ||
    (y <= 8 && x >= 53 && x <= 54) ||
    (y <= 8 && x >= 7 && x <= 9) ||
    (y === 8 && x === 3) ||
    (y <= 9 && x >= 55) ||
    (y >= 11 && y <= 16 && x >= 59 && x <= 67) ||
    (y <= 14 && x >= 78) ||
    (y >= 18 && x >= 77) ||
    (y >= 23 && y <= 33 && x >= 3 && x <= 6) ||
    (y >= 28 && x >= 70 && y <= 32 && x <= 74) ||
    (y === 33 && x >= 71 && x <= 74) ||
    (y >= 29 && y <= 32 && x === 75) ||
    (y === 34 && x <= 5) ||
    (y === 35 && x <= 4) ||
    (y === 36 && x === 3) ||
    (y >= 49 && x >= 36 && x <= 42 && y <= 57) ||
    (y === 50 && x >= 35 && x <= 43) ||
    (y >= 51 && x >= 34 && y <= 56 && x <= 45) ||
    (y >= 52 && y <= 54 && x >= 33 && x <= 46) ||
    (y === 55 && x === 46) ||
    (y === 57 && x >= 43 && x <= 44) ||
    (y === 58 && x >= 37 && x <= 41) ||
    (y >= 59 && x >= 69) ||
    (y >= 56 && x >= 73) ||
    (y >= 62 && x <= 39) ||
    (y >= 62 && x >= 42) ||
    (y <= 64 && x <= 2)
  ) {
    return "false";
  }
  return "true";
};

const placeSprite = (id, x, y, width, height) => {
  const spriteContainer = document.createElement("div");

  spriteContainer.style.width = `${width}em`;
  spriteContainer.style.height = `${height}em`;

  spriteContainer.setAttribute("id", `${id.replace(/\W\d\d/g, "")}-${x}-${y}`);
  spriteContainer.setAttribute("x", x);
  spriteContainer.setAttribute("y", y);

  spriteContainer.classList.add("placed-sprite-container");
  return spriteContainer;
};

const removeSprite = (x, y, width, height) => {
  changeTilePlacementToTrue(x, y, width, height);
  document.getElementById(`tile${x}-${y}`).innerHTML = "";
};

export {
  removeHyphonAndUnderscore,
  upperCaseFirstLetter,
  changeTilePlacementToFalse,
  changeTilePlacementToTrue,
  validateTiles,
  changeTileBackground,
  removeTileBackground,
  unplaceableTiles,
  placeSprite,
  removeSprite,
};
