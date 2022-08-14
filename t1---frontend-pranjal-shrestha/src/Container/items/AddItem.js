import axios from "axios";
import { Component } from "react";

class AddItem extends Component {
  state = {
    itemName: "",
    itemCategory: "",
    itemSubCategory: "",
    itemPrice: "",
    itemImage: "",
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addItem = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/items/insert", this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <div>
        <form>
          <p>
            <lable>Item Name</lable>
            <input
              type="text"
              value={this.state.itemName}
              onChange={this.changeHandler}
            ></input>
          </p>
          <p>
            <lable>Item Category</lable>
            <input type="text" value={this.state.itemCategory}></input>
          </p>
          <p>
            <lable>Item Sub-Category</lable>
            <input type="text" value={this.state.itemSubCategory}></input>
          </p>
          <p>
            <lable>Item Price</lable>
            <input type="text" value={this.state.itemPrice}></input>
          </p>
          <p>
            <button>Add Items</button>
          </p>
        </form>
      </div>
    );
  }
}
