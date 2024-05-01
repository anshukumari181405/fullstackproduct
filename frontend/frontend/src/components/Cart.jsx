
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/cartSlice';
import { Button } from 'react-bootstrap';

const Cart = () => {
    
    const cart = useSelector(state => state.cart);
    const items = cart.items;
    const error = cart.message;
    const dispatch = useDispatch();

    const calculateTotal = () => {
        return Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container">
            <h1>Cart</h1>
            {error && <p>{error}</p>}
            <div className="row">
                {Object.values(items).map(item => (
                    <div className="col-lg-4 col-md-6 mb-4" key={item._id}>
                        <div className="card h-100">
                            <img className="card-img-top" style={{height:"300px"}}src={item.image} alt={item.title} />
                            <div className="card-body">
                                <h4 className="card-title">{item.title}</h4>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text" style={{fontWeight:"bold"}}>Price: ${item.price.toFixed(2)}</p>
                                <p className="card-text">{item.oldPrice}</p>
                                <p className="card-text">Quantity: {item.quantity}</p>
                                <div className="btn-group" role="group">
                                    <Button variant="secondary" onClick={() => dispatch(decrementQuantity(item))} disabled={item.quantity <= 1}>-</Button>
                                    <Button variant="secondary" onClick={() => dispatch(incrementQuantity(item))}>+</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
    );
};

export default Cart;
