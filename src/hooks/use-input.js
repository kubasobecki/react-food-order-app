import { useState } from 'react';

const useInput = validationFn => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validationFn(enteredValue);
    const hasError = !isValid && isTouched;

    const changeHandler = e => {
        setEnteredValue(e.target.value);
    };

    const blurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    const classes = hasError ? 'invalid' : '';

    return {
        value: enteredValue,
        isValid,
        hasError,
        classes,
        changeHandler,
        blurHandler,
        reset
    };
};

export default useInput;
