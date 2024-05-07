import React, {useEffect, useState, useContext, Fragment} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clientAxios from '../../config/axios';
import Product from './Product';
import Spinner from '../layout/Spinner';

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

const Products = () => { 

    const navigate = useNavigate();

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    // products = state
    // setProducts = function to save the state
    // useState([]): products state starts empty
    const [products, setProducts] = useState([]);

    // It is executed once when the component finishes loading
    useEffect( () => {

        // if the auth state === false 
        if(!auth.auth || localStorage.getItem('token') !== auth.token) {
            // Redirect
            navigate('/login')
            return
        }

        if(auth.token !== '') {
            // Query to API
            const queryAPI = async () => {
                try {
                    const queryProducts = await clientAxios.get('/products', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    })
    
                    setProducts(queryProducts.data)
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

        // ToDo When products state change (edit, delete...) runs again queryAPI()
    }, [ /* products */ ])

    // Spinner (Loading content animation)
    if(products.length === 0) {
        return(
            <Fragment>

                <h2>Products</h2>

                <Link to={"/products/new"} className="btn btn-verde nvo-cliente"> 
                    <i className="fas fa-plus-circle"></i>
                    New Product
                </Link>

                <Spinner />  
            </Fragment>
        ) 
    }

    // There are not products yet
    if(products.message){
        return(
            <Fragment>

                <h2>Products</h2>

                <Link to={"/products/new"} className="btn btn-verde nvo-cliente"> 
                    <i className="fas fa-plus-circle"></i>
                    New Product
                </Link>

                <p>{products.message}</p>

            </Fragment>
        ) 
    } 

    return(
        <Fragment>
            <h2>Products</h2>

            <Link to={"/products/new"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                New Product
            </Link>

            <ul className="listado-productos">
                {products.map(product => (
                    
                    <Product 
                        // these parameters are called props 
                        // (similar to variables passed between controller and a view)
                        key = {product._id}
                        product = {product}
                    />
                ))}
            </ul>

        </Fragment>
    )
}

export default Products