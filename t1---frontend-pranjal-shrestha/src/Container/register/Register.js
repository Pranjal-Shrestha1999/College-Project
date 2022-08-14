import { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import "./Register.css";
import { Alert } from "react-bootstrap";

import axios from "axios";
class Register extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    dob: "",
    email: "",
    error: "",
  };
  sendUserData = async (e) => {
    e.preventDefault();
    try {
      if (!this.validate()) return;
      const data = {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        dob: this.state.dob,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      const response = await axios.post(
        "http://localhost:5000/user/register",
        data
      );
      this.props.history.push("/login");
    } catch (error) {
      console.log(error.response);
      this.setState({ error: error.response.data.msg }, () => {
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
    if (this.state.name === "") {
      this.setState({ error: "Please enter your name" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.phone === "") {
      this.setState({ error: "Please enter your phone number" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.phone.length !== 10) {
      this.setState({ error: "Number should be 10 digits" }, () =>
        this.dismissError()
      );
      return false;
    } else {
      this.setState({ error: "" });
    }

    if (this.state.username === "") {
      this.setState({ error: "Empty Username" }, () => this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.password === "") {
      this.setState({ error: "Empty Password" }, this.dismissError());
      return false;
    } else {
      this.setState({ error: "" });
    }
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ error: "Password did not match" }, this.dismissError());
      return false;
    }
    return true;
  };
  render() {
    return (
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image"></div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Registration</h3>
                      <p className="text-muted mb-4">
                        Get started with your free account
                      </p>
                      <form>
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

                        <div className="form-group mb-3">
                          <input
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                            placeholder="Full name"
                            required=""
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="address"
                            type="text"
                            value={this.state.address}
                            onChange={(e) =>
                              this.setState({ address: e.target.value })
                            }
                            placeholder="Address"
                            required=""
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="phone"
                            type="text"
                            value={this.state.phone}
                            onChange={(e) =>
                              this.setState({ phone: e.target.value })
                            }
                            placeholder="Phone"
                            required=""
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="username"
                            type="text"
                            value={this.state.username}
                            onChange={(e) =>
                              this.setState({ username: e.target.value })
                            }
                            placeholder="Username"
                            required=""
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-secondary"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="confirmpassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmpassword}
                            onChange={(e) =>
                              this.setState({ confirmpassword: e.target.value })
                            }
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-secondary"
                          />
                        </div>

                        <button
                          type="submit"
                          onClick={this.sendUserData}
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Register
                        </button>

                        <div className="text-center d-flex justify-content-center mt-4">
                          <p>
                            Have an account? <a href="/login">Login here</a>
                          </p>
                        </div>
                      </form>
                    </div>
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
export default Register;
