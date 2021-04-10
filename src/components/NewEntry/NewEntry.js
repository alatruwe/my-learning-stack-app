import React, { Component } from "react";
import EntriesApiService from "../../services/entries-api-services";
import ProfileApiService from "../../services/profile-api-services";
import ValidationError from "../ValidationError/ValidationError.js";
import Tech from "../Tech/Tech.js";
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
      techs: [],
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

  updateTech = (name) => {
    this.setState({ tech: name });
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
  componentDidMount() {
    ProfileApiService.getProfile().then((res) => {
      this.setState({ techs: res });
    });
  }

  // handle submit
  handleSubmit = (e) => {
    e.preventDefault();
    // get media info
    const tech = this.state.tech;
    const current_mood = this.state.mood;
    const learning_notes = this.state.learningNotes;
    const struggling_notes = this.state.strugglingNotes;
    let entry = {
      tech_id: tech,
      current_mood: current_mood,
      learning_notes: learning_notes,
      struggling_notes: struggling_notes,
    };
    // API POST request
    EntriesApiService.postEntry(entry)
      // reset form fields
      .then(() => {
        e.target.learning_notes.value = "";
        e.target.struggling_notes.value = "";
      })
      // change state
      .then(() => {
        this.setState({
          mood: "",
          tech: "",
          learningNotes: "",
          strugglingNotes: "",
          error: null,
        });
        this.props.history.push(`/dashboard`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const techs = this.state.techs;
    const entryError = this.validateEntry();
    return (
      <div className="wrapper">
        <section className="card">
          <h2 className="card-title">New Entry</h2>
          <div className="form">
            <form className="form-details" onSubmit={this.handleSubmit}>
              <div className="mood-date">
                <div className="new-entry-form-date">{this.state.date}</div>
                <div>
                  <p className="new-entry-text">I felt: </p>
                  <div className="mood-buttons">
                    <button
                      onClick={(e) => this.updateMood(e.currentTarget.id)}
                      type="button"
                      id="smile"
                      className={
                        this.state.mood === "smile" ? "active-mood" : "btn"
                      }
                    >
                      <i className="far fa-smile"></i>
                    </button>
                    <button
                      onClick={(e) => this.updateMood(e.currentTarget.id)}
                      type="button"
                      id="meh"
                      className={
                        this.state.mood === "meh" ? "active-mood" : "btn"
                      }
                    >
                      <i className="far fa-meh"></i>
                    </button>
                    <button
                      onClick={(e) => this.updateMood(e.currentTarget.id)}
                      type="button"
                      id="frown"
                      className={
                        this.state.mood === "frown" ? "active-mood" : "btn"
                      }
                    >
                      <i className="far fa-frown"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="tech-buttons">
                <p className="new-entry-text">I focused on:</p>
                <ul className="profile-list">
                  {techs.map((tech) => (
                    <li
                      key={tech.id}
                      className={
                        this.state.tech === tech.name
                          ? "active-tech"
                          : "tech-button"
                      }
                    >
                      <Tech
                        id={tech.name}
                        tech={tech.name}
                        updateTech={this.updateTech}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="notes">
                <p className="new-entry-text">Notes:</p>
                <textarea
                  id="learning_notes"
                  name="learning_notes"
                  placeholder="I learned..."
                  className="rounded-input"
                  rows="5"
                  value={this.state.learningNotes}
                  onChange={(e) => this.updateLearningNotes(e.target.value)}
                />
                <textarea
                  id="struggling_notes"
                  name="struggling_notes"
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
                {this.validateEntry() && (
                  <ValidationError message={entryError} />
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
