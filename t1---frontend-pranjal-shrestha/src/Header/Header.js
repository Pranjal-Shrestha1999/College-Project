import { Component } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
      item: [],
      user: { username: "", name: "" },
      width: "200px",
      searchvalue: "",
      config: {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    };
  }
  searchItem(value) {
    const data = value;

    axios
      .get("http://localhost:5000/items/search", data)
      .then((response) => {
        console.log(response.data);
        this.setState({ item: response.data.item });
      })
      .catch((err) => console.log(err));
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
        this.setState({ user: response.data.user });
      })
      .catch((err) => console.log(err));
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

  active = "nav-item active font-weight-bold change-color";
  notactive = "nav-item";
  render() {
    return (
      <div className="maincontainer">
        <div className="container-fluid p-0">
          <nav className="navbar navbar-icon-top navbar-expand-lg navbar-light bg-light shadow py-0 ">
            <a
              className="navbar-brand font-weight-bold blue-text pr-5"
              href="/"
            >
              <h3>Interior Home Decor</h3>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto w-100">
                <div className="form-inline has-search col-lg-8 col-md-6 col-sm-11 p-0 ">
                  <i
                    className="search-icon pl-3 fa fa-search"
                    aria-hidden="true"
                  ></i>
                  <input
                    id="searchItem"
                    className="form-control rounded-pill search pl-5 w-100 "
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </ul>

              <ul className="navbar-nav ml-auto mr-2">
                <li
                  className={
                    this.state.path == "/" ? this.active : this.notactive
                  }
                >
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>

                <li
                  className={
                    this.state.path == "/contact" ? this.active : this.notactive
                  }
                >
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
                <li
                  className={
                    this.state.path == "/menu" ? this.active : this.notactive
                  }
                >
                  <a className="nav-link text-secondary " href="/menu">
                    Category
                  </a>
                </li>

                <li
                  className={
                    this.state.path == "/about" ? this.active : this.notactive
                  }
                >
                  <a className="nav-link text-secondary " href="/about">
                    About
                  </a>
                </li>
                <div className="vl ml-2 d-lg-inline-block d-none"></div>
                <div className="hl ml-2 d-sm-inline-block d-lg-none"></div>
                <li
                  className="nav-item mr-3 pr-3 "
                  
                >
                  <a className="nav-link " href="/cart">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="cart text-secondary">Cart</span>
                  </a>
                </li>
                {this.state.user.username !== "" ? (
                  <li
                    className="nav-item profile dropdown"
                    style={{
                      width: this.state.width,
                    }}
                  >
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                    >
                      <img
                        // src="https://picsum.photos/48/48"
                        src={`http://localhost:5000/${this.state.user.profile}`}
                        className="rounded-circle header-profile-img"
                      />
                      <span className="profile-text text-dark my-1 py-2 ml-1">
                        {this.state.user.name}
                      </span>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item py-1 " href="./profile">
                        <i className="pl-0 fa fa-user"></i>
                        <span className="pl-3">Profile</span>
                      </a>
                      <div className="dropdown-divider"></div>
                      {/* <a className="dropdown-item py-1 " href="/order">
                        <i className="fa fa-concierge-bell"></i>
                        <span className="pl-3">Orders</span>
                      </a>

                      <div className="dropdown-divider"></div> */}
                      <a
                        className="dropdown-item py-1 "
                        href="/"
                        onClick={this.logout}
                      >
                        <i className="fa fa-sign-out-alt"></i>
                        <span className="pl-3">Log out</span>
                      </a>
                      {this.state.user.role === "Admin" ? (
                        <>
                          <div className="dropdown-divider"></div>
                          <a
                            className="dropdown-item py-1 "
                            href="/admin/dashboard"
                          >
                            <i className="fa fa-columns"></i>
                            <span className="pl-3">Open Admin</span>
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                ) : (
                  <li className="nav-item m-auto w-auto">
                    <Link to="/login">
                      <button className="btn btn-header-login  my-2 p-1 my-sm-0 rounded-pill">
                        Login
                      </button>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
export default Header;
