import { Component, useState } from "react";
import Register from "./register/Register";
import Login from "./login/Login";
import Items from "./items/Items";
import Unauthorized from "./Unauthorized";
import Home from "./home/Home";
import Header from "../Header/Header";
import Footer from "./footer/Footer";
import Cart from "./cart/Cart";
import About from "./about/About";
import Profile from "./profile/Profile";
import AdminHome from "../admin/home/AdminHome";
import AdminItems from "../admin/items/Item";
import Update from "../admin/items/UpdateItem";
import AddItem from "../admin/items/AddItem";
import AdminUser from "../admin/user/User";
import AddUser from "../admin/user/AddUser";
import Order from "../admin/order/Order";
import UpdateUser from "../admin/user/UpdateUser";
import EditProfile from "./profile/EditProfile";
import ContactHome from "./contact/contact"
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <div>
        <div>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "/admin/dashboard" &&
            location.pathname !== "/admin/items" &&
            location.pathname !== "/admin/additem" &&
            location.pathname !== "/admin/users" &&
            location.pathname !== "/admin/adduser" &&
            location.pathname !== "/admin/orders" &&
            location.pathname !== "/admin/updateuser" &&
            location.pathname !== "/admin/itemupdate" &&
            location.pathname !== "/admin/orders" && <Header />}
        </div>
        {/* /admin/adduser */}
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="/menu" exact component={Items} />
          <Route path="/unauthorized" exact component={Unauthorized} />
          {/* for admin */}
          <AdminRoute path="/admin/dashboard" exact component={AdminHome} />
          <AdminRoute path="/admin/items" exact component={AdminItems} />
          <AdminRoute path="/admin/users" exact component={AdminUser} />
          <AdminRoute path="/admin/adduser" exact component={AddUser} />
          <AdminRoute path="/admin/orders" exact component={Order} />

          <AdminRoute path="/admin/additem" exact component={AddItem} />
          {/* for admin */}
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={ContactHome} />
          <Route path="/cart" exact component={Cart} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/editprofile" exact component={EditProfile} />
          <AdminRoute path="/admin/itemupdate/:id" exact component={Update} />
          <AdminRoute
            path="/admin/updateuser/:id"
            exact
            component={UpdateUser}
          />

          <PrivateRoute path="/profile" component={Profile} />
          {/* <PrivateRoute path="/order" component={Order} /> */}
        </Switch>
        <div>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "/admin/dashboard" &&
            location.pathname !== "/admin/additem" &&
            location.pathname !== "/admin/items" &&
            location.pathname !== "/admin/itemupdate/" &&
            location.pathname !== "/admin/orders" &&
            location.pathname !== "/admin/users" &&
            location.pathname !== "/admin/adduser" &&
            location.pathname !== "/admin/updateuser/" &&
            location.pathname !== "/admin/orders" && <Footer />}
        </div>
      </div>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
function AdminRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") && user.role == "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
export default withRouter(Container);
