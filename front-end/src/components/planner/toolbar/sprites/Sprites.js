import {
  removeHyphonAndUnderscore,
  upperCaseFirstLetter,
} from "../../utils/utils";

const Sprites = ({
  spriteList,
  handleSelectedSprite,
  setBuildingName,
  toolbarState,
}) => {
  return (
    <div className="sprites-container">
      {Object.keys(spriteList).map((category, catIndex) => (
        <ul className="sprite-list" key={catIndex}>
          <h5 className="sprite-category text-decoration-underline">
            {upperCaseFirstLetter(category)}
          </h5>
          {spriteList[category].map((sprite, index) => {
            const { name, width, height, imageSource } = sprite;
            return (
              <li
                onClick={handleSelectedSprite}
                onMouseEnter={() =>
                  setBuildingName(removeHyphonAndUnderscore(name))
                }
                className="list-item"
                key={index}
              >
                <div
                  className="sprite-list-item"
                  id={name}
                  style={{
                    width: `${
                      toolbarState === "buildings" && name === "Shipping-Box"
                        ? width * 1.5
                        : toolbarState === "buildings"
                        ? width
                        : width * 2
                    }em`,
                  }}
                >
                  <img
                    src={imageSource}
                    tile-width={width}
                    tile-height={height}
                    className="toolbar-sprite"
                    alt={`stardew valley ${name} sprite`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default Sprites;
