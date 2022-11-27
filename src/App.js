import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import Cart from './components/Cart/Cart';
import OrderForm from './components/Orders/OrderForm';

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [orderIsShown, setOrderIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const showOrderHandler = () => {
        setCartIsShown(false);
        setOrderIsShown(true);
    };

    const hideOrderHandler = () => {
        setOrderIsShown(false);
        setCartIsShown(true);
    };

    return (
        <CartProvider>
            {cartIsShown && (
                <Cart
                    onClose={hideCartHandler}
                    onShowOrder={showOrderHandler}
                />
            )}
            {orderIsShown && <OrderForm onCancel={hideOrderHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
