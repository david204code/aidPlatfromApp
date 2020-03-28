import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './auth/Home';
import Dashboard from './auth/Dashboard';
import Map from './auth/Map';
import axios from 'axios';
import Volunteering from './community_request/Volunteering';
import Welcome from './pages/Welcome';
import Registration from './auth/Registration';
import Login from './auth/Login';

class App extends React.Component {

  constructor() {
    super();
    
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  checkLoginStatus() {
    axios
    .get("http://localhost:3000/logged_in", { withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged_In",
      user: data.user
    });
  }

  handleLogOut() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>

            <Route 
              exact path ="/"
              render ={props => (
                <Welcome {...props}
                  handleLogin={this.handleLogin}  
                  handleLogOut={this.handleLogOut} 
                  loggedInStatus ={this.state.loggedInStatus} 
                />
              )}
            />
            <Route 
              exact path ="/registration"
              render ={props => (
                <Registration {...props}
                  handleLogin={this.handleLogin}
                  handleLogOut={this.handleLogOut}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact path ="/login"
              render ={props => (
                <Login {...props}
                  handleLogin={this.handleLogin}
                  handleLogOut={this.handleLogOut}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route 
              exact path ="/home"
              render ={props => (
                <Home {...props}
                  handleLogin={this.handleLogin}  
                  handleLogOut={this.handleLogOut} 
                  loggedInStatus ={this.state.loggedInStatus} 
                />
              )}
            />
            <Route 
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard {...props}
                loggedInStatus ={this.state.loggedInStatus} 
                />
              )}
              // component ={Dashboard}
            />
            <Route 
              exact path ={"/map"}
              render ={props => (
                <Map {...props}
                loggedInStatus ={this.state.loggedInStatus}
                />
              )}
              // component ={Map}
            />

            <Route
              exact path ={"/volunteering"}
              component ={Volunteering}
            />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App