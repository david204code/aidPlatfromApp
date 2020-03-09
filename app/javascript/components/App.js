import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './auth/Home';
import Dashboard from './auth/Dashboard';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super();

    this.state ={
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin =this.handleLogin.bind(this);
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