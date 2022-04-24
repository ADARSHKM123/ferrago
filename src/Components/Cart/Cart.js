import React from 'react';
import classes from './Cart.module.css';
import CartModel from './CartModel';
import CartContext from '../../store/CartContext';
import { useContext, useState } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';



function Cart(props) {

  const [isCheckout, setIsCheckout] = useState(false);
  const [Issubmiting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);
  const totalAmount = ctx.totalAmount.toFixed(2);

  const hasItem = ctx.items.length > 0;

  const CartRemoveHandler = (id) => {
    ctx.removeItem(id);
  }

  const CartAddHandler = (item) => {
    ctx.addItems(item);
  }
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('https://ferrago-latest-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user:userData,
          cart: ctx.items,
        })
      })

      setIsSubmitting(false);
      setDidSubmit(true)
      ctx.clearCart();

      if (response.ok) {
        console.log('succesfull');
      }
      if (!response.ok) {
        throw new Error('Something went wromg'); 
      }
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }


  const modalActions = <div className={classes.actions}>
    <button className={classes['button-alt']} onClick={props.Onclose}>Close</button>
    {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>


  const cartItems = <ul className={classes['cart-items']}>
    {ctx.items.map(item =>
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={CartRemoveHandler.bind(null, item.id)}
        onAdd={CartAddHandler.bind(null, item)}>
      </CartItem>)}
  </ul>

  const CartModalContnt = 
  <React.Fragment>
  {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Checkout onCancel={props.Onclose}  onConfirm={submitOrderHandler} />}
  {!isCheckout && modalActions}
  </React.Fragment>

const isSubmitingModalContent = <p>Sending order data....</p>

const didSubmitingModalContent = 
<React.Fragment>
<p>Successfully sent the order!</p>
<div className={classes.actions}>
<button className={classes.button} onClick={props.Onclose}>Close</button>
</div>
</React.Fragment>

  return (
    <CartModel closing={props.Onclose}>
     {!Issubmiting && !didSubmit && CartModalContnt}
     {Issubmiting && isSubmitingModalContent}
     {!Issubmiting && didSubmit && didSubmitingModalContent}
    </CartModel>
  )
}

export default Cart;
