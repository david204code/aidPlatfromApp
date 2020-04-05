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
        <section className ="jumbotron jumbotron-fluid text-center">
          <div className ="container py-1">
            <h1 className ="display-4">
              Request
            </h1>
            <p className ="lead">
              We are connecting people in our community to help and support each other
            </p>
          </div>
        </section>

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
        
        <div className ="container py-1">
          <h1 className ="text-center display-4">
            Request title: {community_request.title}
          </h1>

          <h2>Request ID: {community_request.id}</h2>
          <h2>Description
          </h2>
            <p>
              {community_request.description}  
            </p>
          <h2>Type of Request: {community_request.request_type}</h2>
          <p>Status of the request: This request has {community_request.status} of responds</p>
          <p>This request is {community_request.fulfilled} currently</p>
        </div>
        
      </div>
    )
  }
}

export default Request;