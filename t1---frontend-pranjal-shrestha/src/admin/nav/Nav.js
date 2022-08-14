import { Component } from "react";
import React from "react";
import axios from "axios";

import { Navbar, Form, Button, FormControl } from "react-bootstrap";
import {
  CDBNavbarNav,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { CDBNavItem, CDBBtn, CDBIcon, CDBNavLink } from "cdbreact";
import { NavLink } from "react-router-dom";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
      user: [],
      item: [],
      width: "200px",
      config: {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    };
  }

  logout = () => {
    window.localStorage.clear();

    console.log("token removed");
  };
  componentDidMount() {
    console.log(this.state.user.name);
    axios
      .get("http://localhost:5000/user/get", this.state.config)
      .then((response) => {
        console.log(response.data);
        this.setState(
          { user: response.data.user }
          // () => {
          // if (this.state.user.name.length < 9) {
          //   this.setState({ width: "150px" });
          // }
          // }
        );
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <div className="topnav">
          <nav
            class=" navbar navbar-dark bg-dark float-right w-100"
            style={{ height: "60px", position: "absolute" }}
          >
            <a class="navbar-brand"> </a>
            <ul>
              <li className="nav-item profile dropdown">
                <a
                  className="nav-link pt-0"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                >
                  <img
                    src={`http://localhost:5000/${this.state.user.profile}`}
                    className="rounded-circle header-profile-img"
                  />
                  <span className="pl-2 text-light">
                    {this.state.user.name}
                  </span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/">
                    <i className="fa fa-home pr-3"></i>
                    Main Page
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" onClick={this.logout} href="/home">
                    <i className="fa fa-sign-out-alt pr-3"></i>
                    Log out
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="sidenav"
          style={{
            position: "fixed",
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
          }}
        >
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader className="text-center">
              <a
                href="/admin/dashboard"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Admin Panel
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink
                  exact
                  to="/admin/dashboard"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="columns">
                    Dashboard
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/admin/items"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="table">Items</CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/admin/users"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to="/admin/orders"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="receipt">Orders</CDBSidebarMenuItem>
                </NavLink>

                <NavLink
                  exact
                  to="/hero404"
                  target="_blank"
                  activeClassName="activeClicked"
                >
                  {/* <CDBSidebarMenuItem icon="exclamation-circle">
                    404 page
                  </CDBSidebarMenuItem> */}
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px 5px",
                }}
              >
                Sidebar Footer
              </div>
            </CDBSidebarFooter> */}
          </CDBSidebar>
        </div>
      </div>
    );
  }
}
export default Nav;
