import React from 'react';
import axios from 'axios';
import ReactMapGL, {Marker} from 'react-map-gl';
import SetPin from './SetPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from 'react-router-dom';
// import Map from '../auth/Map';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Volunteering extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      title: "", 
      description: "",
      request_type: "",
      location_lat: "",
      location_long: "",
      volunteeringErrors: "",

      viewport: {
        latitude: 51.508,
        longitude: -0.140,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      marker: {
        latitude: 51.508,
        longitude: -0.140
      },
      event: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClickMap(e) {
    console.log(e.lngLat);
    var location_long = (e.lngLat[0]);
    console.log({location_long});
  }

  onDblClick(e) {
    console.log("Hi", e.lngLat[0], e.lngLat[1]);
  }

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragEnd = event => {
    this._logDragEvent('onDragEnd', event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
    this.setState({
      location_long: event.lngLat[0], location_lat: event.lngLat[1] 
    })
    console.log("Longitude:",event.lngLat[0], "Latitude:", event.lngLat[1]);
  };

  handleSubmit(event) {
    
    axios
    .post("http://localhost:3000/community_requests",
      {
        communityRequest: {
          title: this.state.title,
          description: this.state.description,
          request_type: this.state.request_type,
          location_long: this.state.location_long,
          location_lat: this.state.location_lat
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
      [event.target.name]: event.target.value,
    });
  }  
  
  render() {
    const {viewport, marker} = this.state;
    return (
      <div>
        <div className ="jumbotron jumbotron-fluid text-center">
          <h1>Thank you for Volunteering!</h1>
          <p>We are excited you want to volunteer. Fill in the form below</p>
        </div>

        <div className ="container">
          <div>
            <Link
              to ="/map"
              className =""
              role ="button"
            >
              <button className ="">
                Back to the map
              </button> 
            </Link>
          </div>
          <div className ="offset-md-1">
            {/* <Map /> */}
            <p className ="text-center">
              Drag and drop the marker to your position to let others know where you
              are located in your community.
            </p>
            <ReactMapGL
              {...this.state.viewport}
              width="70vw"
              height="60vh"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={viewport => this.setState({viewport})}
              mapboxApiAccessToken={TOKEN}
              onClick ={this.onClickMap}
              onDblClick ={this.onDblClick}
              doubleClickZoom ={false}
              >
              <Marker 
                latitude={marker.latitude} 
                longitude={marker.longitude} 
                offsetLeft={-20} 
                offsetTop={-10}
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd}
                >
                <SetPin size={20} />
              </Marker>
            </ReactMapGL>
            <div className ="row pt-2 text-center">
              <div className ="col-md-4 offset-md-2">
                <label>Marker's Longitude</label>
                <input
                  type ="text"
                  name ="location_long"
                  className ="form-control"
                  placeholder ="location_long"
                  value ={this.state.location_long}
                  // onChange ={this.handleChange}
                />
              </div>

              <div className ="col-md-4">
                <label>Marker's Latitude</label>
                <input
                  type ="text"
                  name ="location_lat"
                  className ="form-control"
                  placeholder ="location_lat"
                  value ={this.state.location_lat}
                  // onChange ={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className ="row py-4">
            <div className ="col-md-8 offset-md-2 text-center">
              <h1 className =""> 
                Volunteer 
              </h1>
              <form onSubmit={this.handleSubmit}>
                <div className ="form-group col-md-4 offset-md-4">
                  <label htmlFor ="volTitle">Title</label>
                  <input
                    type ="text"
                    name ="title"
                    id ="volTitle"
                    className ="form-control"
                    placeholder ="title of request"
                    required
                    value ={this.state.title}
                    onChange ={this.handleChange}
                  />
                </div>          

                <div className ="form-group">
                  <label htmlFor ="volDescription">Description</label>
                  <textarea
                    type ="text"
                    name ="description"
                    id ="volDescription"
                    className ="form-control"
                    placeholder ="Describe what you will be providing, the more the detail the better"
                    rows ="5"
                    required
                    value ={this.state.description}
                    onChange ={this.handleChange}
                  />
                </div>

                <div className ="col-md-4 offset-md-4 pb-4">
                  <label htmlFor ="volType">Type of Request:</label>
                  <select id ="volType" className ="form-control">
                    <option disabled selected value>Select type of request</option>
                    <option value ="one-time">One-Time task</option>
                    <option value ="material-need">Material-Need</option>
                  </select>
                </div>
                <button type ="submit">Volunteer</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }


}

export default Volunteering