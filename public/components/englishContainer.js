import React from "react";
import Relay from "react-relay";

class EnglishContainer extends React.Component {
  render() {
    let {english} = this.props;
    return (
      <div>
        <li>
          <a href="">{english.meaning}</a>
        </li>
        <li>
          <a href="">{english.tags}</a>
        </li>
        <li>
          <a href="">{english.number}</a>
        </li>
      </div>
    )
  }
}

EnglishContainer = Relay.createContainer(EnglishContainer, {
  fragments: {
    english: () => Relay.QL`
      fragments on English {
        meaning,
        tags,
        number
      }
    `
  }
});

export default EnglishContainer;
