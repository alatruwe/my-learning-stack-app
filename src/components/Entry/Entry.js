import React from "react";
import "./Entry.css";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  // API call to delete data
  handleDeleteEntry = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <section className="entry">
        <div className="vertical-border"></div>
        <div className="entry-info">
          <div className="entry-date-mood">
            <p>{this.props.date}</p>
            <p>{/*this.renderMood(this.props.mood)*/}:-)</p>
          </div>
          <div className="entry-tech">
            <p>{this.props.tech}</p>{" "}
          </div>
          <div className="entry-notes">
            <p>{this.props.learningNotes}</p>
            <p>{this.props.strugglingNotes}</p>
          </div>

          {this.state.deleted && <p>Deleted!</p>}
        </div>
        <button className="btn" type="button" onClick={this.handleDeleteEntry}>
          Delete
        </button>
      </section>
    );
  }
}

export default Entry;
