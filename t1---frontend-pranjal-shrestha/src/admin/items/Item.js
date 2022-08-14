import { Component } from "react";
import Nav from "../nav/Nav";
import axios from "axios";
import "../home/dashboard.css";
import { Alert, Card, Form, Row, Col, Button, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "./item.css";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
class Item extends Component {
  state = {
    itemName: "",
    itemCategory: "",
    itemPrice: "",
    itemImage: "",
    id: this.props.match.params.id,
    showUpdate: false,
    showDelete: false,
    error: "",
    items: [],
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
    this.setState({
      id: data._id,
      itemName: data.itemName,
      itemCategory: data.itemCategory,
      itemPrice: data.itemPrice,
      itemImage: data.itemImage,
      showUpdate: true,
    });
  }
  // delete item
  deleteItem = () => {
    axios
      .delete(
        `http://localhost:5000/items/delete/${this.state.id}`,
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
      .get("http://localhost:5000/items")
      .then((response) => {
        console.log(response);
        this.setState({
          items: response.data.items,
        });
      })
      .catch((err) => console.log(err.response));
    //initialize datatable
    setTimeout(() => {
      $(document).ready(function () {
        $("#itemTable").DataTable({
          scrollY: "500px",
          scrollCollapse: true,
        });
      });
    }, 500);
    axios
      .get(`http://localhost:5000/currentItem/${this.state.id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          itemName: response.data.itemName,
          itemPrice: response.data.itemPrice,
          itemCategory: response.data.itemCategory,
          itemImage: response.data.itemImage,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  updateItem = async (e) => {
    e.preventDefault();
    try {
      if (!this.validate()) return;
      const data = new FormData();
      data.append("itemName", this.state.itemName);
      data.append("itemCategory", this.state.itemCategory);
      data.append("itemPrice", this.state.itemPrice);
      data.append("itemImage", this.state.itemImage);
      const response = await axios.put(
        `http://localhost:5000/items/update/${this.state.id}`,
        data,
        this.state.config
      );
      console.log(response);
      window.location.reload();
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
  dismissError = () => {
    window.setTimeout(() => {
      this.setState({ error: "" });
    }, 2000);
  };
  // validation
  validate = () => {
    if (this.state.itemName === "") {
      this.setState({ error: "Enter the Item Name" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.itemCategory === "") {
      this.setState({ error: "Enter item category" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }

    if (this.state.itemPrice === "") {
      this.setState({ error: "Fill the Price" }, () => this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.itemImage === "") {
      this.setState({ error: "Add image file" }, () => this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }

    return true;
  };
  render() {
    return (
      <div className="main" style={{ overflowX: "hidden" }}>
        <div className="navigation">
          <Nav></Nav>
        </div>
        <div
          className="main-container w-75"
          style={{ position: "absolute", marginLeft: "22%", top: "12%" }}
        >
          <div className="container-fluid w-100">
            <div className="item-datatable mt-2 w-100">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <p className="d-inline ">
                    <i className="fas fa-table mr-1"></i>
                    Items
                  </p>
                  <Link to="/admin/additem">
                    <button className="btn btn-sm btn-info p-1 mb-2 float-right">
                      Add Item
                    </button>
                  </Link>
                </div>
                <div className="card-body p-1">
                  <div className="table-responsive ">
                    <table
                      id="itemTable"
                      className=" table table-sm table-striped "
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th className="th-sm">Image</th>
                          <th className="th-sm">Name</th>
                          <th className="th-sm">Category</th>
                          <th className="th-sm">Price</th>
                          <th className="th-sm">Action</th>
                        </tr>
                      </thead>
                      <tbody styel={{ height: "200px", overflowY: "auto" }}>
                        {this.state.items.map((item) => {
                          return (
                            <tr>
                              <td className="text-center">
                                <img
                                  src={`http://localhost:5000/${item.itemImage}`}
                                  style={{ width: "48px", height: "48px" }}
                                ></img>
                              </td>
                              <td>{item.itemName}</td>
                              <td>{item.itemCategory}</td>
                              <td>{item.itemPrice}</td>
                              <td>
                                <div>
                                  {/* <Link to={`/admin/itemupdate/${item._id}`}> */}
                                  <button
                                    className="btn btn-sm rounded-pill edit"
                                    onClick={() => this.ShowUpdateModal(item)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  {/* </Link> */}
                                  <button
                                    className="btn btn-sm rounded-pill delete"
                                    onClick={() => this.showDeleteModal(item)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                      <Form.Group as={Row} controlId="itemName">
                        <Form.Label column sm={3}>
                          Name
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            value={this.state.itemName}
                            name="itemName"
                            onChange={(e) =>
                              this.setState({ itemName: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="itemCategory">
                        <Form.Label column sm={3}>
                          Category
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            name="itemCategory"
                            value={this.state.itemCategory}
                            onChange={(e) =>
                              this.setState({ itemCategory: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="address">
                        <Form.Label column sm={3}>
                          Price
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            value={this.state.itemPrice}
                            name="itemPrice"
                            onChange={(e) =>
                              this.setState({ itemPrice: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} controlId="itemImage">
                        <Form.Label column sm={3}>
                          Image
                        </Form.Label>
                        <Col sm={9}>
                          <Form.File
                            id="itemImage"
                            name="itemImage"
                            onChange={(e) =>
                              this.setState({ itemImage: e.target.files[0] })
                            }
                          />
                        </Col>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => this.handleClose()}
                    >
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.updateItem}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* delete modal */}
                <Modal
                  show={this.state.showDelete}
                  onHide={() => this.deleteClose()}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete?</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => this.deleteClose()}
                    >
                      Close
                    </Button>
                    <Button variant="danger" onClick={this.deleteItem}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Item;
