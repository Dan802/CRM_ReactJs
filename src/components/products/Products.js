import React, {useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../../config/axios';
import Product from './Product';
import Spinner from '../layout/Spinner';

const Products = () => { 

    // products = state
    // setProducts = function to save the state
    // useState([]): products state starts empty
    const [products, setProducts] = useState([]);

    // It is executed once when the component finishes loading
    useEffect( () => {

        // Query to API
        const queryAPI = async () => {
            const queryProducts = await clientAxios.get('/products')

            setProducts(queryProducts.data)
        }

        queryAPI()

        // todo When products state change (edit, delete...) runs again queryAPI()
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