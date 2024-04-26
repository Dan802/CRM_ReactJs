import React from 'react'
import Swal from 'sweetalert2'
import clientAxios from '../../config/axios'

export default function DetailsOrder({order}) {

    const {customer, total} = order

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

                await clientAxios.delete(`/orders/${idOrder}`)
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
                <p className="id">ID: {order._id}</p>
                <p className="nombre">Customer: {customer.name} {customer.secondName}</p>

                <div className="articulos-pedido">
                    <p className="productos">Order's Items: </p>
                    <ul>
                        {order.order.map(item => (
                            <li key={order._id + item.product._id}>
                                <p>{item.product.name}</p>
                                <p>Price: ${item.product.price}</p>
                                <p>Amount: {item.amount}</p>
                            </li>
                        ))}
                        
                    </ul>
                </div>
                <p className="total">Total: ${total}</p>
            </div>
            <div className="acciones">
                <a href="edit" className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Order
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