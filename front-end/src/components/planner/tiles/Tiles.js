import { useEffect, useState } from "react";
import {
  changeTilePlacement,
  changeTileBackground,
  removeTileBackground,
  unplaceableTiles,
} from "../utils/utils";
import "./Tiles.css";

const Tiles = ({ columns, rows, setTileX, setTileY, selectedSprite }) => {
  const [tiles, setTiles] = useState(
    new Array(rows).fill(0).map((row) => new Array(columns).fill(0))
  );

  useEffect(() => {
    const onWindowLoad = () => {
      // Greenhouse
      let sprite = document
        .getElementById("Greenhouse")
        .firstChild.cloneNode(true);

      sprite.classList.remove("sprite-list-item");
      sprite.classList.add("placed-sprite");

      let x = 26;
      let y = 10;
      let width = parseInt(sprite.getAttribute("tile-width"));
      let height = parseInt(sprite.getAttribute("tile-height"));

      sprite.style.width = `${width}em`;
      sprite.style.bottom = `-${height - 1}em`;

      const greenhouseTile = document.getElementById(`tile${x}-${y}`);
      greenhouseTile.appendChild(sprite);
      changeTilePlacement(x, y, width, height);

      // Shipping Box
      sprite = document
        .getElementById("Shipping_Box")
        .firstChild.cloneNode(true);

      sprite.classList.remove("sprite-list-item");
      sprite.classList.add("placed-sprite");

      x = 71;
      y = 14;
      width = parseInt(sprite.getAttribute("tile-width"));
      height = parseInt(sprite.getAttribute("tile-height"));

      sprite.style.width = `${width}em`;
      sprite.style.bottom = `${height - 1}em`;

      const shippingBoxTile = document.getElementById(`tile${x}-${y}`);
      shippingBoxTile.appendChild(sprite);
      changeTilePlacement(x, y, width, height);
    };
    onWindowLoad();
    return;
  }, []);

  const handleMouseClick = ({ target }) => {
    try {
      const x = parseInt(target.getAttribute("x"));
      const y = parseInt(target.getAttribute("y"));
      const height = selectedSprite.height;
      const width = selectedSprite.width;

      // Verify all tiles have a truthy placeable value.
      for (let i = 0; i < height; i++) {
        for (let n = 0; n < width; n++) {
          let element = document.getElementById(`tile${x + n}-${y + i}`);
          if (element.getAttribute("placeable") === "false") return;
        }
      }
      // change all tiles "placeable" value from thuthy to falsy.
      changeTilePlacement(x, y, width, height);

      let element = document.getElementById(`tile${x}-${y}`);

      selectedSprite.element.style.width = `${width}em`;
      selectedSprite.element.style.bottom = `-${height - 1}em`;
      const sprite = selectedSprite.element.cloneNode(true);
      element.appendChild(sprite);

      const spriteContainer = document.createElement("div");
      spriteContainer.style.width = `${width}em`;
      spriteContainer.style.height = `${height}em`;
      element.appendChild(spriteContainer);
    } catch (error) {
      return null;
    }
  };

  const handleMouseEnter = ({ target }) => {
    try {
      let x = parseInt(target.getAttribute("x"));
      let y = parseInt(target.getAttribute("y"));

      // (X, Y) coords
      setTileX((prev) => (prev === x ? prev : x));
      setTileY((prev) => (prev === y ? prev : y));

      if (selectedSprite.id.length) {
        const width = selectedSprite.width;
        const height = selectedSprite.height;

        changeTileBackground(x, y, width, height);
        return;
      }
      target.style.background = "rgba(255,255,255,0.3)";
    } catch (error) {
      return null;
    }
  };

  const handleMouseLeave = ({ target }) => {
    try {
      const x = parseInt(target.getAttribute("x"));
      const y = parseInt(target.getAttribute("y"));
      if (selectedSprite.id.length) {
        const width = selectedSprite.width;
        const height = selectedSprite.height;
        removeTileBackground(x, y, width, height);
        return;
      }
      target.style.background = "none";
    } catch (error) {
      return null;
    }
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
