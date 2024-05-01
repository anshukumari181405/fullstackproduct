
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearMessage } from '../store/cartSlice';

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const message = useSelector(state => state.cart.message);

    useEffect(() => {
        axios.get('https://fullstackproduct.onrender.com/api')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart({_id: id}));
    };

    return (
        <Container>
            <h1>Products</h1>
            {message && <Alert variant="info" onClose={() => dispatch(clearMessage())} dismissible>{message}</Alert>}
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className="mb-4">
                            <Card.Img style={{ width: "300px", height: "300px" }} variant="top" src={product.image} alt={product.title}  />
                            <Card.Body>
                                <Card.Title style={{ height:"50px", overflow:'hidden'}}>{product.title}</Card.Title>
                                <Card.Text style={{height:"20px", overflow:'hidden'}}>Description: {product.description}</Card.Text>
                        <Card.Text style={{fontWeight:"bold"}}>Price: ${product.price}</Card.Text>
                        <Card.Text style={{fontWeight:"bold"}}>Rating: {product.rating}</Card.Text>
                                
                                {cartItems[product._id] ? (
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(product._id)}>Remove from Cart</Button>
                                ) : (
                                    <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;