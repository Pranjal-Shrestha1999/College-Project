import { Component } from "react";
import axios from "axios";
import "./cart.css";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = {
    cartItems: [],
    quantity: 0,
    success: false,
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    totalPrice: 0,
    token: localStorage.getItem("token"),
  };

  componentDidMount() {
    console.log(this.state.cartItems.quantity);

    axios
      .get("http://localhost:5000/cart/getItems", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        this.setState(
          {
            cartItems: response.data.cart.cartItems,
          },
          () => this.setState({ totalPrice: this.calculateTotal() })
        );
      })
      .catch((err) => console.log(err.response));
  }
  calculateTotal = () => {
    let totalPrice = 0;
    this.state.cartItems.forEach((items) => {
      var p = items.quantity * items.product.itemPrice;
      totalPrice += p;
    });
    return totalPrice;
  };

  // add to order
  postOrder = () => {
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user)._id;
    console.log(userId);
    const oi = this.state.cartItems.map((items, index) => {
      return {
        product: items.product._id,
        quantity: items.quantity,
      };
    });
    const send = {
      user: JSON.parse(user)._id,
      orderItem: oi,
    };
    axios
      .post(`http://localhost:5000/order/addorder`, send, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({
          success: true,
        });
        setTimeout(() => {
          this.setState({ success: false });
        }, 2000);
        console.log("added to order");
      })
      .catch((err) => {
        console.log(err.response);
      });
    // const removeCart = [];
    axios
      .delete(" http://localhost:5000/cart/emptyCart/" + userId, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  addtocart = (item) => {
    const send = {
      cartItems: {
        product: item.product._id,
        quantity: 1,
      },
    };
    axios
      .post(`http://localhost:5000/cart/addtocart`, send, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  decreasefromcart(item) {
    const productId = item.product._id;
    console.log();
    var data = {
      cartItems: {
        product: item.product._id,
        quantity: item.quantity,
      },
    };

    axios
      .put("http://localhost:5000/cart/minusItem/" + productId, data, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  deletefromcart(item) {
    const productId = item;
    console.log(productId);
    // console.log("Bearer" + localStorage.getItem("token"));
    var data = {};

    axios
      .put("http://localhost:5000/cart/removeItem/" + productId, data, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  render() {
    return (
      <div className="main container">
        {this.state.token === null ? (
          <div
            className="container text-center mb-5"
            style={{ height: "50vh" }}
          >
            {" "}
            <div className="pt-5 no-item-cart">
              {/* <h1 style={{ color: "orange" }}>Oops!!!</h1> */}
              <h2>You are not logged in</h2>
              <Link to="./login">
                <button
                  className="btn  p-2 rounded-pill "
                  style={{ width: "250px" }}
                >
                  <h4
                    className="mb-0"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      backgroundColor: "",
                    }}
                  >
                    Login
                  </h4>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            {this.state.cartItems.length !== 0 ? (
              <div className="row">
                <div className="col-lg-8">
                  <div className="card wishlist mb-3 mt-3">
                    <div className="card-body p-2">
                      <h5 className="mb-4">Cart</h5>
                      {this.state.cartItems.map((item) => {
                        {
                          console.log(item.product.itemImage);
                        }
                        return (
                          <div className="row mb-4">
                            <div className="col-md-5 col-lg-3 col-xl-3">
                              <div className="item-img view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                <img
                                  className="img-fluid w-100"
                                  src={`http://localhost:5000/${item.product.itemImage}`}
                                  alt="product"
                                />
                              </div>
                            </div>
                            <div className="col-md-7 col-lg-9 col-xl-9">
                              <div>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h5>{item.product.itemName}</h5>
                                    <p className="mb-2 text-muted text-uppercase small">
                                      Category - {item.product.itemCategory}
                                    </p>
                                    <p className="mb-2 text-muted text-uppercase small">
                                      Price (each) - Rs.{" "}
                                      {item.product.itemPrice}
                                    </p>
                                  </div>
                                  <div className="pl-5">
                                    <div className="mb-0 w-50 d-flex float-right">
                                      <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={this.decreasefromcart.bind(
                                          this,
                                          item
                                        )}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <input
                                        className="quantity text-center w-75 "
                                        min="0"
                                        value={item.quantity}
                                        type="Number"
                                      />
                                      <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => this.addtocart(item)}
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <button
                                      className="btn btn-sm btn-primary rounded-pill  mr-3"
                                      type="submit"
                                      onClick={this.deletefromcart.bind(
                                        this,
                                        item.product._id
                                      )}
                                    >
                                      <i className="fas fa-trash-alt mr-1"></i>{" "}
                                      Remove item{" "}
                                    </button>
                                  </div>
                                  <p className="mb-0">
                                    <span>
                                      <strong>
                                        Rs.
                                        {item.product.itemPrice * item.quantity}
                                      </strong>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <hr className="mb-4"></hr>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mb-3 mt-3">
                    <div className="card-body">
                      <h5 className="mb-3">Grand Total</h5>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>The total amount of</strong>
                          </div>
                          <span>
                            <strong>Rs. {this.state.totalPrice}</strong>
                          </span>
                        </li>
                      </ul>

                      <button
                        type="button"
                        onClick={() => this.postOrder()}
                        className="btn btn-primary btn-block waves-effect waves-light"
                        style={{
                          backgroundColor: this.state.success
                            ? "Green"
                            : "btn-primary",
                        }}
                      >
                        {this.state.success ? "Order Placed" : "Confirm Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="container text-center mb-5"
                style={{ height: "50vh" }}
              >
                {" "}
                <div className="pt-5 no-item-cart">
                  {/* <h1 style={{ color: "orange" }}>Oops!!!</h1> */}
                  <h2>No items in the cart</h2>
                  <Link to="./menu">
                    <button
                      className="btn  p-2 rounded-pill "
                      style={{ width: "250px" }}
                    >
                      <h4
                        className="mb-0"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          backgroundColor: "",
                        }}
                      >
                        Order Now
                      </h4>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Cart;
