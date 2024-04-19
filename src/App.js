import React, {Fragment} from "react";

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// layout
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav"

// Components
import Customers from "./components/customers/Customers";
import NewCustomer from "./components/customers/NewCustomer"
import EditCustomer from "./components/customers/EditCustomer";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";

function App() {
  return(
    <Router>

      {/* Fragment: To include different elements */}
      {/* (resolve the error JSX expressions must have one parent element) */}
      <Fragment>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Nav />

          <main className="caja-contenido col-9">

            <Switch>
              <Route exact path="/" component={Customers} />

              <Route exact path="/customers/new" component={NewCustomer} />
              <Route exact path="/customers/edit/:id" component={EditCustomer} />

              <Route exact path="/products" component={Products} />

              <Route exact path="/orders" component={Orders} />
            </Switch>

          </main>

        </div>

      </Fragment>

    </Router>
  )
}

export default App

