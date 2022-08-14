import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

class Update extends Component {
  state = {
    itemName: "",
    itemPrice: "",
    itemCategory: "",
    id: this.props.match.params.id,
  };
  componentDidMount() {
    axios
      .get(`http://localhost:5000/currentItem/${this.state.id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          itemName: response.data.itemName,
          itemPrice: response.data.itemPrice,
          itemCategory: response.data.itemCategory,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.itemName]: e.target.value,
    });
  };
  updateItem = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:5000/items/update/${this.state.id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.response));
    // axios
    //   .put(`http://localhost:5000/items/update/${this.state.id}`,)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };
  render() {
    return (
      <form>
        <p>
          Item Name
          <input
            type="text"
            value={this.state.itemName}
            onChange={(e) => this.setState({ itemName: e.target.value })}
            name="itemName"
          />
        </p>
        <p>
          Item Price
          <input
            type="text"
            value={this.state.itemPrice}
            onChange={this.changeHandler}
            name="itemPrice"
          />
        </p>
        <p>
          Item Category
          <input
            type="text"
            value={this.state.itemCategory}
            onChange={this.changeHandler}
            name="itemCategory"
          />
        </p>
        <Link to="/items">
          <button type="submit" onClick={this.updateItem}>
            Update
          </button>
        </Link>
      </form>
    );
  }
}
export default Update;
