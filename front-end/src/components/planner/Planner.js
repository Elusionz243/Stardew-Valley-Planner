import { useEffect, useRef, useState } from "react";

import PlannerToolBar from "./toolbar/PlannerToolBar";
import PreviewSelected from "./selected/PreviewSelected";
import Tiles from "./tiles/Tiles";
import Tools from "./toolbar/tools/Tools";

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

  const [tools, setTools] = useState([
    {
      name: "cursor",
      element: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.25em"
          height="1.25em"
          fill="aqua"
          className="bi bi-cursor-fill tool"
          viewBox="0 0 16 16"
          stroke="black"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
      ),
    },
  ]);

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
          <div
            className="selected-sprite-container"
            style={{
              width: `${selectedSprite.width}em`,
              height: `${selectedSprite.height}em`,
            }}
          >
            <PreviewSelected selectedSprite={selectedSprite} />
          </div>
          <div className="tools-main-container">
            <Tools tools={tools} setTools={setTools} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
