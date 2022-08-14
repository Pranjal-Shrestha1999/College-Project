import { extend } from "jquery";
import { Component } from "react";
import axios from "axios";

class Unauthorized extends Component {
  state = {
    user: [],
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/user/get", this.state.config)
      .then((response) => {
        console.log(response.data);
        this.setState({ user: response.data.user });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="maincontainer">
        <div className="container text-center mt-5 mb-5 pt-5 pb-5">
          <h1>401!!!</h1>
          <h2>Unauthorized client error</h2>
          <a href="/home" className="btn btn-primary pb-0">
            <h5 className="pb-0">Go To HomePage</h5>
          </a>
        </div>
      </div>
    );
  }
}

export default Unauthorized;
