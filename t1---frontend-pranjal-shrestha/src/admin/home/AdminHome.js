import React from "react";
import { Component } from "react";
import Nav from "../nav/Nav";
import "./dashboard.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
class AdminHome extends Component {
  state = {
    items: [],
    users: [],
    order: [],
    admin: 0,
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  countAdmin() {
    var admin = 0;
    this.state.users.forEach((user) => {
      if (user.role === "Admin") {
        admin += 1;
      }
      console.log(admin);
    });
    return admin;
  }
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
    axios
      .get("http://localhost:5000/orders", this.state.config)
      .then((response) => {
        console.log(response);
        this.setState({
          order: response.data.order,
        });
      })
      .catch((err) => console.log(err.response));
    axios
      .get("http://localhost:5000/user/getall", this.state.config)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            users: response.data,
          },
          () => this.setState({ admin: this.countAdmin() })
        );
      })
      .catch((err) => console.log(err.response));
    //initialize datatable
    setTimeout(() => {
      $(document).ready(function () {
        $("#example").DataTable({
          scrollY: "500px",
          scrollCollapse: true,
        });
      });
    });
  }
  render() {
    return (
      <div className="mainContainer" style={{ overflowX: "hidden" }}>
        <div className="navigation">
          <Nav></Nav>
        </div>
        <div
          className="main-container"
          style={{ position: "absolute", marginLeft: "22%", top: "14%" }}
        >
          <div className="container-fluid">
            <div className="dashboard-header  ">
              <div className="card-deck ">
                <div
                  className="card bg-info text-light"
                  style={{ width: "620px" }}
                >
                  <div className="card-body p-3 pl-5 justify-content-center">
                    <div className="row">
                      <div className="col-md-4 p-0 ">
                        <h3 className="card-title p-0 mb-0">
                          {this.state.items.length}
                        </h3>
                      </div>
                      <div className="col-md-8 p-0">
                        <div className="row">
                          <h5 className="card-title p-0 mb-0">Items</h5>
                        </div>
                        <div className="row ">
                          <a className="card-text " href="/admin/items">
                            <small className="text-light">view all...</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card bg-secondary text-light"
                  style={{ width: "220px" }}
                >
                  <div className="card-body p-3 pl-5 justify-content-center">
                    <div className="row">
                      <div className="col-md-4 p-0">
                        <h3 className="card-title p-0 mb-0">
                          {this.state.users.length - this.state.admin}
                        </h3>
                      </div>
                      <div className="col-md-8 p-0">
                        <div className="row">
                          <h5 className="card-title p-0 mb-0">Users</h5>
                        </div>
                        <div className="row ">
                          <a className="card-text " href="/admin/users">
                            <small className="text-light ">view all...</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card bg-success text-light"
                  style={{ width: "220px" }}
                >
                  <div className="card-body p-3 pl-5 justify-content-center">
                    <div className="row">
                      <div className="col-md-4 p-0">
                        <h3 className="card-title p-0 mb-0">
                          {this.state.order.length}
                        </h3>
                      </div>
                      <div className="col-md-8 p-0">
                        <div className="row">
                          <h5 className="card-title p-0 mb-0">Order</h5>
                        </div>
                        <div className="row ">
                          <a className="card-text " href="/admin/orders">
                            <small className="text-light ">view all...</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<div
                  className="card bg-dark text-light"
                  style={{ width: "220px" }}
                >
                  <div className="card-body p-3 pl-5 justify-content-center">
                    <div className="row">
                      <div className="col-md-4 p-0">
                        <h3 className="card-title p-0 mb-0">
                          {this.state.admin}
                        </h3>
                      </div>
                       <div className="col-md-8 p-0">
                        <div className="row">
                          <h5 className="card-title p-0 mb-0">Employees</h5>
                        </div>
                        <div className="row ">
                          <a className="card-text " href="/admin/users">
                            <small className="text-light ">view all...</small>
                          </a>
                        </div>
    </div>
                    </div>
                  </div>
    </div> */}
              </div>
            </div>
            <div className="datatable mt-5">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <p className="d-inline ">
                    <i className="fas fa-table mr-1"></i>
                    Items
                  </p>
                  <Link to="/admin/items">
                    <button className="btn btn-sm btn-info p-1 mb-2 float-right">
                      View more
                    </button>
                  </Link>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table table-striped table-bordered table-fixed"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th className="th-sm">Image</th>
                          <th className="th-sm">Name</th>
                          <th className="th-sm">Category</th>
                          <th className="th-sm">Price</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
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
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="th-sm">Image</th>
                          <th className="th-sm">Item Name</th>
                          <th className="th-sm">Item Category</th>
                          <th className="th-sm">Item Price</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminHome;
