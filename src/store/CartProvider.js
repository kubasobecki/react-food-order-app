import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const existingItem = state.items.find(
            item => item.id === action.item.id
        );

        let newItems;

        if (existingItem) {
            const newItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            newItems = state.items.map(item =>
                item === existingItem ? newItem : item
            );
        } else {
            newItems = [...state.items, action.item];
        }

        const newTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        return { items: newItems, totalAmount: newTotalAmount };
    }

    if (action.type === 'REMOVE') {
        const removedItem = state.items.find(item => item.id === action.id);

        let newItems;

        if (removedItem.amount > 1) {
            const newItem = { ...removedItem, amount: removedItem.amount - 1 };
            newItems = state.items.map(item =>
                item.id === action.id ? newItem : item
            );
        } else {
            newItems = state.items.filter(item => item.id !== action.id);
        }

        const newTotalAmount = state.totalAmount - removedItem.price;

        return { items: newItems, totalAmount: newTotalAmount };
    }

    if (action.type === 'CLEAR') {
        return { items: [], totalAmount: 0 };
    }

    return defaultCartState;
};

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = newItem => {
        dispatchCartAction({ type: 'ADD', item: newItem });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const clearCartHandler = id => {
        dispatchCartAction({ type: 'CLEAR' });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
