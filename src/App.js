import React, {Fragment} from "react";

// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav"

// Components
import Customers from "./components/customers/Customers";
import NewCustomer from "./components/customers/NewCustomer"
import EditCustomer from "./components/customers/EditCustomer";

import Products from "./components/products/Products";
import EditProduct from "./components/products/EditProduct";
import NewProduct from "./components/products/NewProduct";

import Orders from "./components/orders/Orders";
import NewOrder from "./components/orders/NewOrder";

function App() {
  return(
    <BrowserRouter>

      {/* Fragment: To include different elements */}
      {/* (resolve the error JSX expressions must have one parent element) */}
      <Fragment>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Nav />

          <main className="caja-contenido col-9">

            <Routes>
              <Route exact path="/" element={< Customers />} />

              <Route exact path="/customers/new" element={< NewCustomer />} />
              <Route exact path="/customers/edit/:id" element={< EditCustomer />} />

              <Route exact path="/products" element={< Products />} />
              <Route exact path="/products/new" element={< NewProduct />} />
              <Route exact path="/products/edit/:id" element={< EditProduct />} />

              <Route exact path="/orders" element={< Orders />} />
              <Route exact path="/orders/new/:id" element={< NewOrder />} />

            </Routes>

          </main>

        </div>

      </Fragment>

    </BrowserRouter>
  )
}

export default App

