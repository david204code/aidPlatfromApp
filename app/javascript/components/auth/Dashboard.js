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
      let res = []
      data.data.data.map( (data) => {
        res.push(
          {
            id: data.id, 
            title: data.title, 
            description: data.description, 
            request_type: data.request_type, 
            location_lat: data.location_lat, 
            location_long: data.location_long

          }
        )

        this.setState({community_requests: res})
      })
    })
    .catch(data => {
      // debugger
    })
  }

  render() {
      var community_requests = this.state.community_requests.map((community_request) => {
        return (
          <div key ={community_request.id}>
            <p>{community_request.title}</p>
            <p>{community_request.description}</p>
            <p>{community_request.request_type}</p>
            <p>{community_request.location_lat}</p>
            <p>{community_request.location_long}</p>
          </div>
        )
      })

    return (
      <div>
        {community_requests}
      </div>
    )
  }
}

export default Dashboard