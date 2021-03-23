import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <LandingPage></LandingPage>
      </BrowserRouter>
    );
  }
}

export default App;
