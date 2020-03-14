import React from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker} from 'react-map-gl';
import MapPin from './MapPin';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }

  onClickMap(e) {
    console.log(e.lngLat);
  }

  onDblClick(e) {
    console.log("Hi", e.lngLat[0], e.lngLat[1]);
  }

  // _updateViewport = viewport => {
  //   this.setState({viewport});
  // };

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }
  
  // _onMarkerDragStart = event => {
  //   this._logDragEvent('onDragStart', event);
  // };
  
  // _onMarkerDrag = event => {
  //   this._logDragEvent('onDrag', event);
  // };
  
  _onMarkerDragEnd = event => {
    this._logDragEvent('onDragEnd', event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
    console.log("Longitude:",event.lngLat[0], "Latitude:", event.lngLat[1]);
  };

  render(){
    const {viewport, marker} = this.state;

    return (
      <div>
        <h1>Map, get involved now!</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
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
            <MapPin size={20} />
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

export default Map