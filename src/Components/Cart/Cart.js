import React from 'react';
import classes from './Cart.module.css';
import CartModel from './CartModel';
import CartContext from '../../store/CartContext';
import { useContext } from 'react';
import CartItem from './CartItem';
function Cart(props) {

const ctx = useContext(CartContext);


const totalAmount = ctx.totalAmount.toFixed(2);

const hasItem = ctx.items.length >0;

const CartRemoveHandler=(id)=>{
ctx.removeItem(id);
}

const CartAddHandler = (item)=>{
ctx.addItems(item);
}

const submitCartItems=async()=>{
  console.log('clicked');
  try{
    const response = await fetch('https://ferrago-1e216-default-rtdb.firebaseio.com/orders.json',{
         method:'POST',
         body:JSON.stringify({
           cart:ctx.items,
           
         })
       })
       if(response.ok){
        console.log('succesfull');
      }
       if(!response.ok){
         throw new Error('Something went wromg');
       }
     const data =await response.json();
     console.log(data);

  }catch(error){
   console.log(error);
  }
}


  const cartItems = <ul className={classes['cart-items']}>
  {ctx.items.map(item=> 
  <CartItem 
  key={item.id}
   name={item.name}
    amount={item.amount}
     price={item.price} 
     onRemove={CartRemoveHandler.bind(null,item.id)} 
     onAdd={CartAddHandler.bind(null,item)}>
     </CartItem>)}
  </ul>
  return (
    <CartModel closing={props.Onclose}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button-alt']} onClick={props.Onclose}>Close</button>
      {hasItem && <button className={classes.button} onClick={submitCartItems}>Order</button>}
    </div> 
  </CartModel>
  )
} 

export default Cart;
