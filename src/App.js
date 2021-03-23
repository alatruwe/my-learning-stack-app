import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      hasError: false,
    };
  }

  handleAuthSubmit = () => {
    this.setState({ auth: true });
  };

  handleLogOut = () => {
    this.setState({ auth: false });
  };

  render() {
    const auth = this.state.auth;
    return (
      <BrowserRouter>
        <NavBar auth={auth} handleLogOut={this.handleLogOut}></NavBar>
        <LandingPage></LandingPage>
      </BrowserRouter>
    );
  }
}

export default App;
