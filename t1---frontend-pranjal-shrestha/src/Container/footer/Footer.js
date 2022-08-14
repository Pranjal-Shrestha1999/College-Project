import { Component } from "react";
import "./footer.css";
class Footer extends Component {
  render() {
    return (
      <div className="maincontainer">
        <footer className="footer">
          <div className="container py-5">
            <div className="row py-4">
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <h6 className="text-uppercase font-weight-bold mb-4 text-light">
                  Interior Home Decor
                </h6>

                <p className="font-italic text-gray">
                  We provide home decore products to make your residence beautiful.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <h6 className="text-uppercase font-weight-bold mb-4 text-light">
                  Quick Links
                </h6>
                <ul className="list-unstyled mb-0 text-gray">
                  <li className="mb-2">
                    <a href="./">Home</a>
                  </li>
                  <li className="mb-2">
                    <a href="./menu">Category</a>
                  </li>
                  <li className="mb-2">
                    <a href="./about">About Us</a>
                  </li>
                  <li className="mb-2">
                    <a href="./profile">Profile</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 text-white">
                <h6 className="text-uppercase font-weight-bold mb-4">
                  Support
                </h6>
                <ul className="list-unstyled mb-0 text-gray">
                  <li className="mb-2">
                    <a href="#">FAQs</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">Term & Conditions</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">Report Issues</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-lg-0">
                <h6 className="text-uppercase font-weight-bold mb-4 text-white">
                  Like & Follow
                </h6>
                <ul className="list-inline mt-4 ">
                &nbsp;&nbsp;&nbsp;
                  <li className="list-inline-item  pr-2">
                    <a href="https://www.facebook.com/ujwal.shrestha.142/" target="_blank" title="facebook">
                      <i className="fab fa-facebook-f fb fa-3x"></i>
                    </a>
                  </li>

                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li className="list-inline-item  pr-2">
                    <a href="https://www.instagram.com/ujwal.shrestha.142/" target="_blank" title="instagram">
                      <i className="fab fa-instagram insta fa-3x"></i>
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>

          <div className=" py-4 copy-right">
            <div className="container text-center">
            <p className="text-muted mb-0 py-2">
                Interior Home Decoration
              </p>
              <p className="text-muted mb-0 py-2">
                Copyright © 2022 All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
