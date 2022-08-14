import { Component } from "react";
import { extend } from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

class UpdateUser extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    email: "",
    dob: "",
    role: "",
    profile: "",
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/user/get", this.state.config)
      .then((response) => {
        console.log(response.data);
        this.setState({
          id: response.data.user._id,
          name: response.data.user.name,
          phone: response.data.user.phone,
          address: response.data.user.address,
          role: response.data.user.role,
          email: response.data.user.email,
          dob: response.data.user.dob,
          profile: response.data.user.profile,
        });
      })
      .catch((err) => console.log(err));
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  updateUser = (e) => {
    e.preventDefault();
    const fd = new FormData();
    console.log(this.state.role);
    fd.append("name", this.state.name);
    fd.append("phone", this.state.phone);
    fd.append("address", this.state.address);
    fd.append("role", this.state.role);
    fd.append("email", this.state.email);
    fd.append("dob", this.state.dob);
    fd.append("profile", this.state.profile);
    console.log(fd);
    axios
      .put(`http://localhost:5000/user/updateRegister/${this.state.id}`, fd)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.response));
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
                <Form.Group as={Row} controlId="role">
                  <Form.Label column sm={3}>
                    Role
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control as="select" value={this.state.role}>
                      <option>Admin</option>
                      <option>Customer</option>
                    </Form.Control>
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

                {/*<Form.Group as={Row} controlId="password">
                  <Form.Label column sm={3}>
                    Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      value={this.state.user.password}
                      placeholder="Password"
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
                    />
                  </Col>
                </Form.Group> */}
              </Form>
            </Card.Body>
            <Card.Footer className="">
              <Link to="./profile">
                <Button className="" variant="secondary">
                  Close
                </Button>
              </Link>
              {/* <Link to="./profile"> */}
              <Button
                className="float-right"
                onClick={this.updateUser}
                variant="primary"
              >
                Update
              </Button>
              {/* </Link> */}
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}
export default UpdateUser;
