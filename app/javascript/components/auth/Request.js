import React, { PureComponent } from 'react';

class Request extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.title}, ${info.description}`;
    return (
      <div>
        <div>
          {displayName} |{' '}
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a>
        </div>
        <img width={240} src={info.image} />
      </div>
    );
  }
}

export default Request;