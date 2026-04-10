import { Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import ProductPage from './Pages/ProductPage';

function ProductPageWrapper() {
  const { audience, category } = useParams<{ audience: string; category: string }>();

  const mappedCategory = category === "slipOns" ? "slipOn" : category;

  return <ProductPage audience={audience || "men"} category={mappedCategory || "allshoes"} />;
}


export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/:audience/:category" element={<ProductPageWrapper />} />
    </Routes>
  );
}



