import React, {Fragment, useContext, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../../config/axios'

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

function NewCustomer() {

    const navigate = useNavigate();

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    // customer = state
    // saveCustomer = function to save the state
    const[customer, saveCustomer] = useState({
        name: '',
        secondName: '',
        company: '',
        email: '',
        cellphone: ''
    })

    useEffect(() => {
        // Check if the user is authenticated
        if(!auth.auth || localStorage.getItem('token') !== auth.token) {
            // Redirect
            navigate('/login')
        }
    }, [])  

    // read form's data
    const updateState = e => {
        // save the user input into the state
        saveCustomer({
            // Get a copy of the actual state
            ...customer, 
            // Add the new data
            [e.target.name] : e.target.value
        })
    }

    // validate form
    const validateCustomer = () => {
        // destructuring
        const {name, secondName, email, company, cellphone} = customer

        // check that all the state properties are not empty
        let isvalid = !name.length || !secondName.length || !email.length || !company.length || !cellphone.length

        return isvalid
    }

    // Add through Rest API a new customer
    const handleSubmit = e => {
        e.preventDefault()

        // Send request
        clientAxios.post('/customers', customer, {
            headers: {
                Authorization : `Bearer ${auth.token}`
            }
        })
            .then(res => {
                console.log(res)

                // validate if there are mongo errors that are differents to connection errors with the server
                if(res.data.code === 11000){

                    Swal.fire({
                        title: "That customer is already registered",
                        text: res.data.message,
                        icon: "error"
                      });

                } else {

                    Swal.fire({
                        title: "You have added a new customer",
                        text: res.data.message,
                        icon: "success"
                      });
                }

                // Redirect
                navigate('/')
            })
    }

    return(
        <Fragment>

            <h2>New Customer</h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill out all fields</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="name"
                            onChange={updateState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="secondName"
                            onChange={updateState} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="company"
                            onChange={updateState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"
                            onChange={updateState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="cellphone"
                            onChange={updateState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Add New Customer"
                    disabled={ validateCustomer()} />
                </div>

            </form>
        </Fragment>
    )
}

export default NewCustomer