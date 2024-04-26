import React, {useState, useEffect, Fragment} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import clientAxios from '../../config/axios'
import FormSearchProduct from './FormSearchProduct'
import FormAmountProduct from './FormAmountProduct'

function NewOrder () {

    const { id : customerId } =  useParams()
    const navigate = useNavigate();

    // State
    const [customer, setCustomer] = useState({})
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        // get the customer
        const queryAPI = async() => {
            // get the actual customer
            const result = await clientAxios.get(`/customers/${customerId}`)

            setCustomer(result.data)
        }

        queryAPI()

        updateTotal()

    }, [products])

    const searchProduct = async e => {
        e.preventDefault()

        // get the products based in the state search
        const resultSearch = await clientAxios.post(`/products/search/${search}`)

        if(resultSearch.data[0]) {

            // It is supposedly the most accurate result.
            let productResult = resultSearch.data[0]

            productResult.product = resultSearch.data[0]._id
            productResult.amount = 0

            // add into the products state
            setProducts([...products, productResult])
            

        } else {
            // there are not any result
            Swal.fire({
                icon: 'error',
                title: 'No results',
                text: 'There are not any results',
                timer: 4000
            })
        }
    }
    
    // save the data to search into the state
    const readSearchData = e => {
        setSearch( e.target.value )
    }

    // update amount of products per orden
    const subtractProducts = index => {
        // copy the original array
        const allProducts = [...products]

        if(allProducts[index].amount === 0) {
            return
        }

        allProducts[index].amount -= 1;

        setProducts(allProducts)
    }

    const addProducts = index => {

        // copy the original array
        const allProducts = [...products]

        allProducts[index].amount += 1;

        setProducts(allProducts)
    }

    // update the total to pay
    const updateTotal = () => {
        if(products.length === 0) {
            return setTotal(0)
        }

        let newTotal = 0

        // go over all the products, their amount and prices
        products.map(product => newTotal += product.amount * product.price)

        // save the total
        setTotal(newTotal)
    }

    // delete a product of the state
    const deleteProductOrder = id => {

        // if(product._id !== id ) return product
        const allProducts = products.filter( product => product._id !== id )

        setProducts(allProducts)
    } 

    const makeOrder = async e => {
        e.preventDefault()

        const order = {
            customer: customerId,
            order: products,
            total
        }

        const res = await clientAxios.post(`/orders/new/${customerId}`, order)

        if(res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully added',
                text: res.data.message,
                timer: 5000
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'There was an error',
                text: 'Try again please',
                timer: 5000
            })
        }

        // redirect
        navigate('/products')
    }

    return(
        <Fragment>

            <div className="ficha-cliente">
                <h3>Customer's Data</h3>
                
                <p>Name: {customer.name} {customer.secondName}</p>
                <p>Cellphone: {customer.cellphone}</p>
            </div>

            <FormSearchProduct 
                handleOnSubmit= {searchProduct}
                handleOnChange= {readSearchData}
            />

            <ul className="resumen">
                {products.map((product, index) => (
                    <FormAmountProduct 
                        key={product.product}
                        product={product}
                        index={index}

                        subtractProducts= {subtractProducts}
                        addProducts= {addProducts}
                        deleteProductOrder= {deleteProductOrder}
                    />
                ))}
            </ul>

            <p className='total'>Total: <span>$ {total}</span></p>

            { (total > 0) ? (

                <form onSubmit={makeOrder}>
                    <input type='submit' className='btn btn-azul btn-block' value='Create order' />
                </form>

            ): null } 
        </Fragment>
    )
}

export default NewOrder