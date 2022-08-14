import { Component } from "react";
import { MDBBtn, MDBCollapse, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
class Order extends Component {
  state = {
    collapseID: "",
    order: [],
    user: JSON.parse(localStorage.getItem("user")),
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    loading: true,
  };

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };
  componentDidMount() {
    const userId = this.state.user._id;

    axios
      .get("http://localhost:5000/order/getorder/" + userId, this.state.config)
      .then((response) => {
        console.log(response.data.data.orderItem);
        this.setState(
          {
            order: response.data.data.orderItem,
          },
          () => {
            this.setState({ loading: false });
          }
        );
      })
      .catch((err) => console.log(err));
    // console.log(this.state.order);
  }

  render() {
    console.log(this.state.order);
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    return (
      <div className="mainContainer ">
        <MDBCol size="3">
          <MDBBtn
            color="primary"
            onClick={this.toggleCollapse("basicCollapse")}
            style={{ marginBottom: "1rem" }}
          >
            COLLAPSE BUTTON
          </MDBBtn>
          <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
            <div className="row text-center">
              <div className="col-md-5 p-1">
                <small className="font-weight-bold">Name</small>
              </div>
              <div className="col-md-3 p-1">
                <small className="font-weight-bold">Qty</small>
              </div>
              <div className="col-md-4 p-1">
                <small className="font-weight-bold">Price</small>
              </div>
            </div>
            {this.state.order.map((items) => {
              return (
                <div className="row p-0 text-center">
                  <div className="col-md-5 p-0">
                    <small className="text-muted">
                      {items.product.itemName}
                    </small>
                  </div>
                  <div className="col-md-3 p-0">
                    <small className="text-muted">{items.quantity}</small>
                  </div>
                  <div className="col-md-4 p-0">
                    <small className="text-muted">
                      {items.product.itemPrice}
                    </small>
                  </div>
                </div>
              );
            })}
          </MDBCollapse>
        </MDBCol>
        );
        {/* <div className="container ">
          <div className="orders mb-3">
            <div className="order mt-2">
              <div className="row row-cols-1  row-cols-md-4 g-4">
                {this.state.order.map((order) => {
                  return (
                    <div
                      class="card bg-outlined-success m"
                      style={{ width: "200px" }}
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
                              <small className="font-weight-bold">Qty</small>
                            </div>
                            <div className="col-md-4 p-1">
                              <small className="font-weight-bold">Price</small>
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
                                    {items.product.itemPrice}
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
          <MDBRow>
            {this.state.order.map((order) => {
              return (
                <MDBCol size="3">
                  <MDBBtn
                    color="primary"
                    onClick={this.toggleCollapse("basicCollapse")}
                    style={{ marginBottom: "1rem" }}
                  >
                    COLLAPSE BUTTON
                  </MDBBtn>
                  <MDBCollapse
                    id="basicCollapse"
                    isOpen={this.state.collapseID}
                  >
                    <div className="row text-center">
                      <div className="col-md-5 p-1">
                        <small className="font-weight-bold">Name</small>
                      </div>
                      <div className="col-md-3 p-1">
                        <small className="font-weight-bold">Qty</small>
                      </div>
                      <div className="col-md-4 p-1">
                        <small className="font-weight-bold">Price</small>
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
                              {items.product.itemPrice}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </MDBCollapse>
                </MDBCol>
              );
            })}
          </MDBRow>
        </div> */}
      </div>
    );
  }
}
export default Order;
