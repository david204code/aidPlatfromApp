import React from 'react';
import axios from 'axios';
import ReactMapGL, {Marker} from 'react-map-gl';
import SetPin from './SetPin';
import 'mapbox-gl/dist/mapbox-gl.css';
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
        {/* <Map /> */}
        <ReactMapGL
          {...this.state.viewport}
          width="60vw"
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
            name ="location_long"
            placeholder ="location_long"
            value ={this.state.location_long}
            onChange ={this.handleChange}
          />

          <input
            type ="text"
            name ="location_lat"
            placeholder ="location_lat"
            value ={this.state.location_lat}
            onChange ={this.handleChange}
          />

          <button type ="submit">Volunteer</button>
        </form>
      </div>
    )
  }


}

export default Volunteering