import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import  Navbar   from "../Comman/Navbar";
import { Link, useNavigate } from 'react-router-dom';

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const Navigate=useNavigate()


const saveData=()=>{
    let data={name,price,description}
    
    fetch('https://6620fdee3bf790e070b177bd.mockapi.io/product/Products',{
        method:"POST",
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
        },
        body:JSON.stringify(data)
      }).then((result)=>{
        console.log(result)
        Navigate("/showData")

      })
}
 

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleUpload = () => {
    // Here, you can handle the upload logic, such as sending the image file to a server
    console.log("Selected image:", selectedImage);
  };
  return (
    <div>
      <Navbar />
      <div className="bg_signin">

        <Card
          style={{ width: "18rem", backgroundColor: "gray", padding: "10px" }}
        >
          <Card.Title className="">Admin</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder=""
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" onClick={()=>saveData()}>Submit</Button>{" "}

            </Form>
            <div className="container mt-5">
              {/* <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
               
              </Form> */}
              {/* {selectedImage && (
                <div className="mt-3">
                  <h2>Preview</h2>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}<br/>
               <Button variant="primary" onClick={handleUpload}>
                  Upload
                </Button> */}

            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
