import React, { PureComponent } from 'react';

class Requests extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.title}, ${info.description}`;
    return (
      <div>
        <div>
          {/* {displayName} |{' David '} */}
          <h3>{info.title}</h3>
          <p>{info.description}</p>
          <p>{info.request_type}</p>
        </div>
        <img width={240} src={info.image} />
      </div>
    );
  }
}

export default Requests;