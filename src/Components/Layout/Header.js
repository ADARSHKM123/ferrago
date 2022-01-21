import React,{Fragment} from 'react';
import classes from './Header.module.css'
import mealsimg from '../../assets/brooke-lark-M4E7X3z80PQ-unsplash.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header=(props)=>{
  return(
   <Fragment>
   <header className={classes.header}>
     <h1>Farrago</h1>
     <HeaderCartButton onClick={props.OnshowCart}/>
   </header>
   <div className={classes['main-image']}> 
     <img src={mealsimg} alt='A table full covered with delicious food' />
   </div>

   </Fragment>
  )

}
 

export default Header;