import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clientAxios from '../../config/axios'

// import Context (return if the user is authetize with a json web token)
import { CRMContext } from '../../context/CRMContext';

const Product = ({product}) => { 

    // use context values
    const [auth, setAuth] = useContext(CRMContext)

    const { _id, amount, available, image, name, price } = product

    const onClickDeleteProduct = id => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete product!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await clientAxios.delete(`/products/${id}`, {
                    headers: {
                        Authorization : `Bearer ${auth.token}`
                    }
                })
                    .then(res => {
                        console.log(res)

                        Swal.fire({
                            title: "Deleted!",
                            text: res.data.message,
                            icon: "success"
                          });
                    })
                
                //Reload page
                // ToDo: Should be with useEffect
                window.location.reload();
            }
          });
    }

    return(
        <li className="producto" style={{borderBottom: "1px solid black", paddingBottom: "5px"}}>
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">Price: ${price}</p>
                <p className="precio">Amount: {amount}</p>
                <p className="precio">{(available) ? 'In Stock': 'No Stock'}</p>
                { image ? (
                    <img src={`http://localhost:5000/${image}`} alt={`${name}`}
                    style={{ height: "130px" }} />
                ) : null }
            </div>
            <div className="acciones">
                <Link to={`/products/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Product
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar"
                onClick={() => onClickDeleteProduct(_id)}>
                    <i className="fas fa-times"></i>
                    Delete Product
                </button>
            </div>
        </li>
    )
}

export default Product