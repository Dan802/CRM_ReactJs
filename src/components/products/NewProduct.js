import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clientAxios from '../../config/axios'

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext'

const NewProduct = () => { 

    const navigate = useNavigate();

    // use context values
    const [auth, setAuth] = useContext(CRMContext)
    
    // product = state
    // setProduct = function to save/update the state 
    const [product, setProduct] = useState({
        name: '', 
        price: '', 
        amount: 0,
        available: 0
    })
    const [checked, setChecked] = useState(false);

    // file = state
    // setFile = function to save/update the state 
    const [file, setFile] = useState('')

    useEffect(() => {
        // Check if the user is authenticated
        if(!auth.auth || localStorage.getItem('token') !== auth.token) {
            // Redirect
            navigate('/login')
            return
        }
    }, [])
    
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

    const handleSubmit = async e => {
        e.preventDefault()
     
        // create a formData
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('price', product.price)
        formData.append('amount', product.amount)
        formData.append('available', checked)
        formData.append('image', file)
        console.log(formData)

        try {
            const res = await clientAxios.post('/products/', formData, {
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

    return(
        <Fragment>
            <h2>New Product</h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill out all fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input type="text" placeholder="Nombre Producto" name="name"
                        onChange={handleOnChange}/>
                </div>

                <div className="campo">
                    <label>Price:</label>
                    <input type="number" name="price" min="0.00" step="0.01" placeholder="Precio" 
                        onChange={handleOnChange}/>
                </div>

                <div className="campo">
                    <label>Amount:</label>
                    <input type="number" name="amount" min="0.00" step="1" placeholder="Amount" 
                        onChange={handleOnChange}/>
                </div>

                <div className="campo">
                    <label>Is Available:</label>
                    <input type="checkbox" name="available" value="True"
                        onChange={() => { setChecked((checked) ? 0 : 1)}}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="image" 
                        onChange={readFile}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Add new Product" />
                </div>
            </form>

        </Fragment>
    )
}

export default NewProduct