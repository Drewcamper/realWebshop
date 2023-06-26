import "./App.css";
import Home from "./components/Home";
import LoadingSquares from "./components/products/loadingSquares/LoadingSquares";
import Forms from "./components/products/formsAnimation/Forms";
import LoadingSphere from "./components/products/loadingSphere/LoadingSphere";
import ConnectionAnimation from "./components/products/connectionAnimation/ConnectionAnimation";
import Cart from "./components/header/Cart";
import Payment from "./components/payment/Payment";
import Completion from "./components/payment/Completion";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WebshopProvider } from "./context/context";

function App() {
  return (
    <WebshopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loadingSquare" element={<LoadingSquares />} />
          <Route path="/formsAnimation" element={<Forms />} />
          <Route path="/loadingsphere" element={<LoadingSphere />} />
          <Route path="/connectionAnimation" element={<ConnectionAnimation />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </WebshopProvider>
  );
}

export default App;
