const Mood = {
  renderMood(mood) {
    if (mood === "smile") {
      return <i class="far fa-smile"></i>;
    }
    if (mood === "meh") {
      return <i class="far fa-meh"></i>;
    }
    if (mood === "frown") {
      return <i class="far fa-frown"></i>;
    }
  },
};

export default Mood;
