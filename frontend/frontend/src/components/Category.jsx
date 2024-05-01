

// export default Category;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const encodedCategoryName = encodeURIComponent(categoryName); 
    axios.get(`https://fullstackproduct.onrender.com/api?category=${encodedCategoryName}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  }, [categoryName]);

  return (
    <Container>
      <h1>{categoryName}</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card>
              <Card.Img   style={{width:"300px",height:"300px"}} variant="top" src={product.image} />
              <Card.Body>
                <Card.Title style={{height:"50px", overflow:'hidden'}} >{product.title}</Card.Title>
                <Card.Text style={{height:"20px", overflow:'hidden'}}>Description: {product.description}</Card.Text>
                        <Card.Text style={{fontWeight:"bold"}}>Price: ${product.price}</Card.Text>
                        <Card.Text style={{fontWeight:"bold"}}>Rating: {product.rating}</Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;

