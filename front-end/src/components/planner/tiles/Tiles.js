import { useEffect, useState, useCallback } from "react";
import {
  changeTilePlacementToTrue,
  changeTilePlacementToFalse,
  changeTileBackground,
  validateTiles,
  removeTileBackground,
  unplaceableTiles,
  placeSprite,
  removeSprite,
} from "../utils/utils";
import "./Tiles.css";

const Tiles = ({
  columns,
  rows,
  setTileX,
  setTileY,
  selectedSprite,
  setSelectedSprite,
  placedSprites,
  selectedPlacedSprite,
  setSelectedPlacedSprite,
  activeTool,
  toolbarState,
}) => {
  const [tiles, setTiles] = useState(
    new Array(rows).fill(0).map((row) => new Array(columns).fill(0))
  );

  const [drawing, setDrawing] = useState(false);

  const handleMouseClick = (e) => {
    try {
      let x = parseInt(e.target.getAttribute("x"));
      let y = parseInt(e.target.getAttribute("y"));
      let id, width, height, sprite;
      let el = document.getElementById(`tile${x}-${y}`);

      if (!placedSprites.current[e.target.id]) {
        if (activeTool === "cursor") {
          if (selectedPlacedSprite.id.length) {
            id = selectedPlacedSprite.id;
            width = selectedPlacedSprite.width;
            height = selectedPlacedSprite.height;
            sprite = selectedPlacedSprite.element;
          }

          if (selectedSprite.id.length) {
            id = selectedSprite.id;
            width = selectedSprite.width;
            height = selectedSprite.height;
            sprite = selectedSprite.element.cloneNode(true);
          }

          //verify all tiles placement is truthy
          if (validateTiles(x, y, width, height) === false) return;

          // Remove sprite from spriteRefs{} and update the (x,y) position
          if (selectedPlacedSprite.id.length) {
            delete placedSprites.current[
              `${id.replace(/\W\d\d/g, "")}-${selectedPlacedSprite.x}-${
                selectedPlacedSprite.y
              }`
            ];
            setSelectedPlacedSprite({
              ...selectedPlacedSprite,
              x: x,
              y: y,
            });
          }

          // Add styling to sprites selected from Toolbar
          if (!selectedPlacedSprite.id.length) {
            sprite.style.width = `${width}em`;
            sprite.style.bottom = `-${height - 1}em`;
          }

          // Remove the sprite from the planner
          if (selectedPlacedSprite.id.length) {
            removeSprite(
              selectedPlacedSprite.x,
              selectedPlacedSprite.y,
              width,
              height
            );
          }
          // More Info in {../utils/utils.js}
          changeTilePlacementToFalse(x, y, width, height);

          let spriteContainer = placeSprite(id, x, y, width, height);

          el.appendChild(sprite);
          el.appendChild(spriteContainer);

          removeTileBackground(x, y, width, height);

          placedSprites.current = {
            ...placedSprites.current,
            [spriteContainer.id]: spriteContainer,
          };

          setSelectedPlacedSprite({
            ...selectedPlacedSprite,
            id: "",
            element: <></>,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          });
        }

        if (activeTool === "bucket") {
          if (selectedSprite.id.length) {
            id = selectedSprite.id;
            width = selectedSprite.width;
            height = selectedSprite.height;
            sprite = selectedSprite.element.cloneNode(true);
          }

          let top = 0;
          let right = 0;
          let bottom = 0;
          let left = 0;

          if (
            document
              .getElementById(`tile${x}-${y}`)
              .getAttribute("placeable") === "false"
          )
            return;

          for (let i = 0; i < y; i++) {
            const element = document.getElementById(`tile${x}-${y - i}`);
            if (element.getAttribute("placeable") === "false") {
              break;
            }
            top = i;
          }

          for (let i = 0; i < columns; i++) {
            const element = document.getElementById(`tile${x + i}-${y}`);
            if (element.getAttribute("placeable") === "false") {
              break;
            }
            right = i + 1;
          }
          for (let i = 0; i < rows; i++) {
            const element = document.getElementById(`tile${x}-${y + i}`);
            if (element.getAttribute("placeable") === "false") {
              break;
            }
            bottom = i + 1;
          }
          for (let i = 0; i < x; i++) {
            const element = document.getElementById(`tile${x - i}-${y}`);
            if (element.getAttribute("placeable") === "false") {
              break;
            }
            left = i;
          }
          for (let i = 0; i < top + bottom; i++) {
            for (let n = 0; n < right + left; n++) {
              const tile = document.getElementById(
                `tile${x - left + n}-${y - top + i}`
              );

              if (tile.getAttribute("placeable") === "true") {
                if (selectedSprite.id.length) {
                  sprite = selectedSprite.element.cloneNode(true);
                  id = selectedSprite.id;
                  width = selectedSprite.width;
                  height = selectedSprite.height;

                  sprite.style.width = `${width}em`;
                  sprite.style.bottom = `-${height - 1}em`;

                  let spriteContainer = placeSprite(id, x, y, width, height);

                  tile.appendChild(sprite);
                  tile.appendChild(spriteContainer);

                  placedSprites.current = {
                    ...placedSprites.current,
                    [spriteContainer.id]: spriteContainer,
                  };

                  changeTilePlacementToFalse(x, y, width, height);
                }
              }
            }
          }
        }
      }
      if (placedSprites.current[e.target.id]) {
        let sprite = placedSprites.current[e.target.id];
        const x = parseInt(sprite.getAttribute("x"));
        const y = parseInt(sprite.getAttribute("y"));
        const width = parseInt(sprite.style.width);
        const height = parseInt(sprite.style.height);
        const id = sprite.id;

        if (activeTool === "cursor") {
          const spriteElement = sprite.parentElement.firstChild.cloneNode(true);

          if (document.querySelector(".toolbar-sprite.select"))
            document
              .querySelector(".toolbar-sprite.select")
              .classList.remove("select");

          changeTilePlacementToTrue(x, y, width, height);
          setSelectedSprite({
            ...selectedSprite,
            id: "",
            element: <></>,
            x: 0,
            y: 0,
          });
          setSelectedPlacedSprite({
            ...selectedPlacedSprite,
            element: spriteElement,
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
          });
        }
        if (activeTool === "eraser") {
          if (e.target.id.replace(/\W\d\d/g, "") === "Greenhouse") return;

          removeSprite(x, y, width, height);
          delete placedSprites.current[id];
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleRightClick = (e) => {
    try {
      e.preventDefault();
      let x = parseInt(e.target.getAttribute("x"));
      let y = parseInt(e.target.getAttribute("y"));

      if (selectedPlacedSprite.id.length) {
        removeTileBackground(
          x,
          y,
          selectedPlacedSprite.width,
          selectedPlacedSprite.height
        );
        setSelectedPlacedSprite({
          id: "",
          element: <></>,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        });
      }
      if (selectedSprite.id.length) {
        removeTileBackground(x, y, selectedSprite.width, selectedSprite.height);
        setSelectedSprite({
          id: "",
          element: <></>,
          width: 0,
          height: 0,
        });
      }
    } catch (error) {
      return error;
    }
  };

  const handleMouseUpDown = (e) => {
    try {
      e.preventDefault();
      const x = parseInt(e.target.getAttribute("x"));
      const y = parseInt(e.target.getAttribute("y"));

      if (activeTool === "pencil" || activeTool === "eraser") {
        if (e.type === "mousedown") {
          setDrawing(true);
          if (activeTool === "eraser") {
            const sprite = placedSprites.current[e.target.id];
            const id = sprite.id;
            const width = parseInt(sprite.style.width);
            const height = parseInt(sprite.style.height);

            if (e.target.id.replace(/\W\d\d/g, "") === "Greenhouse") {
              return;
            }

            setSelectedPlacedSprite({
              ...selectedPlacedSprite,
              id: id,
              element: sprite,
              width: width,
              height: height,
              x: x,
              y: y,
            });
            setSelectedSprite({
              ...selectedSprite,
              id: "",
              element: <></>,
              width: 0,
              height: 0,
            });
            if (document.querySelector(".toolbar-sprite.select")) {
              const selected = document.querySelector(".toolbar-sprite.select");
              selected.classList.remove("select");
            }
          }
          if (!placedSprites.current[e.target.id]) {
            const element = document.getElementById(`tile${x}-${y}`);
            if (element.getAttribute("placeable") === "true") {
              const id = selectedSprite.id;
              const width = selectedSprite.width;
              const height = selectedSprite.height;
              const sprite = selectedSprite.element.cloneNode(true);

              sprite.style.width = `${width}em`;
              sprite.style.bottom = `-${height - 1}em`;

              let spriteContainer = placeSprite(id, x, y, width, height);

              changeTilePlacementToFalse(x, y, width, height);

              element.appendChild(sprite);
              element.appendChild(spriteContainer);

              console.log(element);
              placedSprites.current = {
                ...placedSprites.current,
                [spriteContainer.id]: spriteContainer,
              };
            }
          }
        } else if (e.type === "mouseup") {
          setDrawing(false);
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleMouseEnter = ({ target }) => {
    try {
      let x = parseInt(target.getAttribute("x"));
      let y = parseInt(target.getAttribute("y"));

      // (X, Y) coords
      setTileX((prev) => (prev === x ? prev : x));
      setTileY((prev) => (prev === y ? prev : y));

      if (activeTool === "cursor") {
        target.style.background = "rgba(255,255,255,0.3)";
        if (selectedPlacedSprite.id.length || selectedSprite.id.length) {
          const width = selectedPlacedSprite.width || selectedSprite.width;
          const height = selectedPlacedSprite.height || selectedSprite.height;
          changeTileBackground(x, y, width, height);
          return;
        }
      }
      if (activeTool === "bucket") {
        let top = 0;
        let right = 0;
        let bottom = 0;
        let left = 0;

        if (
          document.getElementById(`tile${x}-${y}`).getAttribute("placeable") ===
          "false"
        )
          return;

        for (let i = 0; i < y; i++) {
          const element = document.getElementById(`tile${x}-${y - i}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          top = i;
        }

        for (let i = 0; i < columns; i++) {
          const element = document.getElementById(`tile${x + i}-${y}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          right = i + 1;
        }

        for (let i = 0; i < rows; i++) {
          const element = document.getElementById(`tile${x}-${y + i}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          bottom = i + 1;
        }

        for (let i = 0; i < x; i++) {
          const element = document.getElementById(`tile${x - i}-${y}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          left = i;
        }

        for (let i = 0; i < top + bottom; i++) {
          for (let n = 0; n < right + left; n++) {
            const element = document.getElementById(
              `tile${x - left + n}-${y - top + i}`
            );
            if (element.getAttribute("placeable") === "true") {
              element.style.background = "rgba(255, 255, 255, 0.3)";
            }
          }
        }
        target.style.background = "rgba(255,255,255,0.3)";
      }
      if (activeTool === "pencil" || activeTool === "eraser") {
        let id, width, height, sprite;
        if (activeTool === "pencil")
          target.style.background = "rgba(255,255,255,0.3)";

        if (drawing) {
          if (activeTool === "pencil") {
            if (selectedSprite.id.length) {
              id = selectedSprite.id;
              width = selectedSprite.width;
              height = selectedSprite.height;
              sprite = selectedSprite.element.cloneNode(true);
              changeTileBackground(x, y, width, height);
            }
            const tile = document.getElementById(`tile${x}-${y}`);
            if (validateTiles(x, y, width, height) === false) return;

            if (tile.getAttribute("placeable") === "true") {
              sprite.style.width = `${width}em`;
              sprite.style.bottom = `-${height - 1}em`;

              let spriteContainer = placeSprite(id, x, y, width, height);

              tile.appendChild(sprite);
              tile.appendChild(spriteContainer);

              changeTilePlacementToFalse(x, y, width, height);
              changeTileBackground(x, y, width, height);

              placedSprites.current = {
                ...placedSprites.current,
                [spriteContainer.id]: spriteContainer,
              };
            }
            target.style.background = "rgba(255,255,255,0.3)";
          }
          if (activeTool === "eraser") {
            if (selectedPlacedSprite.id.length) {
              const id = `${selectedPlacedSprite.id.replace(
                /\W\d\d/g,
                ""
              )}-${x}-${y}`;
              const width = selectedPlacedSprite.width;
              const height = selectedPlacedSprite.height;

              removeSprite(x, y, width, height);
              delete placedSprites.current[id];
            }
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleMouseLeave = ({ target }) => {
    try {
      const x = parseInt(target.getAttribute("x"));
      const y = parseInt(target.getAttribute("y"));
      if (activeTool === "cursor") {
        if (selectedPlacedSprite.id.length || selectedSprite.id.length) {
          const width = selectedPlacedSprite.width || selectedSprite.width;
          const height = selectedPlacedSprite.height || selectedSprite.height;
          removeTileBackground(x, y, width, height);
          return;
        }
        target.style.background = "none";
      }
      if (activeTool === "bucket") {
        let top = 0;
        let right = 0;
        let bottom = 0;
        let left = 0;

        if (
          document.getElementById(`tile${x}-${y}`).getAttribute("placeable") ===
          "false"
        )
          return;

        // TOP
        for (let i = 0; i < y; i++) {
          const element = document.getElementById(`tile${x}-${y - i}`);
          if (
            element.getAttribute("placeable") === "false" ||
            element.getAttribute("y") === 0
          ) {
            break;
          }
          top = i;
        }

        // RIGHT
        for (let i = 0; i < columns; i++) {
          const element = document.getElementById(`tile${x + i}-${y}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          right = i + 1;
        }

        // BOTTOM
        for (let i = 0; i < rows; i++) {
          const element = document.getElementById(`tile${x}-${y + i}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          bottom = i + 1;
        }

        // LEFT
        for (let i = 0; i < x; i++) {
          const element = document.getElementById(`tile${x - i}-${y}`);
          if (element.getAttribute("placeable") === "false") {
            break;
          }
          left = i;
        }

        // Calculate correct tiles
        for (let i = 0; i < top + bottom; i++) {
          for (let n = 0; n < right + left; n++) {
            const element = document.getElementById(
              `tile${x - left + n}-${y - top + i}`
            );
            if (element.getAttribute("placeable") === "true") {
              element.style.background = "none";
            }
          }
        }
      }
      if (activeTool === "pencil") {
        let width, height;
        target.style.background = "none";

        if (selectedSprite.id.length) {
          width = selectedSprite.width;
          height = selectedSprite.height;
        }
        removeTileBackground(x, y, width, height);
      }
      if (activeTool === "eraser") {
        target.style.background = "none";
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const onWindowLoad = () => {
      let unplaceableTiles = document.querySelectorAll('[placeable="false"]');

      unplaceableTiles.forEach((tile) => (tile.style.outline = "none"));

      // Greenhouse
      let sprite = document
        .getElementById("Greenhouse")
        .firstChild.cloneNode(true);

      sprite.classList.remove("sprite-list-item");
      sprite.classList.add("placed-sprite");
      sprite.addEventListener("mouseenter", (e) =>
        handleMouseEnter(e, activeTool)
      );

      let x = 26;
      let y = 10;
      let width = parseInt(sprite.getAttribute("tile-width"));
      let height = parseInt(sprite.getAttribute("tile-height"));

      sprite.style.width = `${width}em`;
      sprite.style.bottom = `-${height - 1}em`;

      const greenhouseTile = document.getElementById(`tile${x}-${y}`);

      const spriteContainer1 = document.createElement("div");

      spriteContainer1.style.width = `${width}em`;
      spriteContainer1.style.height = `${height}em`;

      spriteContainer1.setAttribute("id", `Greenhouse-${x}-${y}`);
      spriteContainer1.setAttribute("x", x);
      spriteContainer1.setAttribute("y", y);

      spriteContainer1.classList.add("placed-sprite-container");

      placedSprites.current = {
        ...placedSprites.current,
        [spriteContainer1.id]: spriteContainer1,
      };

      greenhouseTile.appendChild(sprite);
      greenhouseTile.appendChild(spriteContainer1);
      changeTilePlacementToFalse(x, y, width, height);

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

      const spriteContainer2 = document.createElement("div");

      spriteContainer2.setAttribute("id", `Shipping_Box-${x}-${y}`);
      spriteContainer2.setAttribute("x", x);
      spriteContainer2.setAttribute("y", y);

      spriteContainer2.classList.add("placed-sprite-container");

      spriteContainer2.style.width = `${width}em`;
      spriteContainer2.style.height = `${height}em`;

      placedSprites.current = {
        ...placedSprites.current,
        [spriteContainer2.id]: spriteContainer2,
      };

      const shippingBoxTile = document.getElementById(`tile${x}-${y}`);
      shippingBoxTile.appendChild(sprite);
      shippingBoxTile.appendChild(spriteContainer2);
      changeTilePlacementToFalse(x, y, width, height);
    };
    if (
      document.getElementById(`Greenhouse-26-10`) &&
      document.getElementById(`Shipping_Box-71-14`)
    )
      return;
    onWindowLoad();
    return;
  }, []);

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
                onMouseDown={handleMouseUpDown}
                onMouseUp={handleMouseUpDown}
                onClick={handleMouseClick}
                onContextMenu={handleRightClick}
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
