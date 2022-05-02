import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import './Cart.css';
import {CartContext} from './CartContext'
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {firestore} from "./firebase";
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Cart() {

    const { cart, clearCart, total } = useContext(CartContext)

    const [ openPay, setOpenPay ] = useState(false)

    const [ name, setName ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ email, setEmail ] = useState("")

    const classes = useStyles();


    function submitOrder(){

        
        const db = firestore
        const orders = db.collection('orders')

        const order = {
            buyer: { name: name, phone: phone, email: email},
            items: cart,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: total,
        }
        orders.add(order)
        .then(({ id }) => alert("Anotá el id de tu compra " + id))
        .catch((error) => console.log(error))
    }


    return (
        <div className="cart">
            { cart.length > 0 ? (
            <h1>Comprar</h1>
            )    
            :
            ( <>
            <h1>No has seleccionado ningun producto</h1>
                <Link to={"/"}>
                <Button onClick={clearCart} variant="contained" color="primary">
                    Ir a los productos
                </Button>
            </Link>
            </>)}

            <div className="cartItems">
                { cart.length > 0 && cart.map( product => <CartItem key={product.id} 
                id={product.id} name={product.name} image={product.image} price={product.price} 
                amount={product.amount} />)}
            </div>


            { cart.length > 0 &&
            <>
            <h2>${total}</h2>
            <div className="cartItems__buttons">
                <Button onClick={clearCart} variant="contained" color="primary">
                    Vaciar carrito
                </Button>
                <Button onClick={() => {setOpenPay(true)}} variant="contained" color="primary">
                    Hacemos numeros varon? 
                </Button>
            </div>
            </>}

            { openPay && 
            <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Name" value={name} 
            onChange={(e) => setName(e.target.value)} />
            <TextField id="standard-basic" label="Telephone" value={phone} 
            onChange={(e) => setPhone(e.target.value)} />
            <TextField id="standard-basic" label="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} />
            <Button onClick={submitOrder} variant="contained" color="primary">
                    Si
                </Button>
          </form>}


        </div>
    )
}

export default Cart
