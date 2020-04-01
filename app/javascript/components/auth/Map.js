import React from 'react';
import {render} from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import MapPin from './MapPin';
import Request from './Request';
import axios from 'axios';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      community_requests: [],

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

      popupInfo: null,

      event: {}
    };
  }

  onClickMap(e) {
    console.log(e.lngLat);
  }

  onDblClick(e) {
    console.log("Hi", e.lngLat[0], e.lngLat[1]);
  }

  // _logDragEvent(name, event) {
  //   this.setState({
  //     events: {
  //       ...this.state.events,
  //       [name]: event.lngLat
  //     }
  //   });
  // }
 
  // _onMarkerDragEnd = event => {
  //   this._logDragEvent('onDragEnd', event);
  //   this.setState({
  //     marker: {
  //       longitude: event.lngLat[0],
  //       latitude: event.lngLat[1]
  //     }
  //   });
  //   console.log("Longitude:",event.lngLat[0], "Latitude:", event.lngLat[1]);
  // };

  componentDidMount() {
    axios.get('/community_requests.json')
    .then(data => {
      let info = []
      data.data.data.map( (data) => {
        info.push(
          {
            id: data.id,
            title: data.title,
            description: data.description,
            request_type: data.request_type,
            location_long: data.location_long,
            location_lat: data.location_lat
          }
        )

        this.setState({community_requests: info})
      })
    })
    .catch(data => {

    })
  }

  // loadRequests = () => {
  //   return this.state.community_requests.map(community_request => {
  //     return (
  //       <Marker 
  //         key={community_request.id}
  //         latitude={parseFloat(community_request.location_lat)}
  //         longitude={parseFloat(community_request.location_long)}
  //       >
  //       </Marker>
  //     )
  //   })
  // }

  _onClickMarker = community_request => {
    this.setState({popupInfo: community_request});
    console.log(community_request.location_lat);
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(popupInfo.location_long)}
          latitude={parseFloat(popupInfo.location_lat)}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <Request info={popupInfo} />
        </Popup>
      )
    );
  }

  render(){
    // const {viewport, marker} = this.state;
    const {showPopup} = this.state;

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
          {this.state.community_requests.map(community_request => (
            <MapPin 
              {...this.state.community_requests}
              key={community_request.id}
              data={this.state.community_requests} 
              onClick={this._onClickMarker} />
          ))
          }
            {this._renderPopup()}
            {/* {this.loadRequests()}
          {this.state.community_requests.map(community_request => (
            <Marker
              {...this.state.community_requests}
                key={community_request.id}
                latitude={parseFloat(community_request.location_lat)}
                longitude={parseFloat(community_request.location_long)}
              > 
              <button
                className="marker-btn"
                  onClick={e => {
                    e.preventDefault();
                    // setSelectedPark(community_request);
                  }}
                >
                <img src="" alt="Skate Park Icon" />
              </button>
                  <MapPin size={20} onClick={this._onClickMarker} />
              {this._renderPopup()}
              {showPopup && <Popup
                  latitude={parseFloat(community_request.location_lat)}
                  longitude={parseFloat(community_request.location_long)}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => this.setState({showPopup: false})}
                  anchor="top"
                > 
                <div>
                  {community_request.title}
                </div>           
                </Popup>}  
            </Marker>
          ))} */}
          
            
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;