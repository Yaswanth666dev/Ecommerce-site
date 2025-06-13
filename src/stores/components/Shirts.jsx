import React from "react";
import Mobi from '../data/mobi';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Shirts = ({ searchTerm, addToCart }) => {
  const filteredItems = Mobi.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); 
  
  return (
    <>
     
      <div className="proSection">
        <div className="cardmain">
          {filteredItems.map((item) => (
            <Card className="card1" key={item.id}>
              <Card.Img variant="top" src={item.image} className="image" alt="image" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  <span>Price:</span> {item.price}
                </Card.Text>
     
                <Button className="bg-danger" variant="primary" onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shirts;


