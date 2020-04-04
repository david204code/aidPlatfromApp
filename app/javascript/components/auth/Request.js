import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Request extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      community_request: []
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios.get(`/community_requests/${id}`)
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

        this.setState({community_request: info})
      })
    })
    .catch(data => {

    })
  }

  render() {
    const { community_request } = this.state;
    // const displayName = `${community_request.title}, ${community_request.description}`;
    return( 
      <div>
        <h1>Hello</h1>
        <h2>d{community_request.title}</h2>
      </div>
    )
  }
}

export default Request;