import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

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
                <MealItemForm id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;
