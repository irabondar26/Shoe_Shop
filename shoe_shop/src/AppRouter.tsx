import { Route, Routes } from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import SneakersPage from "./Pages/SneakersPage";

function AppRoutes() {
  return (
    <Routes>
        <Route index element={<MainPage />} />
        <Route path="/sneakers" element={<SneakersPage/>}/>
    </Routes>
  );
}

export default AppRoutes;