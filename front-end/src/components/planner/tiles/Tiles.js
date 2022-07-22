import { useRef, useState } from "react";
import "./Tiles.css";

const Tiles = ({
  columns,
  rows,
  setTileX,
  setTileY,
  selectedSprite,
  moving,
  setMoving,
}) => {
  const [tiles, setTiles] = useState(
    new Array(rows).fill(0).map((row) => new Array(columns).fill(0))
  );

  const handleMouseClick = ({ target }) => {
    let x = target.getAttribute("x");
    let y = target.getAttribute("y");

    // Verify all tiles have a truthy placeable value.
    for (let i = 0; i < selectedSprite.height; i++) {
      for (let n = 0; n < selectedSprite.width; n++) {
        let element = document.getElementById(
          `tile${parseInt(x) + n}-${parseInt(y) + i}`
        );
        if (element.getAttribute("placeable") === "false") return;
      }
    }
    // change all tiles "placeable" value from thuthy to falsy.
    for (let i = 0; i < selectedSprite.height; i++) {
      for (let n = 0; n < selectedSprite.width; n++) {
        let element = document.getElementById(
          `tile${parseInt(x) + n}-${parseInt(y) + i}`
        );
        if (element.getAttribute("placeable") === "true")
          element.setAttribute("placeable", "false");
      }
    }

    let element = document.getElementById(`tile${parseInt(x)}-${parseInt(y)}`);

    selectedSprite.element.style.width = `${selectedSprite.width}em`;
    selectedSprite.element.style.bottom = `-${selectedSprite.height - 1}em`;
    const sprite = selectedSprite.element.cloneNode(true);
    element.appendChild(sprite);

    const spriteContainer = document.createElement("div");
    spriteContainer.style.width = `${selectedSprite.width}em`;
    spriteContainer.style.height = `${selectedSprite.height}em`;
    element.appendChild(spriteContainer);
  };

  const handleMouseEnter = ({ target }) => {
    let x = target.getAttribute("x");
    let y = target.getAttribute("y");

    console.log(target.getAttribute("placeable"));

    // (X, Y) coords
    setTileX((prev) => (prev === x ? prev : x));
    setTileY((prev) => (prev === y ? prev : y));

    if (selectedSprite.id.length) {
      for (let i = 0; i < selectedSprite.height; i++) {
        for (let n = 0; n < selectedSprite.width; n++) {
          let element = document.getElementById(
            `tile${parseInt(x) + n}-${parseInt(y) + i}`
          );
          element.getAttribute("placeable") === "true"
            ? (element.style.background = "rgba(0,255,0,0.3)")
            : (element.style.background = "rgba(255,0,0,0.3)");
        }
      }
      return;
    }
    target.style.background = "rgba(255,255,255,0.3)";
  };

  const handleMouseLeave = ({ target }) => {
    const x = target.getAttribute("x");
    const y = target.getAttribute("y");
    if (selectedSprite.id.length) {
      for (let i = 0; i < selectedSprite.height; i++) {
        for (let n = 0; n < selectedSprite.width; n++) {
          document.getElementById(
            `tile${parseInt(x) + n}-${parseInt(y) + i}`
          ).style.background = "none";
        }
      }
      return;
    }
    target.style.background = "none";
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

  return (
    <div className="tiles-container">
      {tiles.map((tile, tileIndex) => (
        <div key={tileIndex} className="rows">
          {tile.map((cell, cellIndex) => {
            let placeable = unplaceableTiles(cellIndex, tileIndex);
            return (
              <div
                key={cellIndex}
                id={`tile${cellIndex}-${tileIndex}`}
                x={cellIndex}
                y={tileIndex}
                placeable={placeable}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseClick}
                className="tile"
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Tiles;
