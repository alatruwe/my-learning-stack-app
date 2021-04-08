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
          <button
            type="button"
            onClick={this.showLearningNotes}
            className={this.state.showLearningNotes ? "active-button" : ""}
          >
            I learned
          </button>
          <button
            type="button"
            className={this.state.showStrugglingNotes ? "active-button" : ""}
            onClick={this.showStrugglingNotes}
          >
            I struggled
          </button>
          <button
            className="btn"
            type="button"
            onClick={this.handleDeleteEntry}
          >
            Delete
          </button>
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
      <section className="entry">
        <div className="entry-info">
          <div onClick={this.showDetails}>
            <div className="entry-date-mood">
              <div>{this.props.date}</div>
              <div>{Mood.renderMood(this.props.mood)}</div>
            </div>
            <div className="entry-tech">
              <p>{this.props.tech}</p>{" "}
            </div>
          </div>
          <div>{this.state.showDetails ? this.renderDetails() : <></>}</div>
        </div>
      </section>
    );
  }
}

export default Entry;
