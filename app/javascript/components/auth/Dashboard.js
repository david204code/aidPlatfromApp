import React from 'react';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
      </div>
    </div>
    );
  }
}

export default Dashboard