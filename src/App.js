import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
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
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/login"
          render={() => <Login handleAuthSubmit={this.handleAuthSubmit} />}
        />
      </BrowserRouter>
    );
  }
}

export default App;
