import { Route, Routes } from "react-router-dom";
import { Main, } from "../pages/index";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
