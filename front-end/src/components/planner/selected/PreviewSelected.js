import { useEffect } from "react";

const PreviewSelected = ({ selectedSprite }) => {
  const { id, element, width, height } = selectedSprite;
  useEffect(() => {
    if (id.length) {
      const preview = document.querySelector(".sprite-preview");
      element.style.width = `${width > 4 ? width / 2 : width}em`;
      const sprite = element.cloneNode(true);
      let oldSprite;
      if (preview.hasChildNodes()) {
        preview.firstChild.replaceWith(sprite);
      } else {
        preview.appendChild(sprite);
      }
      oldSprite = sprite.cloneNode(true);
    }
    return;
  }, [element]);
  return (
    <div className="preview">
      <div className="sprite-preview"></div>
    </div>
  );
};

export default PreviewSelected;
