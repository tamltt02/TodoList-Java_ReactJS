import { Routes, Route, BrowserRouter } from "react-router-dom";
import * as pages from "./pages/index";
import Layout from "./layout/index";
const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/job" element={<pages.JobPage />} />
          <Route path="/status" element={<pages.StatusPages />} />
          {/* <Route path="*" element={<NoMatch />}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
