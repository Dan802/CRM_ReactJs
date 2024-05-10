import React, {useState, useEffect, Fragment, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clientAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import Swal from 'sweetalert2'

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext'

const EditProduct = () => { 

    const navigate = useNavigate();
    const { id } = useParams()

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    // product = state
    // setProduct = function to save/update the state 
    const[product, setProduct] = useState({
        name: '', 
        price: '',
        amount: '',
        available: 0,
        image: ''
    })
    const [checked, setChecked] = useState(false);

    // file = state
    // setFile = function to save/update the state 
    const [file, setFile] = useState('')

    // when the component is loaded
    useEffect(() => {

        // Check if the user is authenticated
        if(!auth.auth || localStorage.getItem('token') !== auth.token) {
            // Redirect
            navigate('/login')
            return
        }

        const queryAPI = async () => {
            const queryProduct = await clientAxios.get(`/products/${id}`, {
                headers: {
                    Authorization : `Bearer ${auth.token}`
                }
            })
    
            setProduct(queryProduct.data)
            setChecked(queryProduct.data.available)
        }

        queryAPI()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        // create a form1Data
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('price', product.price)
        formData.append('amount', product.amount)
        formData.append('available', checked)
        formData.append('image', file)
        console.log(formData)

        try {
            const res = await clientAxios.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization : `Bearer ${auth.token}`
                }
            })

            if(res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added Successfully',
                    text: res.data.message
                })
            }

            // redirect
            navigate('/products')
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                type: 'error',
                title: 'There was an error',
                text: 'Try again'
            })
        }
    }

    // read data form
    const handleOnChange = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    // add the image into the state
    const readFile = e => {
        setFile(e.target.files[0])
    }

    // extract state values
    const { name, price, amount, image} = product

    if(!name) return  <Spinner />

    return(
        
        <Fragment>
            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill out all fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input type="text" placeholder="Product Name" name="name"
                        defaultValue={name}
                        onChange={handleOnChange}/>
                </div>

                <div className="campo">
                    <label>Price:</label>
                    <input type="number" name="price" min="0.00" step="0.01" placeholder="Price" 
                        defaultValue={price}
                        onChange={handleOnChange}/>
                </div>

                <div className="campo">
                    <label>Amount:</label>
                    <input type="number" name="amount" min="0.00" step="1" placeholder="Amount" 
                        defaultValue={amount}
                        onChange={handleOnChange}/>
                </div>

                <div className="campo">
                    <label>Is Available:</label>
                    <input type="checkbox" name="available" value="1"
                        defaultChecked={checked}
                        onChange={() => { setChecked((checked) ? 0 : 1)}} />
                </div>
            
                <div className="campo">
                    <label>Image:</label>
                    
                    { image ? (<img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={name} width="150px"></img>) : ''} 
    
                    <input type="file"  name="image" onChange={readFile} />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Save Product" />
                </div>
            </form>
        </Fragment>
    )
}

export default EditProduct