import React, { useState, useContext } from 'react';
import "./ItemCount.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { CartContext } from './CartContext';


function ItemCount({ item, id, add, substract, counter }) {
    const [ open, setOpen ] = useState(false)

    const { addToCart } = useContext(CartContext)
    
    function addAndOpen(item, counter, id){
        addToCart(item, counter, id);
        setOpen(true)
    }
    return (
        <div className="itemCount">
            <div className="itemCount__counter">
                <Button variant="contained" onClick={substract}>-</Button>
                    <h3>{counter}</h3>
                <Button variant="contained" onClick={add}>+</Button>
            </div>
            { !open ? (<div className="itemCount__agregar">
                <Button variant="contained" color="primary" onClick={ () => addAndOpen(item, counter, id)}>
                  <h3>Agregar al <ShoppingCartIcon /> </h3>
                </Button>
            </div>) : 
            (<div className="itemCount__terminar">
                <Link to="/cart">
                    <Button variant="contained" color="primary" >
                        <h3>Terminar la compra</h3>
                    </Button>
                </Link>
            </div>) }
        </div>
    )
}

export default ItemCount
