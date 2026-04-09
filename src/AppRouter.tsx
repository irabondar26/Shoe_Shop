import { Route, Routes } from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import MenPage from "./Pages/MenPage";
import KidsPage from "./Pages/KidsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/men/*">
        <Route path="allshoes" element={<MenPage category="allshoes"/>}/>
        <Route path="lifestile" element={<MenPage category="lifestile"/>}/>
        <Route path="running" element={<MenPage category="running"/>}/>
        <Route path="sandals" element={<MenPage category="sandals"/>}/>
        <Route path="slipOns" element={<MenPage category="slipOn"/>}/>
      </Route>
      <Route path="/kids" element={<KidsPage />} />
    </Routes>
  );
}

export default AppRoutes;