import React, {useContext} from 'react'
import Swal from 'sweetalert2'
import clientAxios from '../../config/axios'

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

export default function DetailsOrder({order}) {

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    const {_id, customer, order : miniOrder, total} = order

    const onClickDeleteOrder = idOrder => {
        console.log(idOrder)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete order!"
          }).then(async (result) => {
            if (result.isConfirmed) {

                await clientAxios.delete(`/orders/${idOrder}`, {
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
                    .catch((err)=>{
                        Swal.fire({
                            title: "Error",
                            text: err,
                            icon: "error"
                          });
                    });

                //Reload page
                // Todo: Should be with useEffect
                window.location.reload();
            }
          });
    }

    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {_id}</p>
                <p className="nombre">Customer: {customer?.name || 'Undefined'} {customer?.secondName}</p>

                <div className="articulos-pedido">
                    <p className="productos">Order's Items: </p>
                    <ul>
                        {console.log(miniOrder)}
                        {miniOrder.map(item => (
                            <li key={_id + item.product?._id}>
                                <p>Name: {item.product?.name || 'Undefined'}</p>
                                <p>Price: {(item.product) ? '$' + item.product?.price : '-'}</p>
                                <p>Amount: {(item.product) ? item.amount : '-'}</p>
                            </li>
                        ))}
                        
                    </ul>
                </div>
                <p className="total">Total: {total}</p>
            </div>
            <div className="acciones">
                <a href={`orders/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Order
                    {/* TODO Modulo para editar ordenes */}
                </a>

                <button type="button" className="btn btn-rojo btn-eliminar"
                        onClick={() => onClickDeleteOrder(order._id)}>
                    <i className="fas fa-times"></i>
                    Delete Order
                </button>
            </div>
        </li>
    )
}