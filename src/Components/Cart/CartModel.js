import React, { Fragment } from 'react';
import classes from './CartModel.module.css';
import reactDom from 'react-dom';

const Backdrop=props=>{
return <div className={classes.backdrop} onClick={props.closing}></div>
};
const ModelOverlay=props=>{
return <div className={classes.modal}>
  <div className={classes.content}>{props.children}</div>
</div>
};

function CartModel(props) {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop closing={props.closing}/>,document.getElementById('Backdrop'))}
      {reactDom.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,document.getElementById('ModelOverlay'))}
    </Fragment>
  );
}

export default CartModel;
