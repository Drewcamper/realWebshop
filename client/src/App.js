import "./App.css";
import Payment from "./components/payment/Payment";
import Completion from "./components/payment/Completion";
import Home from "./components/Home";
import Cart from "./components/header/Cart";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WebshopProvider } from "./context/context";

function App() {
  return (
    <WebshopProvider>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
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
