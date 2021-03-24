import React from "react";
import "./Entry.css";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLearningNotes: false,
      showStrugglingNotes: false,
      deleted: false,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  resetState = () => {
    this.setState({ showLearningNotes: false, showStrugglingNotes: false });
  };
  showLearningNotes = () => {
    this.setState({ showLearningNotes: true, showStrugglingNotes: false });
  };
  showStrugglingNotes = () => {
    this.setState({ showLearningNotes: false, showStrugglingNotes: true });
  };

  // API call to delete data
  handleDeleteEntry = (event) => {
    event.preventDefault();
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

  render() {
    return (
      <section className="entry">
        <div className="vertical-border"></div>
        <div className="entry-info">
          <div onClick={this.resetState}>
            <div className="entry-date-mood">
              <p>{this.props.date}</p>
              <p>{/*this.renderMood(this.props.mood)*/}:-)</p>
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
