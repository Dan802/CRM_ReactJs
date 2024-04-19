import React, {Fragment, useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import clientAxios from '../../config/axios'

function EditCustomer(props) {

    console.log('1. Inicializamos el state con un objeto de clientes vacio')
    // customer = state, 
    // setCustomers = Function to save the state
    const [customer, setCustomers] = useState({
        name: '',
        secondName: '',
        company: '',
        email: '',
        cellphone: ''
    });

    // 2. Se llama esta función desde el HTML return 
    // validate form
    const validateCustomer = () => {
        console.log('2. Desde validate Customer')

        // destructuring
        const {name, secondName, email, company, cellphone} = customer

        // check that all the state properties are not empty
        let isvalid = !name.length || !secondName.length || !email.length || !company.length || !cellphone.length

        return isvalid
    }

    // useEffect, the first time the component load (maybe)
    useEffect( () => {
        console.log('3. Desde useEffect')
        queryAPI()
    }, [])

    // Obtain Id Customer from URL
    const { id } = props.match.params

    // API Query
    const queryAPI = async () => {
        console.log('4. Desde queryAPI')
        
        // add the previous data into the state
        // setCustomers(customerQuery.data) 
        // But that, remove non-existent keys, like the optional data for example, so...

        const customerQuery = await clientAxios.get(`/customers/${id}`)

        const updatedCustomer = { ...customer };

        // Update the object, only changes but not delete any key 
        Object.keys(customerQuery.data).forEach(key => {
            updatedCustomer[key] = customerQuery.data[key];
        });

        console.log('setCustomers en queryAPI, rebooting...')
        setCustomers(updatedCustomer) // But this, remove non-existent keys, like phone customer for example, so...
    }
    
    // read form's data
    const handleOnChange = e => {
        console.log('5. Desde handleOnChange')
        console.log('setCustomers en handleOnChange, rebooting...')
        // save the user input into the state
        setCustomers({
            // Get a copy of the actual state
            ...customer, 
            // Add the new data
            [e.target.name] : e.target.value
        })

    }

    const handleSubmit = e => {
        e.preventDefault()

        // Send query through axios
        console.log('7. Desde handleOnSubmit')
        clientAxios.put(`/customers/${id}`, customer)
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
                        title: "The customer has been successfully updated",
                        text: res.data.message,
                        icon: "success"
                      });
                }

                // Redirect
                props.history.push('/')
            })
    }

    
    return(
        <Fragment>

            <h2>Edit Customer</h2>

            <form onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="name"
                            onChange={handleOnChange}
                            value={customer.name} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="secondName"
                            onChange={handleOnChange} 
                            value={customer.secondName}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="company"
                            onChange={handleOnChange}
                            value={customer.company} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"
                            onChange={handleOnChange}
                            value={customer.email} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="cellphone"
                            onChange={handleOnChange}
                            value={customer.cellphone} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Save Changes"
                    disabled={ validateCustomer()} />
                </div>

            </form>
        </Fragment>
    )
}

// higher order component
// withRouter needs a component and return a new component
export default withRouter(EditCustomer)