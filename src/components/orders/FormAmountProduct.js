
import React from 'react'

export default function FormAmountProduct (props) {

    const { product, index, subtractProducts, addProducts, deleteProductOrder } = props

    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{product.name}</p>
                <p className="precio">${product.price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus" onClick={() => subtractProducts(index)}></i>
                    <p>{product.amount}</p>
                    <i className="fas fa-plus" onClick={() => addProducts(index)}></i>
                </div>
                <button type="button" className="btn btn-rojo"
                        onClick={() => deleteProductOrder(product._id)}>
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
    )
}