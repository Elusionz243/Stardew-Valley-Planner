import { useState } from "react";

import ReactTooltip from "react-tooltip";
import Sprites from "./sprites/Sprites";

import "./PlannerToolBar.css";

import spritesJson from "../utils/sprites/allSprites.json";

const PlannerToolBar = ({
  tileX,
  tileY,
  selectedSprite,
  setSelectedSprite,
  moving,
  setMoving,
  toolbarState,
  setToolbarState,
  buildingName,
  setBuildingName,
}) => {
  const handleSelectedSprite = (e) => {
    e.target.classList.remove("toolbar-sprite");
    e.target.classList.add("placed-sprite");
    setSelectedSprite({
      ...selectedSprite,
      id: e.target.parentElement.id,
      element: e.target.cloneNode(true),
      width: parseInt(e.target.getAttribute("tile-width")),
      height: parseInt(e.target.getAttribute("tile-height")),
    });
    e.target.classList.remove("placed-sprite");
    e.target.classList.add("toolbar-sprite");
    setMoving(!moving);
  };

  const handleToolbar = (e) => {
    setToolbarState(`${e.target.id}`);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="toolbar-navigation">
          {Object.keys(spritesJson[0]).map((category, index) => (
            <div
              key={index}
              onClick={handleToolbar}
              className="toolbar-btn"
              id={category}
            >
              {category}
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
