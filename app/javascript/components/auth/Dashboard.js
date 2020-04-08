import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker} from 'react-map-gl';
import MapPin from './MapPin';
import axios from 'axios';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Dashboard extends React.Component {
  
  constructor() {
    super()
    
    this.state= {
      community_requests: [],
      
      event: []
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
            location_long: data.location_long,
            location_lat: data.location_lat 
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
            <p>
              $Title: {community_request.title} $Description: {community_request.description}
              $Request_type: {community_request.request_type} $longtitude: {community_request.location_long}
              $latitude: {community_request.location_lat}
            </p>
          </div>
        )
      });

    return (
      <div>
        <div className ="offset-2">
          <h4 className ="text-left">Hello {this.props.user} </h4>
        </div>
        {community_requests}
      </div>
    )
  }
}

export default Dashboard;
