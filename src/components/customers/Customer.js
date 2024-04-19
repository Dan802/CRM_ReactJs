import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

// we recieve and destructuring the props
function Customer({customer}) {

    // destructuring values
    const {_id, name, secondName, email, company, cellphone} = customer

    const onClickDeleteCustomer = idCustomer => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete customer!"
          }).then((result) => {
            if (result.isConfirmed) {

                clientAxios.delete(`/customers/${idCustomer}`)
                    .then(res => {
                        console.log(res)

                        Swal.fire({
                            title: "Deleted!",
                            text: res.data.message,
                            icon: "success"
                          });
                    })


            }
          });
    }

    return(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{name} {secondName}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Phone: {cellphone}</p>
            </div>
            <div className="acciones">
                <Link to={`/customers/edit/${_id}`}  className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar"
                    onClick={() => onClickDeleteCustomer(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Customer;