import React from 'react';
import CartContext from './CartContext';
import { useReducer } from 'react';


const defaultCartState = {
  items: [],
  totalAmount: 0,
}   

const cartReducer=(state,action)=>{
  if(action.type === 'ADD'){
    const updatedAmount = state.totalAmount + action.item.price*action.item.amount;
    const existingItemIndex = state.items.findIndex(item=> item.id=== action.item.id);
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;
   
    if(existingCartItem){
    const  updatedItem={
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems =[...state.items]
      updatedItems[existingItemIndex] = updatedItem;
    }else{
      updatedItems = state.items.concat(action.item);
    }
   return{
     items:updatedItems,
     totalAmount:updatedAmount
   }
  }
  
  if(action.type === 'REMOVE'){
    let updatedItem;
    let updatedItems;
   
      const existingItemIndex = state.items.findIndex(item=> item.id=== action.id);
      const existingCartItem = state.items[existingItemIndex];
     const updatedAmount = state.totalAmount - existingCartItem.price;
   if(existingCartItem.amount === 1){
     updatedItems = state.items.filter(each=> each.id !== action.id);
   }else{
  
   updatedItem = 
   {  ...existingCartItem,
    amount:existingCartItem.amount-1 }
    updatedItems =[...state.items]
    updatedItems[existingItemIndex] = updatedItem;
   }
    return{
      items:updatedItems,
      totalAmount: updatedAmount
    }
  }
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
  