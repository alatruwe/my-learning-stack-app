import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import LandingPage from "./components/LandingPage/LandingPage";
import Profile from "./components/Profile/Profile";
import EntryList from "./components/EntryList/EntryList";
import NewEntry from "./components/NewEntry/NewEntry";

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
        <Route
          path="/signup"
          render={() => <Signup handleAuthSubmit={this.handleAuthSubmit} />}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" component={EntryList} />
        <Route path="/new-entry" component={NewEntry} />
      </BrowserRouter>
    );
  }
}

export default App;
