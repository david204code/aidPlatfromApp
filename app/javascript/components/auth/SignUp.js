import React from 'react';
import Registration from './Registration';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/map");
  }

render() {
  return (
    <Registration handleSuccessfulAuth ={this.handleSuccessfulAuth} />
  )
}

}

export default SignUp;