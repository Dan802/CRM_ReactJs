import React from 'react'

export default function FormSearchProduct(props) {

    return (

        <form onSubmit={props.handleOnSubmit}>        
            <legend>Search and add any product</legend>

            <div className="campo">
                <label>Products:</label>
                <input type="text" placeholder="Product's Name" name="products"
                    onChange={props.handleOnChange}
                />
            </div>

            <input type="submit" className='btn btn-azul btn-block' value="Search Product" />
        </form>
    )
}