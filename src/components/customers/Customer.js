import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

// we recieve and destructuring the props
function Customer({customer}) {

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

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
          }).then(async (result) => {
            if (result.isConfirmed) {

                await clientAxios.delete(`/customers/${idCustomer}`, {
                    headers: {
                        Authorization : `Bearer ${auth.token}`
                    }
                })
                    .then(res => {
                        console.log(res)

                        Swal.fire({
                            title: "Deleted!",
                            text: res.data.message,
                            icon: "success"
                          });
                    })

                //Reload page
                // ToDo: Should be with useEffect
                window.location.reload();
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
                    Edit Customer
                </Link>

                <Link to={`/orders/new/${_id}`}  className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    New Order
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar"
                    onClick={() => onClickDeleteCustomer(_id)}>
                    <i className="fas fa-times"></i>
                    Delete Customer
                </button>
            </div>
        </li>
    )
}

export default Customer;