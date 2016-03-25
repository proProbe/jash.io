import React from "react";
import Relay from "react-relay";

class EnglishContainer extends React.Component {
  render() {
    let {english} = this.props;
    return (
      <div className="card blue darken-1">
        <div className="card-content white-text">
          <div className="card-title">
              {english.number}
          </div>
          <p>
            {english.meaning}
            {english.tags}
          </p>
          <div className="card-action">
            <p>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

EnglishContainer = Relay.createContainer(EnglishContainer, {
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

export default EnglishContainer;
