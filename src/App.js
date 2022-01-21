
import Header from "./Components/Layout/Header";
import Meals from './Components/Meals/Meals';
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/Cart-Provider";
function App() {
  const [shownCart, setshownCart] = useState(false);

  const cartIsshown=()=>{
    console.log('clicked');
    setshownCart(true);
  }

  const cartIsHide=()=>{
    setshownCart(false); 
  }

  return (
    <CartProvider>
     {shownCart && <Cart Onclose={cartIsHide}/>}
      <Header OnshowCart={cartIsshown}/> 
      <main>  
      <Meals/>
      </main>
      </CartProvider>
  );
}

export default App;


