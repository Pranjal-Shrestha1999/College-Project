import { Component } from "react";
import { Alert, Card, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
class AddItem extends Component {
  state = {
    itemName: "",
    itemCategory: "",
    itemPrice: "",
    itemImage: "",
    success: false,
    error: "",
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  // add item
  sendItemData = async (e) => {
    e.preventDefault();
    try {
      if (!this.validate()) return;
      const data = new FormData();
      data.append("itemName", this.state.itemName);
      data.append("itemCategory", this.state.itemCategory);
      data.append("itemPrice", this.state.itemPrice);
      data.append("itemImage", this.state.itemImage);
      const response = await axios.post(
        "http://localhost:5000/items/insert",
        data,
        this.state.config
      );
      console.log(response);
      this.setState({
        success: true,
        itemName: "",
        itemCategory: "",
        itemPrice: "",
        itemImage: "",
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
      <div className="maincontainer">
        <div
          className="container d-flex justify-content-center mt-4 mb-4 "
          id="additem"
        >
          <Card className="w-50 shadow-sm">
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
            </Card.Body>
            <Card.Footer>
              <Link to="/admin/items">
                <Button className="" variant="secondary">
                  Close
                </Button>
              </Link>
              {/* <Link to="./profile"> */}
              <Button
                className="float-right"
                onClick={this.sendItemData}
                variant="primary"
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
export default AddItem;
