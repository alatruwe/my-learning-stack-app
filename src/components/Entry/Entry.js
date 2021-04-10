import React from "react";
import Mood from "../../services/entry-mood.service";
import EntriesApiService from "../../services/entries-api-services";
import "./Entry.css";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showLearningNotes: true,
      showStrugglingNotes: false,
    };
  }
  static defaultProps = {
    handleDeleteEntry: () => {},
    history: {
      push: () => {},
    },
  };

  showDetails = () => {
    if (this.state.showDetails) {
      this.setState({ showDetails: false });
    } else {
      this.setState({ showDetails: true });
    }
  };

  showLearningNotes = () => {
    this.setState({ showLearningNotes: true, showStrugglingNotes: false });
  };

  showStrugglingNotes = () => {
    this.setState({ showLearningNotes: false, showStrugglingNotes: true });
  };

  renderDetails = () => {
    return (
      <>
        <div className="entry-buttons">
          <div className="toggle-buttons">
            <button
              type="button"
              onClick={this.showLearningNotes}
              className={
                this.state.showLearningNotes ? "active-button" : "btn-entry"
              }
            >
              I learned
            </button>
            <button
              type="button"
              className={
                this.state.showStrugglingNotes ? "active-button" : "btn-entry"
              }
              onClick={this.showStrugglingNotes}
            >
              I struggled
            </button>
          </div>
          <div>
            <button
              className="btn-entry"
              type="button"
              onClick={this.handleDeleteEntry}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div className="entry-notes">
          {this.state.showLearningNotes ? this.renderLearningNotes() : <></>}
          {this.state.showStrugglingNotes ? (
            this.renderStrugglingNotes()
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };

  renderLearningNotes = () => {
    return <p>{this.props.learningNotes}</p>;
  };

  renderStrugglingNotes = () => {
    return <p>{this.props.strugglingNotes}</p>;
  };

  // API call to delete data
  handleDeleteEntry = () => {
    const id = this.props.id;
    EntriesApiService.deleteEntry(id).then(() => {
      this.props.handleDeleteEntry(id);
    });
  };

  render() {
    return (
      <section className="card entry">
        <div className="entry-info">
          <div className="entry-title" onClick={this.showDetails}>
            <div className="entry-date-mood">
              <div className="entry-date">{this.props.date}</div>
              <>{Mood.renderMood(this.props.mood)}</>
            </div>
            <div className="entry-tech">
              <p className="tech-text">{this.props.tech}</p>{" "}
            </div>
          </div>
          <div>{this.state.showDetails ? this.renderDetails() : <></>}</div>
        </div>
      </section>
    );
  }
}

export default Entry;
