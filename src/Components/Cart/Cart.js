import React from 'react';
import classes from './Cart.module.css';
import CartModel from './CartModel';

function Cart(props) {


  const cartItems = <ul className={classes['cart-items']}>
  {[{id:'c1',name:'sushi',amount:2, price:12.99}].map(item=> <li>{item.name}</li>)}
  </ul>
  return (
    <CartModel closing={props.Onclose}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>35.62</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button-alt']} onClick={props.Onclose}>Close</button>
      <button className={classes.button}>Order</button>
    </div> 
  </CartModel>
  )
} 

export default Cart;
