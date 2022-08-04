import { useState } from "react";
import { upperCaseFirstLetter } from "../utils/utils";

import ReactTooltip from "react-tooltip";
import Sprites from "./sprites/Sprites";

import "./PlannerToolBar.css";

import spritesJson from "../utils/sprites/allSprites.json";

const PlannerToolBar = ({
  tileX,
  tileY,
  selectedSprite,
  setSelectedSprite,
  toolbarState,
  setToolbarState,
  buildingName,
  setBuildingName,
  setSelectedPlacedSprite,
}) => {
  const handleSelectedSprite = (e) => {
    const sprite = e.target;
    if (selectedSprite.id.length) {
      const activeSprite = document.querySelector(".toolbar-sprite.select");
      activeSprite.classList.remove("select");
      setSelectedSprite({
        ...selectedSprite,
        id: "",
        element: <></>,
        width: 0,
        height: 0,
      });
    }
    sprite.classList.remove("toolbar-sprite");
    sprite.classList.add("placed-sprite");

    setSelectedSprite({
      ...selectedSprite,
      id: sprite.parentElement.id,
      element: sprite.cloneNode(true),
      width: parseInt(sprite.getAttribute("tile-width")),
      height: parseInt(sprite.getAttribute("tile-height")),
    });

    setSelectedPlacedSprite({
      ...setSelectedPlacedSprite,
      element: <></>,
      id: "",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    sprite.classList.remove("placed-sprite");
    sprite.classList.add("toolbar-sprite");
    sprite.classList.add("select");
  };

  const handleToolbar = (name) => {
    if (selectedSprite.id.length) {
      const element = document.querySelector(".toolbar-sprite.select");
      element.classList.remove("select");
      setSelectedSprite({
        ...selectedSprite,
        id: "",
        element: <></>,
        width: 0,
        height: 0,
      });
      setSelectedPlacedSprite({
        ...setSelectedPlacedSprite,
        element: <></>,
        id: "",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
    }
    setToolbarState((oldName) => (oldName = name));
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="toolbar-navigation">
          {Object.keys(spritesJson[0]).map((category, index) => (
            <div
              key={index}
              onClick={() => handleToolbar(category)}
              className="toolbar-btn"
              id={category}
            >
              {upperCaseFirstLetter(category)}
            </div>
          ))}
        </div>
        <Sprites
          spriteList={spritesJson[0][toolbarState]}
          handleSelectedSprite={handleSelectedSprite}
          setBuildingName={setBuildingName}
          toolbarState={toolbarState}
        />
        <div className="extras">
          <strong className="tile-coords">
            <div>X: {tileX}</div>
            <div>Y: {tileY}</div>
          </strong>
          <div className="sprite-name">
            <strong>Name: {buildingName}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerToolBar;
