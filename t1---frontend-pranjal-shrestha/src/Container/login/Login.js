import { Component } from "react";
import "./Login.css";
import { Alert } from "react-bootstrap";
import axios from "axios";
class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  loginFunction = async (e) => {
    e.preventDefault();
    try {
      if (!this.validate()) return;
      const response = await axios.post(
        "http://localhost:5000/user/login",
        this.state
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      this.setState({
        chkLogin: true,
      });
      // alert(response.data.token);
      this.props.history.push("/");
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
                      <h3 className="display-4">Interior Decor</h3>
                      <p className="text-muted mb-4">
                        Where you find products to decorate.
                      </p>
                      <form>
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
                        <div className="custom-control custom-checkbox mb-3 text-right text-secondary">
                          <label htmlFor="customCheck1">Please Login!!</label>
                        </div>

                        <button
                          type="submit"
                          onClick={this.loginFunction}
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Log in
                        </button>
                        {/*<div>
                          <p className="divider-text">
                            <span className="bg-light">OR</span>
                          </p>
                          <p>
                            <a href="#" className="btn btn-block btn-google">
                              {" "}
                              <i className="fab fa-google"></i> Login via google
                            </a>
                            <a href="#" className="btn btn-block btn-facebook">
                              {" "}
                              <i className="fab fa-facebook-f"></i> Login via
                              facebook
                            </a>
                          </p>
                          </div> */}
                        <div className="text-center d-flex justify-content-center mt-4">
                          <p>
                            Don't have account?{" "}
                            <a href="/register">Create account</a>
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

export default Login;
