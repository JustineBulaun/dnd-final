import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import OrderPage from "./pages/OrderPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import OrdersPage from "./pages/OrdersPage";

// eto po yung mga routing namen 4 routes po. sabihin mo yung apat
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order/:productId" element={<OrderPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
