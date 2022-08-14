import { Component } from "react";
import Nav from "../nav/Nav";
import { Alert, Card, Form, Row, Col, Button, Modal } from "react-bootstrap";

import axios from "axios";
import "../home/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "./user.css";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
class User extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    email: "",
    dob: "",
    id: "",
    role: "",
    profile: "",
    showUpdate: false,
    showDelete: false,
    users: [],
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  handleClose() {
    this.setState({ showUpdate: false });
  }
  deleteClose() {
    this.setState({ showDelete: false });
  }
  showDeleteModal(data) {
    this.setState({
      id: data._id,
      showDelete: true,
    });
  }

  ShowUpdateModal(data) {
    console.log(data._id);
    this.setState({
      id: data._id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      role: data.role,
      email: data.email,
      dob: data.dob,
      profile: data.profile,
      showUpdate: true,
    });
  }
  // delete user
  deleteUser = () => {
    console.log(this.state.id);
    axios
      .delete(
        `http://localhost:5000/user/deleteRegister/${this.state.id}`,
        this.state.config
      )
      .then((response) => {
        console.log(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
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
    axios
      .get("http://localhost:5000/user/getall", this.state.config)
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
        });
      })
      .catch((err) => console.log(err.response));
    //initialize datatable
    setTimeout(() => {
      $(document).ready(function () {
        $("#example").DataTable({
          scrollY: "500px",
          scrollX: true,
          scrollCollapse: true,
        });
      });
    }, 800);
  }
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
        window.location.reload();
      })
      .catch((error) => console.log(error.response));
  };
  render() {
    return (
      <div className="main" style={{ overflowX: "hidden" }}>
        <div className="navigation">
          <Nav></Nav>
        </div>
        <div
          className="main-container w-75"
          style={{ position: "absolute", marginLeft: "22%", top: "14%" }}
        >
          <div className="container-fluid w-100">
            <div className="user-datatable mt-2 w-100">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <p className="d-inline ">
                    <i className="fas fa-user mr-1"></i>
                    Users
                  </p>
                  <Link to="/admin/adduser">
                    <button className="btn btn-sm btn-info p-1 mb-2 float-right">
                      Add User
                    </button>
                  </Link>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table table-striped "
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th className="th-sm">Image</th>
                          <th className="th-sm">Name</th>
                          <th className="th-sm">Address</th>
                          <th className="th-sm">Email</th>
                          <th className="th-sm">Role</th>
                          <th className="th-sm">Phone</th>
                          <th className="th-sm">DOB</th>
                          <th className="th-sm">Username</th>
                          <th className="th-sm">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((user) => {
                          return (
                            <tr>
                              <td className="text-center">
                                <img
                                  src={`http://localhost:5000/${user.profile}`}
                                  style={{ width: "48px", height: "48px" }}
                                ></img>
                              </td>
                              <td>{user.name}</td>
                              <td>{user.address}</td>
                              <td>{user.email}</td>

                              <td>{user.role}</td>
                              <td>{user.phone}</td>
                              <td>{user.dob}</td>
                              <td>{user.username}</td>
                              <td>
                                <div>
                                  <button
                                    className="btn btn-sm rounded-pill edit"
                                    onClick={() => this.ShowUpdateModal(user)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm rounded-pill delete"
                                    onClick={this.showDeleteModal.bind(
                                      this,
                                      user
                                    )}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="th-sm">Image</th>
                          <th className="th-sm">Name</th>
                          <th className="th-sm">Address</th>
                          <th className="th-sm">Email</th>
                          <th className="th-sm">Role</th>
                          <th className="th-sm">Phone</th>
                          <th className="th-sm">DOB</th>
                          <th className="th-sm">Username</th>
                          <th className="th-sm">Action</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              show={this.state.showUpdate}
              onHide={() => this.handleClose()}
            >
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
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
                        onChange={(e) =>
                          this.setState({ phone: e.target.value })
                        }
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
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
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
                        onChange={(e) =>
                          this.setState({ role: e.target.value })
                        }
                      >
                        <option>Admin</option>
                        <option>Customer</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="username">
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
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleClose()}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.updateUser}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.showDelete}
              onHide={() => this.deleteClose()}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.deleteClose()}>
                  Close
                </Button>
                <Button variant="danger" onClick={this.deleteUser}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
