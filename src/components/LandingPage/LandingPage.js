import { Component } from "react";
import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <section className="card landing-page-details">
          <h2 className="landing-page-title">Elevate Your Learning</h2>
          <p className="landing-page-text">Keep track of your progress</p>

          <p className="landing-page-text">Identify your struggles</p>

          <p className="landing-page-text">Celebrate your successes</p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
