import React from 'react';
import axios from 'axios';
import Map from '../auth/Map';

class Volunteering extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      title: "", 
      description: "",
      request_type: "",
      location_lat: "",
      location_long: "",
      volunteeringErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClickMap(e) {
    console.log(e.lngLat);
  }

  handleSubmit(event) {
    
    axios
    .post("http://localhost:3000/community_requests",
      {
        communityRequest: {
          title: this.state.title,
          description: this.state.description,
          request_type: this.state.request_type,
          location_lat: this.state.location_lat,
          location_long: this.state.location_long
        }
      },

      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        console.log("community request submitted")
      }
    }).catch(error => {
      console.log("registration", error);
    });
    event.preventDefault();
    this.props.history.push("/map"); 
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Map />
        <form onSubmit={this.handleSubmit}>          
          <input
            type ="text"
            name ="title"
            placeholder ="title of request"
            value ={this.state.title}
            onChange ={this.handleChange}
          />

          <input
            type ="text"
            name ="description"
            placeholder ="description"
            value ={this.state.description}
            onChange ={this.handleChange}
          />

          <input
            type ="text"
            name ="request_type"
            placeholder ="request_type"
            value ={this.state.request_type}
            onChange ={this.handleChange}
          />

          <input
            type ="text"
            name ="location_lat"
            placeholder ="location_lat"
            value ={this.state.location_lat}
            onChange ={this.handleChange}
          />

          <input
            type ="text"
            name ="location_long"
            placeholder ="location_long"
            value ={this.state.location_long}
            onChange ={this.handleChange}
          />

          <button type ="submit">Volunteer</button>
        </form>
      </div>
    )
  }


}

export default Volunteering