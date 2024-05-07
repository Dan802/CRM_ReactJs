// similar to redux
import React, { useState, useEffect } from 'react'
import clientAxios from '../config/axios'
import { useNavigate } from 'react-router-dom'

// initialize with an empty object and a function
const CRMContext = React.createContext([{}, () => {}])

const CRMProvider = props => {

    // Define the initial state
    const [auth, setAuth] = useState({
        token: '',
        auth: false
    })
    
    // if there is a token in the localStorage of the browser...
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(() => {

        // if there is a token and auth.auth is false
        // with this i think we dont make extra calls to the API
        if(token && !auth.auth){
            const queryAPI = async () => {
                try {

                    // Check if the token is valid
                    const isValid = await clientAxios.get('/token', {
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                    })
                    
                    // If the token is valid the user is authenticate
                    if(isValid.data.message === true){
                        setAuth({
                            token,
                            auth: true
                        })

                        // redirect
                        navigate('/')
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            }

            queryAPI()
        }

    }, [])
    

    return(
        <CRMContext.Provider
            value={[auth, setAuth]}
        >
            {props.children}
        </CRMContext.Provider>
    )
}

export {CRMContext, CRMProvider}