import React from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker} from 'react-map-gl';

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
      }
    };
  }

  onClickMap(e) {
    console.log(e.lngLat);
  }

  render(){
    return (
      <div>
        <h1>Map, get involved now!</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <ReactMapGL
          {...this.state.viewport}
          width="80vw"
          height="80vh"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => this.setState({viewport})}
          mapboxApiAccessToken={TOKEN}
          onClick ={this.onClickMap}
          >
          <Marker 
            latitude={51.508} 
            longitude={-0.140} 
            offsetLeft={-20} 
            offsetTop={-10}
            >
            <button>You are here</button>
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

export default Map