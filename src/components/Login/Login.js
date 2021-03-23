import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ValidationError from "../ValidationError/ValidationError.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        touched: false,
      },
      password: {
        value: "",
        touched: false,
      },
      error: null,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  updateEmail(email) {
    this.setState({ email: { value: email, touched: true } });
  }
  updatePassword(password) {
    this.setState({
      password: {
        value: password,
        touched: true,
      },
    });
  }
  validateEmail() {
    const email = this.state.email.value.trim();
    if (email.length === 0) {
      return "Email is required";
    }
  }
  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return "Password is required";
    } else if (password.length < 6 || password.length > 72) {
      return "Password must be between 6 and 72 characters long";
    } else if (!password.match(/[0-9]/)) {
      return "Password must contain at least one number";
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    this.props.history.push(`/dashboard`);
  };

  renderDemo() {
    return (
      <div>
        <p className="demo">Demo email: bill@email.com</p>
        <p className="demo">Demo password: 22AAaa@@</p>
      </div>
    );
  }

  render() {
    const emailError = this.validateEmail();
    const passwordError = this.validatePassword();

    return (
      <section className="wrapper">
        <h1 className="form-title">
          <span>Log In</span>
        </h1>
        <div className="form">
          <form className="form-details" onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="rounded-input"
                onChange={(e) => this.updateEmail(e.target.value)}
              />
              {this.state.email.touched && (
                <ValidationError message={emailError} />
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="rounded-input"
                onChange={(e) => this.updatePassword(e.target.value)}
              />
              {this.state.password.touched && (
                <ValidationError message={passwordError} />
              )}
            </div>

            <div className="form-btn">
              <button
                type="submit"
                className="btn"
                disabled={this.validateEmail() || this.validatePassword()}
              >
                Log In
              </button>
            </div>
            {this.props.location.demo ? this.renderDemo() : <></>}
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);