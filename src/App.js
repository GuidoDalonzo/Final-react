import { useState, useEffect } from 'react';
import './App.css';
import ItemListContainer from './ItemListContainer';
import Navbar from './Navbar';
import ItemDetailContainer from './ItemDetailContainer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CartProvider from './CartContext';
import Cart from './Cart';
import {firestore} from "./firebase"

// Preparo mi listado de productos. Esto lo podría tener en un archivo aparte también. 
/*
const products = [{
  id: 1,
  name: "Infantería",
  price: "10",
  image: image1,
  description: "Alto soldado",
  stock: 3,
  initial: 1,
  categoryId: "infanteria",
},{
  id: 2,
  name: "Arquería",
  price: "20",
  image: image2,
  description: "Alto Arquero",
  stock: 5,
  initial: 2,
  categoryId: "arqueria",
},{
  id: 3,
  name: "Caballería",
  price: "30",
  image: image3,
  description: "Alto Caballero",
  stock: 6,
  initial: 1,
  categoryId: "caballeria",
}
]
*/

function App() {
  
  const [ fireItems, setFireItems ] = useState([])


  useEffect(() => {
      const db = firestore
      const collection = db.collection('products')
      const query = collection.get()
      query
        .then((result) => {
          setFireItems(result.docs.map(p => ({id: p.id, ...p.data()})))
        })
        .catch((error) => {
          console.log(error)
        })
  }, [fireItems])

  return (
    <div className="app">
      
     
      <CartProvider>      
      <BrowserRouter>        
        <Navbar />
        <Switch>          
          <Route exact path="/">
            <ItemListContainer greeting="Bienvenido" products={fireItems} />
          </Route>         
          <Route exact path="/category/:id">
            <ItemListContainer greeting="Bienvenido" products={fireItems} />
          </Route>
          <Route exact path="/item/:id">
            <ItemDetailContainer />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>


      </Switch>
      </BrowserRouter>

      </CartProvider>
    </div>
  );
}

export default App
