import React from "react";
import Relay from "react-relay";

class JapaneseContainer extends React.Component {
  render() {
    let {japanese} = this.props;
    return (
      <div className="card green darken-1 hoverable">
        <div className="card-content white-text">
          <div className="card-title">
              {/*Jap Translation*/}
              {japanese.kanji}
          </div>
          <p>
            {japanese.furigana}
            {japanese.type}
          </p>
          <div className="card-action">
            <p>
              {japanese.level}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

JapaneseContainer = Relay.createContainer(JapaneseContainer, {
  fragments: {
    japanese: () => Relay.QL`
      fragment on Japanese {
        furigana,
        kanji,
        type,
        level
      }
    `
  }
});

export default JapaneseContainer;
