import React, {useEffect, useState, useContext, Fragment} from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../../config/axios'
import { Link } from 'react-router-dom'
import Customer from './Customer'
import Spinner from '../layout/Spinner';

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

// This way is call React Hooks 
const Customers = () => { 

    // Work with the state
    // customers = state
    // setCustomers = function to save the state
    const [customers, setCustomers] = useState([])

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    const navigate = useNavigate();

    // use effect is similar to componentdidmount and willmount
    // it runs automatically when the user open the route file 
    // useEffect always should call a function/method apart 
    useEffect(() => {

        // if the auth state === false 
        if(auth.auth === false) {
            // Redirect
            navigate('/login')
            return 
        }

        // if there is no web json token the user haven't logged in yet
        if(auth.token !== '') {

            const queryAPI = async () => {
                try {

                    // We call the API (Query to API)
                    const customersQuery = await clientAxios.get('/customers', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    })
                    
                    // add the result to the state
                    setCustomers(customersQuery.data)
                    
                } catch (error) {
                    // Error with authorization
                    if(error.response.status === 500){
                        // Redirect
                        navigate('/login')
                    }
                }
            }

            queryAPI()
        } else {
            // Redirect
            navigate('/login')
        }
        
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