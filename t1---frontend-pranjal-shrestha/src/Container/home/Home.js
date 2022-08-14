import { Component } from "react";
import { Link } from "react-router-dom";
import slide1 from "../img/slide1.jpg";
import axios from "axios";
import { Carousel, CardDeck, CardColumns, Card } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";
import slide from "../img/slide1.jpg";
// Images Import 
import Img01 from "../img/wallpaper 4.jpg";
import Img02 from "../img/Sofa.jpg";
import Img03 from "../img/lights.jpg";

const ImageArray = [Img01,Img02,Img03]


// import "./jquery.simpleLens.css";
class Home extends Component {
  state = {
    items: [],
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
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
  }
  // add to cart
  addtocart = (item) => {
    const send = {
      cartItems: {
        product: item._id,
        quantity: 1,
      },
    };
    axios
      .post(`http://localhost:5000/cart/addtocart`, send, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <div className="maincontainer">
        <div className="carousel">
          <Carousel>
            {
              ImageArray.map((item,index)=>  <Carousel.Item key={index} interval={5000}>
              <img
                className="d-block  w-100"
                src={item}
                alt="First slide"
              />
            </Carousel.Item>)
            }
           

          </Carousel>
        </div>
        {/* ******************Our Category*********************** */}
        <div className="ourMenu container my-5 ">
          <div className="heading p-1">
            <h3 className="d-inline">Our Category</h3>

            <a
              className="btn btn-sm btn-dark text-light float-right view-more"
              href="./menu"
            >
              View more
            </a>
          </div>
          
          <div className="item-details">
            <div className="menu mt-2">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                {this.state.items.map((item, index) => {
                  return index > 7 ? (
                    ""
                  ) : (
                    <div className="col mt-3 mb-3">
                      <div className="card h-100">
                        <img
                          src={`http://localhost:5000/${item.itemImage}`}
                          className="card-img-top item-image"
                          alt="..."
                        />
                        <div className="card-body p-2">
                          <h5 className="card-title d-inline">
                            {item.itemName}
                          </h5>
                          <p className="card-text float-right">
                            Rs. {item.itemPrice}
                          </p>
                          {/* <Link to="./cart"> */}
                          <a
                            href="./cart"
                            className="btn w-100 order-btn"
                            onClick={this.addtocart.bind(this, item)}
                          >
                            Add to cart
                          </a>
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* ******************************About US**************************** */}
        <div className="about-us">
          <div className=" container">
            <h1 className="about-title font-weight-bold pt-5 pb-0">About Us</h1>
            <div className="hd"></div>
            <div className="body pt-1">
              <p className="about-desc text-light">
              Welcome to Interior home decoration product store, your number one source for all home decor products such as furnitures, lights, paints etc].
               We're dedicated to giving you the very best of products, with a focus on [three characteristics, ie: dependability, customer service and uniqueness.]
               Founded in 1999 A.D by Ujwal Kasajoo, This has come a long way.
               When Mr. Ujwal Kasajoo first started out, his passion for shopkeeping drove him to quit his small business 
               and gave him the impetus to turn hard work and inspiration into to a booming online store. 
               We now serve customers all over naikap, satungal, kalanki, putalisadak and kamal pokhari,
               and are planning to grow business in some other places as well in upcoming days. 

                We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
               </p>

               <p className="about-desc text-light">
               <br></br> 

              Sincerely,<br></br>
              Interior Home Decoration StoreFamily.
              <br></br>

              <br></br> 
              <mark>Important*</mark><br></br>
              We are open sunday-Friday.<br></br>
              9AM - 4PM.

              
              
              </p >
            </div>
          </div>
        </div>

        
          
        
      </div>
    );
  }
}

export default Home;
