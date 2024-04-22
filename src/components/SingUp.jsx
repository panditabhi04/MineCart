import { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";

export default function Singup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();

  const [fullNameErr, setFullNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [repasswordErr, setRePasswordErr] = useState(false);

  const validation = () => {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let validId = true;

    if (!fullName || fullName.length < 3) {
      setFullNameErr(true);
      validId = false;
    } else {
      setFullNameErr(false);
    }
    if (!email || !pattern.test(email)) {
      setEmailErr(true);
      validId = false;
    } else {
      setEmailErr(false);
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      setPhoneNumberErr(true);
      validId = false;
    } else {
      setPhoneNumberErr(false);
    }

    if (!password || password.length < 3) {
      setPasswordErr(true);
      validId = false;
    } else {
      setPasswordErr(false);
    }
    if (!repassword || repassword !== password) {
      setRePasswordErr(true);
      validId = false;
    } else {
      setRePasswordErr(false);
    }
    return validId;
  };

  const saveData = (e) => {
    e.preventDefault();
    if (validation()) {
      console.log(phoneNumber);
      //  console.log("data",fullName,email,gender,adress,password,repassword);
      let data = {
        fullName: fullName,
        email: email,
        password: password,
        phonenumber: phoneNumber,
      };
      fetch("https://6620fdee3bf790e070b177bd.mockapi.io/product/Products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
        navigate("/Singin");
      });
    }
  };

  return (
    <>
      <div className="bg_signin">
        <Card style={{ width: "18rem", backgroundColor: "gray" }}>
          <Card.Body>
            <Card.Title className="">Sign Up</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setFullName(e.target.value)}
                />
                {emailErr ? (
                  <span style={{ color: "red" }}>Please Enter Name</span>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailErr ? (
                  <span style={{ color: "red" }}>Please Enter Email</span>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {emailErr ? (
                  <span style={{ color: "red" }}>Please Enter Number</span>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
                {passwordErr ? (
                  <span style={{ color: "red" }}>Please Enter Password</span>
                ) : (
                  ""
                )}
                
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label style={{  }}>
                  Re-Enter Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-EnterPassword"
                  onChange={(e) => setRePassword(e.target.value)}
                />
                {repasswordErr ? (
                  <span style={{ color: "red" }}>Password does not Match</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Form>
            <Button type="submit" onClick={saveData}>
              Submit
            </Button>{" "}
          </Card.Body>
          <div style={{ display: "flex", padding: 10, margin: 10 }}>
            <p style={{ color: "white" }}>you have no accuont</p>{" "}
            <Link style={{ color: "orange" }} to="/Singin">
              {" "}
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
