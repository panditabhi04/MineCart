import  { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css'

export default function Singin() {
  const [email, setEmail] = useState("")
  const [password,setPassword]=useState("")

  const [emailErr, setEmailErr] = useState(false)
  const [passwordErr,setPasswordErr]=useState(false)


  const navigate = useNavigate();


  const Validetion = () => {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let validId = true;

    if (!password || password.length < 3) {
        setPasswordErr(true);
        validId = false;
    } else {
        setPasswordErr(false)
    }
    if (!email || !pattern.test(email)) {
        setEmailErr(true);
        validId = false;
    } else {
        setEmailErr(false)
    }
    return validId

  }

  const saveData=()=>
  {
    if (Validetion()) {
     navigate("/showdata");
    }
     
  }
  

  return (
    <>
    <div className="bg_signin">
      <Card style={{ width: '18rem', backgroundColor:"gray",padding:"10px"}}>
      <Card.Title className=''>Sign In</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
              {emailErr ? <span style={{color:"red"}}>Please Enter Email</span> : ""}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
              {passwordErr ? <span style={{color:"red"}}>Please Enter Password</span> : ""}<br />
            </Form.Group>
          </Form>
         <Button type="submit" onClick={saveData}>Submit</Button>{' '}
        </Card.Body>
        <div style={{ display: "flex", padding: 10, margin: 10 }}>
                    <p style={{ color: "white" }}>you have no accuont</p>{' '}<Link style={{ color: "orange" }} to="/singup">SinUp</Link>

                </div>
      </Card>
      
    </div>
    </>
    
  )
}
