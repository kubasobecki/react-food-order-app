import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import classes from './OrderForm.module.css';
import Modal from '../UI/Modal';
import { FIREBASE_URL_ORDERS } from '../../env';

const isNotEmpty = val => val.trim().length > 0;
const isNumber = val => val.trim().length > 0 && val.trim().match(/^[0-9]*$/);

const OrderForm = props => {
    const cartCtx = useContext(CartContext);
    const { isLoading: isSending, error, sendRequest: sendOrder } = useHttp();
    const [orderSuccessful, setOrderSuccessful] = useState(false);

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        classes: firstNameClasses,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput(isNotEmpty);

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        classes: lastNameClasses,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput(isNotEmpty);

    const {
        value: addressValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        classes: addressClasses,
        changeHandler: addressChangeHandler,
        blurHandler: addressBlurHandler,
        reset: addressReset
    } = useInput(isNotEmpty);

    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        classes: phoneClasses,
        changeHandler: phoneChangeHandler,
        blurHandler: phoneBlurHandler,
        reset: phoneReset
    } = useInput(isNumber);

    const formIsValid =
        firstNameIsValid && lastNameIsValid && addressIsValid && phoneIsValid;

    const confirmOrder = () => {
        // 2. Clear cart
        cartCtx.clearCart();
        // 3. Show confirmation with Close button
        setOrderSuccessful(true);
    };

    const submitOrderHandler = async e => {
        e.preventDefault();

        if (!formIsValid) return;

        // 1. Send order with http request
        await sendOrder(
            {
                url: FIREBASE_URL_ORDERS,
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: {
                    recipient: `${firstNameValue} ${lastNameValue}`,
                    address: addressValue,
                    phone: phoneValue,
                    meals: cartCtx.items,
                    total: cartCtx.totalAmount
                }
            },
            confirmOrder
        );

        // Clear Inputs
        firstNameReset();
        lastNameReset();
        addressReset();
        phoneReset();
    };

    const orderForm = (
        <form className={classes.form} onSubmit={submitOrderHandler}>
            <div className={classes['control-group']}>
                <div
                    className={`${classes['form-control']} ${classes[firstNameClasses]}`}
                >
                    <label htmlFor="first-name">First name</label>
                    <input
                        type="text"
                        id="first-name"
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        value={firstNameValue}
                    />
                    {firstNameHasError && (
                        <p className={classes['error-text']}>
                            Invalid first name
                        </p>
                    )}
                </div>
                <div
                    className={`${classes['form-control']} ${classes[lastNameClasses]}`}
                >
                    <label htmlFor="last-name">Last name</label>
                    <input
                        type="text"
                        id="last-name"
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastNameValue}
                    />
                    {lastNameHasError && (
                        <p className={classes['error-text']}>
                            Invalid last name
                        </p>
                    )}
                </div>
                <div
                    className={`${classes['form-control']} ${classes[addressClasses]}`}
                >
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        onChange={addressChangeHandler}
                        onBlur={addressBlurHandler}
                        value={addressValue}
                    />
                    {addressHasError && (
                        <p className={classes['error-text']}>Invalid address</p>
                    )}
                </div>
                <div
                    className={`${classes['form-control']} ${classes[phoneClasses]}`}
                >
                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="text"
                        id="phone"
                        onChange={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                        value={phoneValue}
                    />
                    {phoneHasError && (
                        <p className={classes['error-text']}>
                            Invalid phone number
                        </p>
                    )}
                </div>
            </div>
            <div className={classes['form-actions']}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onCancel}
                >
                    Cancel
                </button>
                <button
                    className={classes.button}
                    disabled={!formIsValid}
                    onClick={props.onOrder}
                >
                    Confirm Order
                </button>
            </div>
        </form>
    );

    const successMessage = (
        <div>
            <div className={classes['form-actions']}>
                <p>Your order was successful 🥳</p>
                <button
                    className={classes['button--alt']}
                    onClick={props.onCancel}
                >
                    Close
                </button>
            </div>
        </div>
    );

    return (
        <Modal onClose={props.onCancel}>
            {!orderSuccessful && orderForm}
            {orderSuccessful && successMessage}
        </Modal>
    );
};

export default OrderForm;
