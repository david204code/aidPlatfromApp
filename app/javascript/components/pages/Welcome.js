import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return(
      <div className ="container">
        <h1 className ="text-center">Aid Platform</h1>
        <h4 className ="text-center">Help those around you, your very own local
          neighbour aid platform for your neighbour!
        </h4>
        <div className ="row">
          <div className ="col-md-5 text-center" style={{backgroundColor: "lightblue"}}>
            <p className ="pt-4">
              We are connecting people and buidling a community in a time of need and 
              also in the time of goodness. Whether you want to provide generous help or 
              recieve help in time of difficulties....
            </p>
          </div>
          <div className ="col-md-5 text-center pt-4">
            <h5>Get involve now!</h5>
            <Link 
            to ="/registration"
            className =""
            role = "button"
            >
            <button className ="">
              Sign up here
            </button>
            </Link>
          </div>
        </div>

        <div className ="">
          <h3 className ="">Quick Guide</h3>
          <p>
            Sign up with an email address, password and a copy of government-approved ID (.jpg, .pgn, .pdf)
          </p>
          <p>
            Broswer the map for those who are requesting help.
          </p>
          <p>
            Need help yourself? Make your own request.
          </p>
        </div>
        <div className ="">
          <h3 className ="">Contact Us</h3>
          <p>

          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;