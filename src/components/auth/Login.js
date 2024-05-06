import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../../config/axios'
import Swal from 'sweetalert2'

// context
import { CRMContext } from "../../context/CRMContext"

export default function Login() {

    const [auth, setAuth] = useContext(CRMContext)
    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate();

    const handleOnChange = e => {
        setCredentials({
            ...credentials, 
            [e.target.name] : e.target.value
        })
    }

    const handleOnSubmit = async e => {
        e.preventDefault()

        // authenticate the user
        try {
            // Return the token
            const response = await clientAxios.post(`/log-in`, credentials, {
                headers: {
                    Authorization : `Bearer ${auth.token}`
                }
            })
            
            // get the token and add to localstorage
            const {token} = response.data
            localStorage.setItem('token', token)

            // save into the auth state
            setAuth({
                token,
                auth: true
            })

            Swal.fire({
                title: 'Login successfully',
                icon: 'success',
                timer: 3000
            })

            // Redirect
            navigate('/')
            
        } catch (error) {
            console.log(error)
            
            Swal.fire({
                icon: 'error',
                title: 'There was an error',
                text: error.response?.data.message,
                timer: 5000
            })
        }
    }

    return (
        <div className="login">
            <h2>Log In</h2>

            <div className="contenedor-formulario">
                <form  onSubmit={handleOnSubmit}>
                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id='email' placeholder="Email" required autoComplete="off"
                                onChange={handleOnChange}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id='password' placeholder="Password" required
                                onChange={handleOnChange}/>
                    </div>

                    <input type="submit" value="Log In" className="btn btn-verde btn-block"/>
                </form>
            </div>
        </div>
    )
}