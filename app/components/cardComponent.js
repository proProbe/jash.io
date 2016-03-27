import React from 'react';
import Relay from 'react-relay';

import JapaneseContainer from './japaneseContainer';
import EnglishContainer from './englishContainer';
import Tags from './tags.js';

class CardComponent extends React.Component{

  render() {
    let {translation} = this.props;
    return (
      <div className="card green darken-1 hoverable">
        <div className="card-content white-text">
          <div className="card-title">
            {translation.keyword}
          </div>
          <hr/>
          <div className="row">
            <div className="col s12 m4">
              <JapaneseContainer japanese={translation.japanese}/>
            </div>
            <div className="col s12 m8">
              <EnglishContainer english={translation.english} />
            </div>
          </div>
          <div className="row">
            <Tags japanese={translation.japanese}/>
          </div>
        </div>
        {/*<div className="card-action">

        </div>*/}
      </div>
    )
  }
};

CardComponent = Relay.createContainer(CardComponent, {
  fragments: {
    translation: () => Relay.QL`
      fragment on Translation {
        keyword,
        english {
          ${EnglishContainer.getFragment("english")}
        },
        japanese {
          ${JapaneseContainer.getFragment("japanese")},
          ${Tags.getFragment("japanese")}
        }
      }
    `
  }
});

export default CardComponent;
