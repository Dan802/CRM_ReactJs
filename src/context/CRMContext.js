// similar to redux
import React, { useState } from 'react'

// initialize with an empty object and a function
const CRMContext = React.createContext([{}, () => {}])

const CRMProvider = props => {

    const token = localStorage.getItem('token') || ''

    // Define the initial state
    const [auth, setAuth] = useState({
        token,
        auth: false
    })

    return(
        <CRMContext.Provider
            value={[auth, setAuth]}
        >
            {props.children}
        </CRMContext.Provider>
    )
}

export {CRMContext, CRMProvider}
