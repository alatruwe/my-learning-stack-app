const Mood = {
  renderMood(mood) {
    if (mood === "smile") {
      return (
        <div style={{ color: "#0AFF99" }}>
          <i className="far fa-smile"></i>
        </div>
      );
    }
    if (mood === "meh") {
      return (
        <div style={{ color: "#FF8700" }}>
          <i className="far fa-meh"></i>
        </div>
      );
    }
    if (mood === "frown") {
      return (
        <div style={{ color: "#e6403a" }}>
          <i className="far fa-frown"></i>
        </div>
      );
    }
  },
};

export default Mood;
