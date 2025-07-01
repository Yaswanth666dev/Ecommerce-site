import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";

const Shirts = ({ searchTerm = "", addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category")?.toLowerCase();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res2 = await fetch("https://dummyjson.com/products");
        const data2 = await res2.json();

        const dummyProducts = data2.products.map((item) => ({
          id: `dummy-${item.id}`,
          title: item.title,
          price: item.price,
          description: item.description,
          image: item.thumbnail,
          rating: item.rating,
          category: item.category?.toLowerCase() || "",
        }));

        const res1 = await fetch("https://fakestoreapi.com/products");
        const data1 = await res1.json();

        const fakeProducts = data1.map((item) => ({
          ...item,
          category: item.category?.toLowerCase() || "",
        }));

        const combined = [...dummyProducts, ...fakeProducts];

        setProducts(combined);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredItems = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category
      ? item.category && item.category.toLowerCase().includes(category)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="proSection">
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="cardmain">
          {filteredItems.map((item) => (
            <Card className="card1" key={item.id}>
              <Card.Img
                variant="top"
                src={item.image}
                className="image"
                alt={item.title}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title>{item.title.slice(0, 15)}...</Card.Title>
                <Card.Text>
                  <span>Price:</span> ${item.price}
                </Card.Text>
                <Button
                  className="bg-danger"
                  variant="primary"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shirts;
