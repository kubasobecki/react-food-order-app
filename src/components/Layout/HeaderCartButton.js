import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [btnBumpClass, setBtnBumpClass] = useState(false);

    const numberOfCartItems = cartCtx.items.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const btnClasses = `${classes.button} ${btnBumpClass ? classes.bump : ''}`;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBtnBumpClass(false);
        }, 300);

        return () => {
            setBtnBumpClass(true);
            clearTimeout(timeout);
        };
    }, [numberOfCartItems]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
