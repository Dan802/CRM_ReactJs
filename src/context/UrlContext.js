import React, {useState}  from 'react'

const UrlContext = React.createContext(['youtube.com', () => {}])

const UrlProvider = props => {

    const [url, setUrl] = useState('www.google.com')

    return(
        <UrlContext.Provider value={url}>
        </UrlContext.Provider>
    )
}

export {UrlContext, UrlProvider}

// No funka aun