import { Routes, Route } from "react-router-dom";

import HomePage from "./home/HomePage";
import Planner from "./planner/Planner";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Stardew_Valley_Farm_Planner" element={<Planner />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
