import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'

const Header = () => {

    const [auth, setAuth] = useContext(CRMContext)
    
    const navigate = useNavigate();

    const logOut = () => {
        // auth.auth = false and delete token
        setAuth({
            token: '',
            auth: false
        })

        localStorage.setItem('token', '')

        // redirect
        navigate('/login')
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Manage all your customers</h1>

                    {/* If the user is authenticate... */}
                    {auth.auth ? (
                        <button type='button' className='btn btn-rojo'
                                onClick={logOut}>
                            <i className='far fa-times-circle'></i> Log Out 
                        </button>
                    ) : ''} 
                </div>
            </div>
        </header>
    )
    
}

export default Header