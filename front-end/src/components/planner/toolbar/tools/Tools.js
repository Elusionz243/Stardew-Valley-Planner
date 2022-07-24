import { useEffect } from "react";

import "./Tools.css";

const Tools = ({ tools, setTools }) => {
  // useEffect(() => {
  //   // const abortController = new AbortController();
  //   const loadTools = async () => {

  //   };

  //   loadTools();
  //   return;
  // }, []);
  return <div className="tools-container">{tools[0].element}</div>;
};

export default Tools;
