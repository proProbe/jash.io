import React from 'react';
import Relay from 'react-relay';
import CardComponent from './cardComponent';

class CardContainer extends React.Component{
  renderCards = (translations) => {
    return translations.map((x, i) => {
      return (
        <div className="col s12 m6 l4" key={i}>
          <CardComponent translations={x}/>
        </div>
      )
    })
  }
  render() {
    let {translation} = this.props;
    return (
      <div>
        {this.renderCards(translation.translations)}
      </div>
    )
  }
};

CardContainer = Relay.createContainer(CardContainer, {
  fragments: {
    translation: () => Relay.QL`
      fragment on Translation {
        keyword,
        translations {
          ${CardComponent.getFragment('translations')}
        }
      }
    `
  }
});

export default CardContainer;
