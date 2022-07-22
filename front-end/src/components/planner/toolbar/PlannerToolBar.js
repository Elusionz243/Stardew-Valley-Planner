import { useState } from "react";

import ReactTooltip from "react-tooltip";
import Sprites from "./sprites/Sprites";

import "./PlannerToolBar.css";

import buildings from "../utils/sprites/Buildings.json";
import machines from "../utils/sprites/Machines.json";
import furniture from "../utils/sprites/Furniture.json";
import flooring from "../utils/sprites/Flooring.json";

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
  const fKeys = Object.keys(furniture[0]);

  const handleSelectedSprite = (e) => {
    e.target.classList.add("placed-sprite");
    e.target.classList.remove("toolbar-sprite");
    setSelectedSprite({
      ...selectedSprite,
      id: e.target.parentElement.id,
      element: e.target.cloneNode(true),
      width: parseInt(e.target.getAttribute("tileWidth")),
      height: parseInt(e.target.getAttribute("tileHeight")),
    });
    e.target.classList.remove("placed-sprite");
    e.target.classList.add("toolbar-sprite");
    setMoving(!moving);
  };

  const handleToolbar = (e) => {
    setToolbarState(`${e.target.id}`);
  };
  const removeHyphon = (str) => str.replaceAll(/[_-]/g, " ");

  return (
    <div className="toolbar-container border">
      <div className="toolbar">
        <div className="toolbar-navigation">
          <div onClick={handleToolbar} className="toolbar-btn" id="Buildings">
            Buildings
          </div>
          <div onClick={handleToolbar} className="toolbar-btn" id="Machines">
            Machines
          </div>
          <div onClick={handleToolbar} className="toolbar-btn" id="Equipment">
            Equipment
          </div>
          <div onClick={handleToolbar} className="toolbar-btn" id="Special">
            Special Buildings
          </div>
          <div onClick={handleToolbar} className="toolbar-btn" id="Options">
            Options
          </div>
        </div>
        <div className="sprites-container">
          <ul className="sprite-list active">
            {(toolbarState === "Buildings"
              ? buildings
              : toolbarState === "Machines"
              ? machines
              : toolbarState === "Decorations"
              ? fKeys.map((key, index) => furniture[0][key])
              : []
            ).map((building, index) => (
              <li
                onClick={handleSelectedSprite}
                onMouseEnter={() =>
                  setBuildingName(removeHyphon(building.name))
                }
                className="list-item"
                key={index}
              >
                <div
                  className="sprite-list-item"
                  id={building.name}
                  style={{
                    width: `${
                      toolbarState === "Buildings"
                        ? building.width
                        : building.width * 2
                    }em`,
                  }}
                >
                  <img
                    src={building.imageSource}
                    tileWidth={building.width}
                    tileHeight={building.height}
                    className="toolbar-sprite"
                    alt={`stardew valley ${building.name} sprite`}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Sprites spriteList={buildings} />
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
    </div>
  );
};

export default PlannerToolBar;
