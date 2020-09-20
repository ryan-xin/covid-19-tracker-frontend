import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }
  
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <nav>
          <Link to={"/home"}>Logo</Link>

          {currentUser ? (
            <div>
              <li>
                <a href="/logout" onClick={this.logOut}>LogOut</a>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to={"/user/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/user/signup"}>Sign Up</Link>
              </li>
            </div>
          )}
        </nav>
        
        <div>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path={["/", "/user/login"]} component={UserLogin} />
            <Route exact path="/user/signup" component={UserSignup} />
          </Switch>
        </div>
        
        <div>
          <hr />
          <footer>
            Admin Login
          </footer>
        </div>
        
      </div>
    )
  }
}

export default App;