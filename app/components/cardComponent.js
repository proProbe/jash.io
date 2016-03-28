import React from 'react';
import Relay from 'react-relay';

import JapaneseComponent from './japaneseComponent';
import EnglishComponent from './englishComponent';
import Tags from './tags.js';

class CardComponent extends React.Component{

  render() {
    let {translations} = this.props;
    return (
      <div className="card green darken-1 hoverable">
        <div className="card-content white-text">
          <div className="card-title">
            {/*{translations.keyword}*/}
          </div>
          <div className="row">
            <div className="col s12 m4">
              <JapaneseComponent japanese={translations.japanese}/>
            </div>
            <div className="col s12 m8">
              <EnglishComponent english={translations.english} />
            </div>
          </div>
          <div className="row">
            <Tags japanese={translations.japanese}/>
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
    translations: () => Relay.QL`
      fragment on Translations {
        english {
          ${EnglishComponent.getFragment("english")}
        },
        japanese {
          ${JapaneseComponent.getFragment("japanese")},
          ${Tags.getFragment("japanese")}
        }
      }
    `
  }
});

export default CardComponent;
