import { Component } from "react";
import "./about.css";
class About extends Component {
  render() {
    return (
      <div className="maincontainer">
        <div className="about-banner">
          <h1 className="text-center text-white pt-5">
            Want to know about us?
          </h1>
        </div>
        <div className="about-page container">
          <h1 className="about-page-title text-center font-weight-bold pt-5 pb-0">
            About Us
          </h1>
          <div className="card no-border-card mb-3 mt-5">
            <div className="row no-gutters">
              <div className="col-md-6">
                <img src="../fyp/sofa 2.jpg" className="card-img" alt="..." />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <p className="card-text">
                    Welcome to Interior home decoration product store, your number one source for all home decor products such as furnitures, lights, paints etc].
               We're dedicated to giving you the very best of products, with a focus on [three characteristics, ie: dependability, customer service and uniqueness.]
               Founded in 1999 A.D by Ujwal Kasajoo, This has come a long way.
               When Mr. Ujwal Kasajoo first started out, his passion for shopkeeping drove him to quit his small business 
               and gave him the impetus to turn hard work and inspiration into to a booming online store. 
               We now serve customers all over naikap, satungal, kalanki, putalisadak and kamal pokhari,
               and are planning to grow business in some other places as well in upcoming days. 

                We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
               </p>
               
               <p>
               <br></br> 
              Sincerely,<br></br>
              Interior Home Decoration StoreFamily.

              <br></br> 
              <br></br>
              <mark>Important*</mark><br></br>
              We are open sunday-Friday.<br></br>
              9AM - 4PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        {/*locations */}
        
        <div className="location">
          <h1 className="about-page-title text-center font-weight-bold pt-5 mb-5 pb-0">
            Our Location
          </h1>
          <div className="map agileits">
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7065.815567282915!2d85.26172153488768!3d27.689244900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb229b15349b21%3A0x84dd96dea8ac0de7!2sNaikap%20Naya%20Bhanjyang%2C%2044600!5e0!3m2!1sen!2snp!4v1648888124308!5m2!1sen!2snp"></iframe>
        </div>
        
        </div>
      </div>
    );
  }
}
export default About;
