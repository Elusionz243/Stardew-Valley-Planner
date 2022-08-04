import { useEffect } from "react";

import gearIcon from "../../utils/svgs/gear.svg";
import checkBoxIcon from "../../utils/svgs/check-box.svg";
import checkedBoxIcon from "../../utils/svgs/checked-box.svg";

import "./Tools.css";

const Tools = ({
  tools,
  toolRefs,
  options,
  openOptions,
  setOpenOptions,
  optionRef,
  handleChecked,
  handleToolChange,
}) => {
  useEffect(() => {
    const toolCard = document.querySelector(".tools-card");
    toolCard.classList.add("active");
    return;
  }, []);

  return (
    <div className="tools-container">
      {Object.keys(tools).map((name, index) => (
        <div
          key={index}
          ref={(element) => {
            toolRefs.current = { ...toolRefs.current, [name]: element };
          }}
          id={index}
          name={name}
          className="tools-card"
          onClick={(e) => handleToolChange(e)}
          style={{ backgroundImage: `url(${tools[name]})` }}
        ></div>
      ))}
      <div
        id="Options"
        className="tools-card"
        onClick={() => setOpenOptions((prev) => !prev)}
        style={{ backgroundImage: `url(${gearIcon})` }}
      ></div>
      <div className="options-container" hidden={!openOptions}>
        <p className="option-header">Options</p>
        {Object.keys(options).map((option, index) => (
          <div
            key={index}
            ref={(element) => {
              optionRef.current = { ...optionRef.current, [option]: element };
            }}
            id={index}
            name={option}
            className="options"
            onClick={() => handleChecked(option)}
          >
            <div className="option">{option}</div>
            <div
              className="check-box"
              style={{
                backgroundImage: `url(${
                  !options[option] ? checkBoxIcon : checkedBoxIcon
                })`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
