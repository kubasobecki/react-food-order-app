import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { FIREBASE_URL_MEALS } from '../../env.js';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
    const [mealsList, setMealsList] = useState([]);
    const { isLoading, error, sendRequest: sendMealsRequest } = useHttp();

    useEffect(() => {
        const createMeals = mealsData => {
            const meals = [];
            for (let key in mealsData) {
                const mealItem = (
                    <MealItem
                        key={key}
                        id={key}
                        name={mealsData[key].name}
                        description={mealsData[key].description}
                        price={mealsData[key].price}
                    />
                );
                meals.push(mealItem);
            }
            setMealsList(meals);
        };

        const loadMeals = async () => {
            await sendMealsRequest({ url: FIREBASE_URL_MEALS }, createMeals);
        };

        loadMeals();
    }, []);

    return (
        <section className={classes.meals}>
            <Card>
                {isLoading && (
                    <p className={classes.info}>Loading available meals...</p>
                )}
                {!error && !isLoading && <ul>{mealsList}</ul>}
                {error && <p className={classes.info}>{error}</p>}
            </Card>
        </section>
    );
};

export default AvailableMeals;
