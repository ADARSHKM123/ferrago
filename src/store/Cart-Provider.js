import React from 'react';
import CartContext from './CartContext';
import { useReducer } from 'react';


const defaultCartState = {
  items: [],
  totalAmount: 0,
}   

const cartReducer=(state,action)=>{
  if(action.type === 'ADD'){
   const updatedItems = state.items.concat(action.item);
   const updatedAmount = state.totalAmount + action.item.price*action.item.amount;
   return{
     items:updatedItems,
     totalAmount:updatedAmount
   }
  }
  // if(action.type === 'REMOVE'){
  //   const updatedItems = state.items.filter(each=> each.id !== action.id);
  //   const updatedAmount = state.totalAmount - ac
  // }
return defaultCartState;
}

function CartProvider(props) {

  const [CartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemHandler=(item)=>{
    dispatchCartAction({type:'ADD',item:item});

  }
  const removeItemHandler=(id)=>{
    dispatchCartAction({type:'REMOVE',id:id});
  }

  const cartContext = {
    items:CartState.items,
    totalAmount:CartState.totalAmount,
    addItems:addItemHandler ,
    removeItem:removeItemHandler,
  }

  return  <CartContext.Provider value={cartContext}>
         {props.children}
         </CartContext.Provider>
}

export default CartProvider;
  