import React from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/CartContext';
import { useContext,useEffect,useState } from 'react';

function HeaderCartButton(props) {
  const ctx = useContext(CartContext);
  const [BtnHighlighted, setBtnHighlighted] = useState(false);

  const numberOfCartItems = ctx.items.reduce((curNumber,item)=>{
   return curNumber+item.amount;
  },0)

  const btnClass = `${classes.button} ${BtnHighlighted ? classes.bump :''}`

  const {items} = ctx;

  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setBtnHighlighted(true);

  const timer =  setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return()=>{
      clearTimeout(timer);
    }
  }, [items]);
  


  return <button className={btnClass} onClick={props.onClick}> 
    <span className={classes.icon}>
      <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
  </button>;
}

export default HeaderCartButton;
