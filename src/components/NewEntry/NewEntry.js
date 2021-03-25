import React, { Component } from "react";
import ValidationError from "../ValidationError/ValidationError.js";
import "./NewEntry.css";

export default class NewEntry extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getMonth() +
        1 +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear();
    this.state = {
      profile: {
        tech1: "react",
        tech2: "javascript",
        tech3: "node.js",
      },
      date: date,
      mood: "",
      tech: "",
      learningNotes: "",
      strugglingNotes: "",
      error: null,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  // form state updates
  updateLearningNotes = (notes) => {
    this.setState({ learningNotes: notes });
  };
  updateStrugglingNotes = (notes) => {
    this.setState({ strugglingNotes: notes });
  };

  updateTech = (id) => {
    this.setState({ tech: id });
  };

  updateMood = (id) => {
    this.setState({ mood: id });
  };

  // form vaidation
  validateEntry = () => {
    const mood = this.state.mood;
    const tech = this.state.tech;

    if (mood === "" || tech === "") {
      return "Please enter at least your mood and your focus";
    }
  };

  // get profile to display correct tech

  // handle submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/dashboard`);
  };

  render() {
    const entryError = this.validateEntry();
    return (
      <section className="wrapper">
        <h1 className="form-title">
          <span>New Entry</span>
        </h1>
        <div className="form">
          <form className="form-details" onSubmit={this.handleSubmit}>
            <div className="mood-date">
              <div>
                <p>I feel: </p>
                <button
                  onClick={(e) => this.updateMood(e.currentTarget.id)}
                  type="button"
                  id="smile"
                  className="btn"
                >
                  <i className="far fa-smile"></i>
                </button>
                <button
                  onClick={(e) => this.updateMood(e.currentTarget.id)}
                  type="button"
                  id="meh"
                  className="btn"
                >
                  <i className="far fa-meh"></i>
                </button>
                <button
                  onClick={(e) => this.updateMood(e.currentTarget.id)}
                  type="button"
                  id="frown"
                  className="btn"
                >
                  <i className="far fa-frown"></i>
                </button>
              </div>
              <div>{this.state.date}</div>
            </div>
            <div className="tech-button">
              <p>I focused on:</p>
              <button
                onClick={(e) => this.updateTech(e.currentTarget.id)}
                type="button"
                id={this.state.profile.tech1}
                className="btn"
              >
                <i className="fab fa-react"></i>
              </button>
              <button
                onClick={(e) => this.updateTech(e.currentTarget.id)}
                type="button"
                id={this.state.profile.tech2}
                className="btn"
              >
                <i className="fab fa-js"></i>
              </button>
              <button
                onClick={(e) => this.updateTech(e.currentTarget.id)}
                type="button"
                id={this.state.profile.tech3}
                className="btn"
              >
                <i className="fab fa-node-js"></i>
              </button>
            </div>
            <div className="notes">
              <p>Notes:</p>
              <textarea
                id="learning-notes"
                name="learning-notes"
                placeholder="I learned..."
                className="rounded-input"
                rows="5"
                value={this.state.learningNotes}
                onChange={(e) => this.updateLearningNotes(e.target.value)}
              />
              <textarea
                id="struggling-notes"
                name="struggling-notes"
                placeholder="I struggled with..."
                className="rounded-input"
                rows="5"
                value={this.state.strugglingNotes}
                onChange={(e) => this.updateStrugglingNotes(e.target.value)}
              />
            </div>

            <div className="form-btn">
              <button
                type="submit"
                className="btn"
                disabled={this.validateEntry()}
              >
                Add entry
              </button>
              {this.validateEntry() && <ValidationError message={entryError} />}
            </div>
          </form>
        </div>
      </section>
    );
  }
}
