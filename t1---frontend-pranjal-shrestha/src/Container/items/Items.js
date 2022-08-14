import axios from "axios";
import { Component } from "react";
import "./items.css";
import { Link } from "react-router-dom";
import { Nav, Col, Row, Tab, TabPane } from "react-bootstrap";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
      items: [],
      config: {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    };
  }
  handleClick() {
    this.setState({
      button: !this.state.button,
    });
  }
  componentDidMount() {
    console.log(this.state.items._id);
    axios
      .get("http://localhost:5000/items")
      .then((response) => {
        console.log(response);
        this.setState({
          items: response.data.items,
        });
      })
      .catch((err) => console.log(err.response));
  }
  // delete item
  deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/items/delete/${itemId}`, this.state.config)
      .then((response) => {
        console.log(response.data.message);
        const newItems = this.state.items.filter((item) => item._id != itemId);
        console.log(newItems);
        this.setState({ items: newItems });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  // add to cart
  addtocart = (item) => {
    const send = {
      cartItems: {
        product: item._id,
        quantity: 1,
      },
    };
    axios
      .post(`http://localhost:5000/cart/addtocart`, send, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  getFurniture = () => {
    const allItems = this.state.items;
    const furniture = allItems.filter(
      (item) =>
        item.itemCategory == "Furniture" || item.itemCategory == "furniture"
    );
    return furniture;
  };
  getCurtain = () => {
    const allItems = this.state.items;
    const curtain = allItems.filter(
      (item) =>
        item.itemCategory == "Curtain" || item.itemCategory == "Curtain"
    );
    return curtain;
  };
  getCarpet = () => {
    const allItems = this.state.items;
    const carpet = allItems.filter(
      (item) => item.itemCategory == "Carpet" || item.itemCategory == "carpet"
    );
    return carpet;
  };
  getLight = () => {
    const allItems = this.state.items;
    const light = allItems.filter(
      (item) => item.itemCategory == "Light" || item.itemCategory == "light"
    );
    return light;
  };
  getTile = () => {
    const allItems = this.state.items;
    const tile = allItems.filter(
      (item) =>
        item.itemCategory == "Tile" || item.itemCategory == "tile"
    );
    return tile;
  };
  active = "nav-item active font-weight-bold change-color";
  notactive = "nav-item";
  render() {
    return (
      <div className="maincontainer">
        <div className="menu-banner mb-5">
          <h1 className="text-center text-white pt-5">
            Your personality, Our expertise.
          </h1>
        </div>
        <div className="container">
          <div className="menu-details mb-5">
            <div className="menu-heading mb-5">
              <h4 className="text-center"> Discover</h4>
              <h1 className="text-center text-dark ">Our Category</h1>
            </div>
            <Tab.Container
              id="left-tabs-example justify-content-middle"
              defaultActiveKey="first"
            >
              <Row>
                <Col sm={12}>
                  <Nav variant="pills" className="flex-column">
                    <Row className="text-center">
                      <Col sm={2} className="pb-1">
                        <Nav.Item>
                          <Nav.Link eventKey="first">All Products</Nav.Link>
                        </Nav.Item>
                      </Col>
                      <Col sm={2} className="pb-1">
                        <Nav.Item>
                          <Nav.Link eventKey="second">Lights</Nav.Link>
                        </Nav.Item>
                      </Col>
                      <Col sm={2} className="pb-1">
                        <Nav.Item>
                          <Nav.Link eventKey="third">Carpets</Nav.Link>
                        </Nav.Item>
                      </Col>
                      <Col sm={2} className="pb-1">
                        <Nav.Item>
                          <Nav.Link eventKey="fourth">Furnitures</Nav.Link>
                        </Nav.Item>
                      </Col>
                      <Col sm={2} className="pb-1">
                        <Nav.Item>
                          <Nav.Link eventKey="fifth">Tiles</Nav.Link>
                        </Nav.Item>
                      </Col>
                      <Col sm={2} className="pb-1">
                        <Nav.Item>
                          <Nav.Link eventKey="sixth">Curtains</Nav.Link>
                        </Nav.Item>
                      </Col>
                    </Row>
                  </Nav>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Food
                        addToCart={this.addtocart}
                        items={this.state.items}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Food
                        addToCart={this.addtocart}
                        items={this.getLight()}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Food addToCart={this.addtocart} items={this.getCarpet()} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <Food
                        addToCart={this.addtocart}
                        items={this.getFurniture()}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                      <Food
                        addToCart={this.addtocart}
                        items={this.getTile()}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth">
                      <Food
                        addToCart={this.addtocart}
                        items={this.getCurtain()}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            <div className="menu-tabs mb-5"></div>
          </div>
        </div>
      </div>
    );
  }
}

function Food({ items, addToCart }) {
  return (
    <div className="item-details">
      <div className="menu mt-2">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {items.map((item) => {
            return (
              <div className="col mt-3 mb-3">
                <div className="card h-100">
                  <img
                    src={`http://localhost:5000/${item.itemImage}`}
                    className="card-img-top item-image"
                    alt="..."
                  />
                  <div className="card-body p-2">
                    <h5 className="card-title d-inline">{item.itemName}</h5>
                    <p className="card-text float-right">
                      Rs. {item.itemPrice}
                    </p>
                    <a
                      href="./cart"
                      className="btn w-100 order-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Items;
