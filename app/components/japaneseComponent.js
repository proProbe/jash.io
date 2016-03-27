import React from "react";
import Relay from "react-relay";

class JapaneseComponent extends React.Component {

  render() {
    let {japanese} = this.props;
    return (
        <div>
          <ruby style={{"fontSize": "150%"}}>
            <rb >
              {japanese.kanji}
            </rb>
            <rt>
              {japanese.furigana}
            </rt>
          </ruby>
        </div>
    )
  }
}

JapaneseComponent = Relay.createContainer(JapaneseComponent, {
  fragments: {
    japanese: () => Relay.QL`
      fragment on Japanese {
        furigana,
        kanji
      }
    `
  }
});

export default JapaneseComponent;
