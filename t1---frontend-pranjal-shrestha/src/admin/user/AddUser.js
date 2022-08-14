import { extend } from "jquery";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";

class AddUser extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    email: "",
    dob: "",
    role: "",
    success: false,

    profile: "",
    username: "",
    password: "",
    confirmpassword: "",
    error: "",
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  sendUserData = async (e) => {
    e.preventDefault();
    try {
      if (!this.validate()) return;
      const data = new FormData();
      data.append("name", this.state.name);
      data.append("phone", this.state.phone);
      data.append("address", this.state.address);
      data.append("email", this.state.email);
      data.append("dob", this.state.dob);
      data.append("profile", this.state.profile);
      data.append("role", this.state.role);
      data.append("username", this.state.username);
      data.append("password", this.state.password);
      console.log(this.state);

      const response = await axios.post(
        "http://localhost:5000/user/register",
        data,
        this.state.config
      );
      this.setState({
        success: true,
      });
      setTimeout(() => {
        this.setState({ success: false });
      }, 1000);
    } catch (error) {
      console.log(error.response);
      this.setState({ error: error.response.data.msg }, () => {
        this.dismissError();
      });
      this.setState({ success: false }, () => {
        this.dismissError();
      });
    }
  };
  // dissmiss alert box
  dismissError = () => {
    window.setTimeout(() => {
      this.setState({ error: "" });
    }, 2000);
  };
  // validation
  validate = () => {
    if (this.state.name === "") {
      this.setState({ error: "Please enter  name" }, () => this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.phone === "") {
      this.setState({ error: "Please enter  phone number" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.email === "") {
      this.setState({ error: "Please enter email" }, () => this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.dob === "") {
      this.setState({ error: "Please the date of birth" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.phone.length !== 10) {
      this.setState({ error: "Number should be 10 digits" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }

    if (this.state.username === "") {
      this.setState({ error: "Empty Username" }, () => this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.password === "") {
      this.setState({ error: "Empty Password" }, this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ error: "Password did not match" }, this.dismissError());
      return false;
    }
    return true;
  };
  render() {
    return (
      <div className="maincontainer">
        <div className="container d-flex justify-content-center mt-4 mb-4 ">
          <Card className="w-50">
            <Card.Title className="pl-3 pt-3 pb-0 text-primary">
              Edit Details
            </Card.Title>
            <Card.Body>
              <Form>
                <div>
                  {this.state.error !== "" ? (
                    <Alert
                      variant="danger"
                      onClose={() => this.setState({ error: "" })}
                      dismissible
                    >
                      <p className="mb-0">{this.state.error}</p>
                    </Alert>
                  ) : (
                    ""
                  )}
                </div>
                <Form.Group as={Row} controlId="name">
                  <Form.Label column sm={3}>
                    Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="phone">
                  <Form.Label column sm={3}>
                    Phone
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={this.state.phone}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      placeholder="Phone"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="address">
                  <Form.Label column sm={3}>
                    Address
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="dob">
                  <Form.Label column sm={3}>
                    DOB
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={this.state.dob}
                      placeholder="dob"
                      onChange={(e) => this.setState({ dob: e.target.value })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="email">
                  <Form.Label column sm={3}>
                    Email
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="email"
                      name="email"
                      value={this.state.email}
                      placeholder="Email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="profile">
                  <Form.Label column sm={3}>
                    Profile
                  </Form.Label>
                  <Col sm={9}>
                    <Form.File
                      id="profile"
                      name="profile"
                      onChange={(e) =>
                        this.setState({ profile: e.target.files[0] })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="role">
                  <Form.Label column sm={3}>
                    Role
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="select"
                      onChange={(e) => this.setState({ role: e.target.value })}
                    >
                      <option selected="selected">Admin</option>
                      <option>Customer</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="username">
                  <Form.Label column sm={3}>
                    Username
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      placeholder="Username"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                  <Form.Label column sm={3}>
                    Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="confirmpassword">
                  <Form.Label column sm={3}>
                    Confirm Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={this.state.confirmpassword}
                      onChange={(e) =>
                        this.setState({ confirmpassword: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer className="">
              <Link to="/admin/users">
                <Button className="" variant="secondary">
                  Close
                </Button>
              </Link>
              {/* <Link to="/admin/users"> */}
              <Button
                className="float-right"
                onClick={this.sendUserData}
                style={{
                  backgroundColor: this.state.success ? "Green" : "blue",
                }}
              >
                {this.state.success ? "Added" : "Add"}
              </Button>
              {/* </Link> */}
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}
export default AddUser;
