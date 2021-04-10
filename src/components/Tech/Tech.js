import React from "react";

class Tech extends React.Component {
  static defaultProps = {
    updateTech: () => {},
  };
  render() {
    return (
      <button
        onClick={(e) => {
          this.props.updateTech(this.props.tech);
        }}
        type="button"
        className="btn"
      >
        {this.props.tech}
      </button>
    );
  }
}

export default Tech;
