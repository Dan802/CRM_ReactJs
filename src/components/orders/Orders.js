import React, {useEffect, useState, useContext, Fragment} from 'react'
import {  useNavigate } from 'react-router-dom'
import clientAxios from '../../config/axios'
import DetailsOrder from './DetailsOrder'
import Swal from 'sweetalert2'

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

const Orders = () => { 
    
    const navigate = useNavigate();

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    const [orders, setOrders] = useState([])

    useEffect(() => {

        // if the auth state === false 
        if(!auth.auth || localStorage.getItem('token') !== auth.token) {
            // Redirect
            navigate('/login')
            return
        }

        const queryAPI = async() => {
            try {
                // The connection can fail
                const result = await clientAxios.get('/orders', {
                    headers: {
                        Authorization : `Bearer ${auth.token}`
                    }
                })
            
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

    if(orders.length > 0) {
        return(
            <Fragment>
                <h2>Orders</h2>
    
                <ul className="listado-pedidos">
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
    else { 
        return(
            <Fragment>
                <h2>Orders</h2>
    
                <p>There are not orders avaible</p>
    
            </Fragment>
        )
    }
}

export default Orders