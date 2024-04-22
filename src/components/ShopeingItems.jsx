import React, { createContext, useEffect, useState } from 'react'
import { Navbar, Table } from 'react-bootstrap';
export const CartContext = createContext();



export default function ShopeingItems() {
const [cart, setCart] = useState([]); // Step 1: Setup state for cart
const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);



    
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
      const calculateTotalPrice = () => {
        // Step 4: Calculate total price of items in the cart
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      };
  return (
    <> 
            <Navbar/>

    <CartContext.Provider value={cart}>
 <div>
         <div>
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
    </div>
        </CartContext.Provider>
        </>
   
  )
}
