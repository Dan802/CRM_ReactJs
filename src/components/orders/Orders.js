import React, {useEffect, useState, Fragment} from 'react'
import clientAxios from '../../config/axios'
import DetailsOrder from './DetailsOrder'
import Swal from 'sweetalert2'

const Orders = () => { 
    const [orders, setOrders] = useState([])

    useEffect(() => {

        const queryAPI = async() => {
            try {
                // The connection can fail
                const result = await clientAxios.get('/orders')
            
                // save into the orders state
                setOrders(result.data)
            } catch (error) {
                if(error.code === "ERR_NETWORK") {
                    return Swal.fire({
                        title: "Error",
                        text: "Network Error",
                        icon: "error"
                    });
                } else {
                    return Swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error"
                    });
                }
            }
        }
        queryAPI()
    }, [])

    return(
        <Fragment>
            <h2>Orders</h2>

            <ul class="listado-pedidos">
                {orders.map( order => (
                    <DetailsOrder 
                        key={order._id}
                        order={order}
                    />
                ))}
            </ul>

        </Fragment>
    )
}

export default Orders