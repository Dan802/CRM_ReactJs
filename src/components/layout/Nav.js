import React from 'react';
import { Link } from "react-router-dom";


const nav = () => { 
    return(
        <aside className="sidebar col-3">
            <h2>Manage</h2>

            <nav className="navegacion">
                <Link to={"/"} className="clientes">Customers</Link>
                <Link to={"/products"} className="productos">Products</Link>
                <Link to={"/orders"} className="pedidos">Orders</Link>
            </nav>
        </aside>
    )
}

export default nav