import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  // navbar toggle on and off
  toggleClass = () => {
    this.state.active
      ? this.setState({ active: false })
      : this.setState({ active: true });
  };

  renderLogoutNav() {
    return (
      <div className={this.state.active ? "active" : "main-nav"}>
        <Link to="/dashboard" className="nav-links">
          Dashboard
        </Link>
        <br />
        <Link to="/new-entry" className="nav-links">
          New entry
        </Link>
        <br />
        <Link to="/profile" className="nav-links">
          Profile
        </Link>
        <br />
        <Link onClick={this.props.handleLogOut} to="/" className="nav-links">
          Logout
        </Link>
        <br />
      </div>
    );
  }

  renderLoginNav() {
    return (
      <div className={this.state.active ? "active" : "main-nav"}>
        <Link to="/signup" className="nav-links">
          Sign Up
        </Link>
        <br />
        <Link
          to={{
            pathname: `/login`,
            demo: true,
          }}
          className="nav-links"
        >
          Demo
        </Link>
        <br />
        <Link to="/login" className="nav-links">
          Log in
        </Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-toggle" onClick={this.toggleClass}>
            <i className="fas fa-bars"></i>
          </div>
          <div className="logo">
            <Link to="/" className="nav-links">
              <i className="fas fa-layer-group"></i>My Learning Journey
            </Link>
          </div>
          {this.props.auth ? this.renderLogoutNav() : this.renderLoginNav()}
        </nav>{" "}
      </>
    );
  }
}

export default NavBar;
