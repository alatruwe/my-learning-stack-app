import React from "react";
import Mood from "../../services/entry-mood.service";
import EntriesApiService from "../../services/entries-api-services";
import "./Entry.css";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLearningNotes: false,
      showStrugglingNotes: false,
    };
  }
  static defaultProps = {
    handleDeleteEntry: () => {},
    history: {
      push: () => {},
    },
  };

  // render notes when buttons are clicked
  resetState = () => {
    this.setState({ showLearningNotes: false, showStrugglingNotes: false });
  };

  showLearningNotes = () => {
    this.setState({ showLearningNotes: true, showStrugglingNotes: false });
  };

  showStrugglingNotes = () => {
    this.setState({ showLearningNotes: false, showStrugglingNotes: true });
  };

  renderLearningNotes = () => {
    return (
      <div>
        {this.props.learningNotes}
        <button className="btn" type="button" onClick={this.handleDeleteEntry}>
          Delete
        </button>
      </div>
    );
  };

  renderStrugglingNotes = () => {
    return (
      <div>
        {this.props.strugglingNotes}
        <button className="btn" type="button" onClick={this.handleDeleteEntry}>
          Delete
        </button>
      </div>
    );
  };

  // API call to delete data
  handleDeleteEntry = () => {
    const id = this.props.id;
    EntriesApiService.deleteEntry(id).then(() => {
      this.setState({ deleted: true });
      this.props.handleDeleteEntry(id);
    });
  };

  render() {
    return (
      <section className="entry">
        <div className="vertical-border"></div>
        <div className="entry-info">
          <div onClick={this.resetState}>
            <div className="entry-date-mood">
              <div>{this.props.date}</div>
              <div>{Mood.renderMood(this.props.mood)}</div>
            </div>
            <div className="entry-tech">
              <p>{this.props.tech}</p>{" "}
            </div>
          </div>

          <div className="entry-buttons">
            <button type="button" onClick={this.showLearningNotes}>
              I learned
            </button>
            <button type="button" onClick={this.showStrugglingNotes}>
              I struggled
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
          {this.state.deleted && <p>Deleted!</p>}
        </div>
      </section>
    );
  }
}

export default Entry;
