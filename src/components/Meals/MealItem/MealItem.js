import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
    const price = props.price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumSignificantDigits: 4
    });

    return (
        <li className={classes.meal}>
            <div className={classes.description}>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm></MealItemForm>
            </div>
        </li>
    );
};

export default MealItem;
