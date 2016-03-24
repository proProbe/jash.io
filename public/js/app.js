import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello
        something should be here!!!!
      </div>
    )
  }
}

ReactDOM.render(
  <Hello />,
document.getElementById('react')
)
