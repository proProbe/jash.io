import React from "react";
import Relay from "react-relay";
import classNames from 'classnames';
import '../styles/label.css';

class Tags extends React.Component {
  chipClasses = (attr) => {
    return classNames({
      'color-label': true,
      'blue darken-1': true,
      'z-depth-1': true,
      'hide': attr === ""
    })
  }
  render() {
    let {japanese} = this.props;

    return (
        <div>
          <div className={this.chipClasses(japanese.type)}>
            {japanese.type}
          </div>
          <div className={this.chipClasses(japanese.level)}>
            {japanese.level}
          </div>
        </div>
    )
  }
}

Tags = Relay.createContainer(Tags, {
  fragments: {
    japanese: () => Relay.QL`
      fragment on Japanese {
        type,
        level
      }
    `
  }
});

export default Tags;
