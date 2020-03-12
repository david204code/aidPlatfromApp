import React from 'react';
import axios from 'axios';

class Volunteering extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      title: "", 
      description: "",
      volunteeringErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    
    axios
    .post("http://localhost:3000/community_requests",
      {
        communityRequest: {
          title: this.state.title,
          description: this.state.description
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

          <button type ="submit">Volunteer</button>
        </form>
      </div>
    )
  }


}

export default Volunteering