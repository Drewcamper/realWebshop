import "./App.css";
import Home from "./components/Home";
import LoadingSquares from "./components/products/loadingSquares/LoadingSquares";
import Cart from "./components/header/Cart";
import Payment from "./components/payment/Payment";
import Completion from "./components/payment/Completion";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WebshopProvider } from "./context/context";

function App() {
  return (
    <WebshopProvider>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loadingAnimation" element={<LoadingSquares />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </BrowserRouter>
      </main>
    </WebshopProvider>
  );
}

export default App;
