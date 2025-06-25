import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "react-cookies";
import {
  ProtectedRoute,
  SharedLayout,
  TabsLessons,
  SharedLessons,
} from "./components";
import { COOKIE_NAME } from "./constants";

import { OrderDone, NotFound, ShoppingList, MakeOrder } from "./pages";

 
const App = () => {
   const [user, setUser] = useState("");

  useEffect(() => {
    const setUserDataHandle = async () => {
 
    };
    setUserDataHandle();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="order_done" element={<OrderDone />} />
          <Route path="make_order" element={<MakeOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
