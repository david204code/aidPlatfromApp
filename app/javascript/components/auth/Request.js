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
    .then(response => {
      console.log(response)
      this.setState({community_request: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    const { community_request } = this.state;
    return( 
      <div>
        <h1>Hello</h1>
        <h2>{community_request.id}</h2>
        <h2>{community_request.title}</h2>
        <h2>{community_request.description}</h2>
        <h2>{community_request.request_type}</h2>
        <h2>{community_request.status}</h2>
        <h2>{community_request.fulfilled}</h2>
        
      </div>
    )
  }
}

export default Request;