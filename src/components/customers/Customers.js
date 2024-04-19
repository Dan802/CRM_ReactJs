/* eslint-disable no-unused-vars */
import React, {useEffect, useState, Fragment} from 'react'
import clientAxios from '../../config/axios'
import { Link } from 'react-router-dom'

import Customer from './Customer'

// This way is call React Hooks 

const Customers = () => { 

    // Work with the state
    // customers = state
    // saveCustomers = function to save the state
    const [customers, saveCustomers] = useState([])

    // We call the API (Query to API)
    const queryAPI = async () => {
        const customersQuery = await clientAxios.get('/customers')

        // add the result to the state
        saveCustomers(customersQuery.data)
    }

    // use effect is similar to componentdidmount and willmount
    // it runs automatically when the user open the route file 
    // useEffect always should call a function/method apart 
    useEffect(() => {
        queryAPI()
    }, [])

    return(
        <Fragment>
            <h2>Customers</h2>

            <Link to={"/customers/new"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i> New Customer
            </Link>

            <ul className="listado-clientes">
                {customers.map(customer => (
                    <Customer 
                        // props (similar to variables passed between controller an a view)

                        // Each child in a list should have a unique "key" prop.
                        key = {customer._id} 
                        customer = {customer}
                    />
                ))}
            </ul>

        </Fragment>
    )
}

 export default Customers