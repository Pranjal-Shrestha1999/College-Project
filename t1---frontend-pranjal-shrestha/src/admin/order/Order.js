import { Component } from "react";
import Nav from "../nav/Nav";

import axios from "axios";
import { Link } from "react-router-dom";
import { Phone } from "@material-ui/icons";


class Order extends Component {
  state = {
    order: [],
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/orders", this.state.config)
      .then((response) => {
        console.log(response.data.order);
        this.setState({
          order: response.data.order,
        });
      })
      .catch((err) => console.log(err.response));
    // console.log(this.state.order);
  }
  render() {
    return (
      <div className="maincontainer">
        <div className="navigation">
          <Nav></Nav>
        </div>
        <div
          className="main-container"
          style={{ position: "absolute", marginLeft: "22%", top: "14%" }}
        >
          <div className="container-fluid">
            <div className="orders  ">
              <div class="card-columns">
                {this.state.order.map((order) => {
                  return (
                    <div
                      class="card bg-outline-success"
                      style={{ width: "300px" }}
                    >
                      <div class="card-body pt-1">
                        <h5 class="card-title m-0 text-center">
                          {order.user.name}
                          
                        </h5>
                        <p class="card-text">
                          <div className="row text-center">
                            <div className="col-md-5 p-1">
                              <small className="font-weight-bold">Name</small>
                            </div>
                            <div className="col-md-3 p-1">
                              <small className="font-weight-bold">Quantity</small>
                            </div>
                            <div className="col-md-4 p-1">
                              <small className="font-weight-bold">Total Price</small>
                            </div>
                          </div>
                          {order.orderItem.map((items) => {
                            return (
                              <div className="row p-0 text-center">
                                <div className="col-md-5 p-0">
                                  <small className="text-muted">
                                    {items.product.itemName}
                                  </small>
                                </div>
                                <div className="col-md-3 p-0">
                                  <small className="text-muted">
                                    {items.quantity}
                                  </small>
                                </div>
                                <div className="col-md-4 p-0">
                                  <small className="text-muted">
                                    {items.product.itemPrice*items.quantity}
                                    
                                    
                                  </small>
                                </div>
                              </div>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Order;
