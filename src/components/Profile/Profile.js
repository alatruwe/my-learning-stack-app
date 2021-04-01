import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProfileApiService from "../../services/profile-api-services";
import ValidationError from "../ValidationError/ValidationError.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech1: "",
      tech2: "",
      tech3: "",
      error: null,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  validateTech = () => {
    if (
      this.state.tech1 === "" &&
      this.state.tech2 === "" &&
      this.state.tech3 === ""
    ) {
      return "Please enter at least 1 tech you work with";
    }
  };

  updateTech1 = (tech) => {
    this.setState({ tech1: tech });
  };
  updateTech2 = (tech) => {
    this.setState({ tech2: tech });
  };
  updateTech3 = (tech) => {
    this.setState({ tech3: tech });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    // get profile info
    const tech1 = this.state.tech1;
    const tech2 = this.state.tech2;
    const tech3 = this.state.tech3;
    let techs = {
      tech1: tech1,
      tech2: tech2,
      tech3: tech3,
    };

    // API POST request
    ProfileApiService.postProfile(techs)
      // reset form fields
      .then(() => {
        ev.target.tech1.value = "";
        ev.target.tech2.value = "";
        ev.target.tech3.value = "";
      })
      // change state
      .then(() => {
        this.setState({
          tech1: "",
          tech2: "",
          tech3: "",
          error: null,
        });
        this.props.history.push(`/dashboard`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const techError = this.validateTech();
    return (
      <section className="wrapper">
        <h1 className="form-title">
          <span>My Profile</span>
        </h1>

        <div className="form">
          <p>I work with:</p>
          <form className="form-details" onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="tech1"
              name="tech1"
              placeholder="React"
              className="rounded-input"
              value={this.state.tech1}
              onChange={(e) => this.updateTech1(e.target.value)}
            />
            <input
              type="text"
              id="tech2"
              name="tech2"
              placeholder="Javascript"
              className="rounded-input"
              value={this.state.tech2}
              onChange={(e) => this.updateTech2(e.target.value)}
            />
            <input
              type="text"
              id="tech3"
              name="tech3"
              placeholder="Node.js"
              className="rounded-input"
              value={this.state.tech3}
              onChange={(e) => this.updateTech3(e.target.value)}
            />
            {this.validateTech && <ValidationError message={techError} />}
            <div className="form-btn">
              <button
                type="submit"
                className="btn"
                disabled={this.validateTech()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Profile);
