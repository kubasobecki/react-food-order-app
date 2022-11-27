import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import classes from './OrderForm.module.css';
import Modal from '../UI/Modal';

const isNotEmpty = val => val.trim().length > 0;
const isNumber = val => val.trim().length > 0 && val.trim().match(/^[0-9]*$/);

const OrderForm = props => {
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

    const submitHandler = e => {
        e.preventDefault();

        if (!formIsValid) return;

        console.log('Form submitted 🥳');

        // Send order with http request

        // Clear cart

        firstNameReset();
        lastNameReset();
        addressReset();
        phoneReset();
    };

    return (
        <Modal onClose={props.onCancel}>
            <form className={classes.form} onSubmit={submitHandler}>
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
                            <p className={classes['error-text']}>
                                Invalid address
                            </p>
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
                    <button className={classes.button} disabled={!formIsValid}>
                        Confirm Order
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default OrderForm;
