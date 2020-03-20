import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
  
  constructor() {
    super()
    
    this.state= {
      community_requests: []
    };  
  }

  componentDidMount(){
    axios.get('/community_requests.json')
    .then(data => {
      // debugger
    })
    .catch(data => {
      // debugger
    })
  }

  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

export default Dashboard