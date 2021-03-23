import { Component } from "react";
import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <header className="wrapper">
          <h2 className="text-intro">Elevate Your Learning</h2>
        </header>{" "}
        <section className="wrapper">
          <h3>Keep track of your progress</h3>
        </section>
        <section className="wrapper">
          <h3>Identify your struggles</h3>
        </section>
        <section className="wrapper">
          <h3>Celebrate your successes</h3>
        </section>
      </div>
    );
  }
}

export default LandingPage;
