import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import cartImage from '../assets/shoping.png'
import "../Style/Navbar.css"
import Admin from "../assets/admin.png"

export default function Home() {
    const navigate = useNavigate()

  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Mine Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/shopeingItems"></Nav.Link>
            <Nav.Link href="/showdata"></Nav.Link>
            
            <Nav.Link href="#" disabled>

            </Nav.Link>

          </Nav>
          <div className='cart-icon'>
          <Link to="/admin">
          <img   style={{height:30 }}/>
          </Link>
          
          </div>
          
          
            <Button variant="outline-success me-2" onClick={() => navigate("/Singin")}>Sign in</Button>
            <Button variant="outline-success"  onClick={() => navigate("/singup")}>Sign up</Button>

        
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="bg_signin">
        
        <p style={{color:"red",fontSize:50,fontFamily:"-moz-initial"}}>Welcome to Mine Cart</p>

    </div>
    </>
    
  )
}
