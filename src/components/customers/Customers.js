/* eslint-disable no-unused-vars */
import React, {useEffect, useState, Fragment} from 'react'
import clientAxios from '../../config/axios'
import { Link } from 'react-router-dom'
import Customer from './Customer'
import Spinner from '../layout/Spinner';

// This way is call React Hooks 
const Customers = () => { 

    // Work with the state
    // customers = state
    // setCustomers = function to save the state
    const [customers, setCustomers] = useState([])


    // use effect is similar to componentdidmount and willmount
    // it runs automatically when the user open the route file 
    // useEffect always should call a function/method apart 
    useEffect(() => {

        
        // We call the API (Query to API)
        const queryAPI = async () => {
            const customersQuery = await clientAxios.get('/customers')
            
            // add the result to the state
            setCustomers(customersQuery.data)
        }
        
        queryAPI()
        
        // todo When customers state change (edit, delete...) runs again queryAPI()
    }, [/* customers */])
    

    // Spinner (Loading content animation)
    if(!customers.length){
        return( 
            <Fragment>
                <h2>Customers</h2>

                <Link to={"/customers/new"} className="btn btn-verde nvo-cliente"> 
                    <i className="fas fa-plus-circle"></i> New Customer
                </Link>

                <Spinner />

            </Fragment>
        )
    }

    return(
        <Fragment>
            <h2>Customers</h2>

            <Link to={"/customers/new"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i> New Customer
            </Link>

            <ul className="listado-clientes">
                {customers.map(customer => (
                    <Customer 
                        // these parameters are called props 
                        // (similar to variables passed between controller and a view)

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