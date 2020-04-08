import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password, password_confirmation } =this.state;

    axios
    .post("http://localhost:3000/registrations", 
    {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    },
    
    { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        this.props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log("registration error", error);
    });
    event.preventDefault();
  }
  
  render() {
    return (
      <div className ="container mt-5">
        <div className ="row">
          <div className ="col-md-6 offset-md-3">
            <h1 className ="mb-5 text-center text-muted">
              Join in by filling in this form!
            </h1>
            <form onSubmit={this.handleSubmit}>
              <div className ="form-group">
                <label htmlFor="">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  className="form-control"
                  value={this.state.email} 
                  onChange={this.handleChange} 
                  required 
                />
              </div>
              <div className ="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className ="form-group">
                <label>Confirm password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm password"
                  className ="form-control"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className ="text-center">
                <button type="submit" className ="btn btn-success mt-1">
                  Register
                </button>
              </div>
              <div className ="text-left">
                <Link 
                  to ="/"
                  className =""
                  role = "button"
                  >
                  <button className ="btn btn-light mt-1">
                    Log in instead
                  </button>
                </Link>
              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default Registration