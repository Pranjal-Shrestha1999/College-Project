import { extend } from "jquery";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardGroup, Row, Col } from "react-bootstrap";
import "./profile.css";
class Profile extends Component {
  state = {
    user: [],
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/user/get", this.state.config)
      .then((response) => {
        console.log(response.data);
        this.setState({ user: response.data.user });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="maincontainer">
        <div className="container mt-5 mb-3">
          <CardGroup style={{ border: "none" }}>
            <Card style={{ width: "400px", height: "400px", border: "none" }}>
              <Card.Img
                variant="top"
                style={{ width: "400px", height: "400px" }}
                className="profile-image"
                src={`http://localhost:5000/${this.state.user.profile}`}
              />
            </Card>
            <Card style={{ border: "none" }}>
              <Row className="mb-2 pl-3 pt-2">
                <Col md={9}>
                  <Card.Title className=" profile-name pb-0 mb-0">
                    {this.state.user.name}
                  </Card.Title>
                  <small className="text-muted ">{this.state.user.email}</small>
                </Col>
                <Col md={3}>
                  <Link to="./editprofile">
                    <button className="btn btn-sm btn-primary btn-edit ">
                      Edit Profile
                    </button>
                  </Link>
                </Col>
              </Row>

              <Card.Body className="pt-0 ">
                <Card.Title className="mb-3 about-profile-text">
                  About
                </Card.Title>
                <Card.Body className="text-left p-0">
                  <Row className="mb-2">
                    <Col className="user-tag">UserId</Col>
                    <Col className="user-info">{this.state.user.username}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="user-tag">Name</Col>
                    <Col className="user-info">{this.state.user.name}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="user-tag">Email</Col>
                    <Col className="user-info">{this.state.user.email}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="user-tag">Address</Col>
                    <Col className="user-info">{this.state.user.address}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="user-tag">Phone Number</Col>
                    <Col className="user-info">{this.state.user.phone}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col className="user-tag">Date of Birth</Col>
                    <Col className="user-info">{this.state.user.dob}</Col>
                  </Row>
                </Card.Body>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default Profile;
