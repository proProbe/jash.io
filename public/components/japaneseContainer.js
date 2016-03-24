import React from "react";
import Relay from "react-relay";

class JapaneseContainer extends React.Component {
  render() {
    let {japanese} = this.props;
    return (
      <div>
        <li>
          <a href="">{japanese.furigana}</a>

        </li>
        <li>
          <a href="">{japanese.kanji}</a>

        </li>
        <li>
          <a href="">{japanese.type}</a>

        </li>
        <li>
          <a href="">{japanese.level}</a>
        </li>
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
