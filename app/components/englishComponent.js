import React from "react";
import Relay from "react-relay";

class EnglishComponent extends React.Component {
  render() {
    let {english} = this.props;
    return (
      <div>
        {/*<p>
          {english.number}
        </p>*/}
        <p>
          {english.tags}
        </p>
        <p>
          {english.meaning}
        </p>
      </div>
    )
  }
}

EnglishComponent = Relay.createContainer(EnglishComponent, {
  fragments: {
    english: () => Relay.QL`
      fragment on English {
        meaning,
        tags,
        number
      }
    `
  }
});

export default EnglishComponent;
