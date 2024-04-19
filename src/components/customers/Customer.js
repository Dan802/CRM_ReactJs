import React from 'react'
import { Link } from 'react-router-dom';

// we recieve and destructuring the props
function Customer({customer}) {

    // destructuring values
    const {_id, name, secondName, email, company, cellphone} = customer

    return(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{name} {secondName}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Phone: {cellphone}</p>
            </div>
            <div className="acciones">
                <Link to={`customers/edit/${_id}`}  className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Customer;