import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ValidationError from "../ValidationError/ValidationError.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: 0,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  validateTech = () => {
    if (this.state.tech === 0) {
      return "Please chose at least 1 tech you work with";
    }
  };

  updateTech = () => {
    const count = this.state.tech + 1;
    this.setState({ tech: count });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.history.push(`/dashboard`);
  };

  render() {
    const techError = this.validateTech();
    return (
      <section className="wrapper">
        <h1 className="form-title">
          <span>My Profile</span>
        </h1>
        <div className="form">
          <form className="form-details" onSubmit={this.handleSubmit}>
            <button onClick={this.updateTech} type="button" className="btn">
              <i className="fab fa-html5">HTML</i>
            </button>
            <button onClick={this.updateTech} type="button" className="btn">
              <i className="fab fa-css3-alt">CSS</i>
            </button>
            <button onClick={this.updateTech} type="button" className="btn">
              <i className="fab fa-js">Javascript</i>
            </button>
            <button onClick={this.updateTech} type="button" className="btn">
              <i className="fab fa-react">React</i>
            </button>
            <button onClick={this.updateTech} type="button" className="btn">
              <i className="fab fa-node-js">Node.js</i>
            </button>
            {this.state.tech === 0 && <ValidationError message={techError} />}
            <div className="form-btn">
              <button
                type="submit"
                className="btn"
                disabled={this.validateTech()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Profile);
