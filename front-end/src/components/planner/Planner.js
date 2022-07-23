import { useEffect, useRef, useState } from "react";

import PlannerToolBar from "./toolbar/PlannerToolBar";
import Tiles from "./tiles/Tiles";

import StandardFarm from "./utils/standard_farm_stardew.png";

import "./Planner.css";

const Planner = () => {
  const plannerRef = useRef();

  const [tileX, setTileX] = useState(0);
  const [tileY, setTileY] = useState(0);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [moving, setMoving] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState({
    id: "",
    element: <></>,
    width: 0,
    height: 0,
  });

  const [buildingName, setBuildingName] = useState("");
  const [toolbarState, setToolbarState] = useState("buildings");

  const handleMouseMove = (e) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleClick = (e) => {
    e.clientX += mouseX;
    e.clientY += mouseY;
  };

  return (
    <div className="planner-main-container">
      <div
        className="planner-container"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <PlannerToolBar
          tileX={tileX}
          tileY={tileY}
          selectedSprite={selectedSprite}
          setSelectedSprite={setSelectedSprite}
          moving={moving}
          setMoving={setMoving}
          toolbarState={toolbarState}
          setToolbarState={setToolbarState}
          buildingName={buildingName}
          setBuildingName={setBuildingName}
        />
        <div className="planner" ref={plannerRef}>
          <div className="tiles">
            <Tiles
              columns={80}
              rows={65}
              setTileX={setTileX}
              setTileY={setTileY}
              selectedSprite={selectedSprite}
              moving={moving}
              setMoving={setMoving}
            />
          </div>
          <img
            src={StandardFarm}
            alt="Stardew Valley Standard Farm Layout"
            className="farm-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Planner;
