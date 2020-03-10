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

  render(){
    return (
      <ReactMapGL
        {...this.state.viewport}
        width="80vw"
        height="80vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={TOKEN}
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
    );
  }
}

export default Map