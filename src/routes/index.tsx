import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Main = lazy(() => import("./../layout"));
const Home = lazy(() => import("./../pages/Home"))

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AllRoutes;
