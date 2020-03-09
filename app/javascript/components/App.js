import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './auth/Home';
import Dashboard from './auth/Dashboard';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super();
    
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
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


  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>

            <Route 
              exact path ="/"
              render ={props => (
                <Home {...props}
                loggedInStatus ={this.state.loggedInStatus}
                handleLogin={this.handleLogin}  />
              )}
            />
            <Route 
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard {...props}
                loggedInStatus ={this.state.loggedInStatus} />
              )}
            />      

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App