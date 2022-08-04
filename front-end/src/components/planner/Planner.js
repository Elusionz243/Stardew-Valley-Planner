import { useRef, useState } from "react";

import PlannerToolBar from "./toolbar/PlannerToolBar";
import PreviewSelected from "./selected/PreviewSelected";
import Tiles from "./tiles/Tiles";
import Tools from "./toolbar/tools/Tools";

import StandardFarm from "./utils/standard_farm_stardew.png";

import cursorImg from "./utils/svgs/cursor-fill.svg";
import bucketImg from "./utils/svgs/paint-bucket.svg";
import pencilImg from "./utils/svgs/pencil-fill.svg";
import eraserImg from "./utils/svgs/eraser-fill.svg";

import "./Planner.css";

const Planner = () => {
  const plannerRef = useRef(<></>);
  const optionRef = useRef({});
  const toolRefs = useRef({});
  const placedSprites = useRef({});

  const [tileX, setTileX] = useState(0);
  const [tileY, setTileY] = useState(0);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [selectedSprite, setSelectedSprite] = useState({
    id: "",
    element: <></>,
    width: 0,
    height: 0,
  });

  const [buildingName, setBuildingName] = useState("");
  const [toolbarState, setToolbarState] = useState("buildings");

  const [activeTool, setActiveTool] = useState("cursor");

  const [options, setOptions] = useState({
    Greenhouse: false,
    Sprinklers: false,
    Scarecrows: false,
    BeeHive: false,
    JunimoHut: false,
  });
  const [openOptions, setOpenOptions] = useState(false);

  const [selectedPlacedSprite, setSelectedPlacedSprite] = useState({
    element: <></>,
    id: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const tools = {
    cursor: cursorImg,
    bucket: bucketImg,
    pencil: pencilImg,
    eraser: eraserImg,
  };

  const handleMouseMove = (e) => {
    setMouseX((oldX) => (oldX += e.clientX));
    setMouseY((oldY) => (oldY += e.clientY));
  };

  const handleClick = (e) => {
    e.clientX += mouseX;
    e.clientY += mouseY;
  };

  const handleToolChange = (e) => {
    let toolName = e.target.getAttribute("name");
    setActiveTool((prev) => (prev = toolName));
    const element = document.querySelector(".tools-card.active");
    toolRefs.current[toolName].classList.add("active");
    element.classList.remove("active");
    plannerRef.current.style.cursor = `url(${tools[toolName]}), auto`;
  };

  const handleChecked = (name) => {
    setOptions({ ...options, [name]: !options[name] });
  };

  return (
    <div className="planner-main-container">
      <div
        className="planner-container"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{ cursor: "none" }}
      >
        <PlannerToolBar
          tileX={tileX}
          tileY={tileY}
          selectedSprite={selectedSprite}
          setSelectedSprite={setSelectedSprite}
          toolbarState={toolbarState}
          setToolbarState={setToolbarState}
          buildingName={buildingName}
          setBuildingName={setBuildingName}
          setSelectedPlacedSprite={setSelectedPlacedSprite}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
        <div
          className="planner"
          ref={plannerRef}
          style={{ cursor: `url(${cursorImg}), auto` }}
        >
          <div className="tiles">
            <Tiles
              columns={80}
              rows={65}
              setTileX={setTileX}
              setTileY={setTileY}
              selectedSprite={selectedSprite}
              setSelectedSprite={setSelectedSprite}
              placedSprites={placedSprites}
              selectedPlacedSprite={selectedPlacedSprite}
              setSelectedPlacedSprite={setSelectedPlacedSprite}
              activeTool={activeTool}
              toolbarState={toolbarState}
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
            <Tools
              tools={tools}
              toolRefs={toolRefs}
              options={options}
              openOptions={openOptions}
              setOpenOptions={setOpenOptions}
              optionRef={optionRef}
              handleChecked={handleChecked}
              handleToolChange={handleToolChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
