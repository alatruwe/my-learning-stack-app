const Mood = {
  renderMood(mood) {
    if (mood === "smile") {
      return <i className="far fa-smile"></i>;
    }
    if (mood === "meh") {
      return <i className="far fa-meh"></i>;
    }
    if (mood === "frown") {
      return <i className="far fa-frown"></i>;
    }
  },
};

export default Mood;
