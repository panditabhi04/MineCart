import React, { createContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from "../Comman/Navbar";
import Modal from 'react-bootstrap/Modal';
import noImg from '../assets/no-image.png';

export const CartContext = createContext();

const ShowData = (props) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]); // Step 1: Setup state for cart

  const addCount = () => {
    
    setCount(count + 1);
  };

  const decressCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

 
  const handleAddToCart = (item) => {
    const itemExists = cart.some((cartItem) => cartItem.id === item.id);
  
    if (itemExists) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + count } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: count }]);
    setShow(false)

    }
  };
  

  const handleRemoveFromCart = (id) => {
    // Step 3: Remove item from cart state
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    // Step 4: Calculate total price of items in the cart
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleShow = (item) => {
    setShow(true);
    setSelectedData(item);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6620fdee3bf790e070b177bd.mockapi.io/product/Products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (sortConfig.key !== null) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredData;
  };

  const sortedAndFilteredData = sortedData();

  return (
    <>
      <Navbar />
      <div className="container">
        <InputGroup classNameName="mb-3">
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            placeholder="Search Product"
            aria-label="Search Product"
            aria-describedby="basic-addon1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <br />
        <div className="container">
          <div className="row">
            {sortedAndFilteredData.map((item) => {
              return (
                <div className="col-sm">
                  <Card
                    style={{ width: "18rem", backgroundColor: "gray", margin: 10, right: 20 }}
                  >
                    <Card.Img variant="top" src={noImg} />
                    <Card.Body>
                      <Card.Title>Product Name:{item.name}</Card.Title>
                      <Card.Text>
                        Product Description:{item.description}
                      </Card.Text>
                      <Card.Text>Product Price:{item.price}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(item)}
                      >
                        Show
                      </Button>&nbsp;&nbsp;&nbsp;
                      <Button
                        variant="success"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CartContext.Provider value={cart}>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Product Name:{selectedData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Product Description:{selectedData?.description}
              <br />
              Product Price:{selectedData?.price}
              <div style={{ display: "flex" }}>
                <Button variant="danger" onClick={addCount}>
                  +
                </Button>{" "}
                <span>{count}</span> &nbsp;&nbsp;&nbsp;
                <Button variant="danger" onClick={decressCount}>
                  -
                </Button>&nbsp;&nbsp;&nbsp;
                <Button
                        variant="success"
                        onClick={() => handleClose()}
                        closeButton
                      >
                        Save
                      </Button>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
        {/* Step 5: Display items in the cart */}
        <div className="container">
          <h2>Shopping Cart</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3">Total:</td>
                <td colSpan="2">{calculateTotalPrice()}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CartContext.Provider>
    </>
  );
};

export default ShowData;
