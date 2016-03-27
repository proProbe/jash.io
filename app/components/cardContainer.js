import React from 'react';
import Relay from 'react-relay';

import CardComponent from './cardComponent';

class CardContainer extends React.Component{
  renderCards = (data) => {
    return [...Array(5)].map((x, i) => {
      return (
        <div className="col s12 m6 l4" key={i}>
          <CardComponent translation={data}/>
        </div>
      )
    })
  }
  render() {
    let {translation} = this.props;
    return (
      <div>
        {this.renderCards(translation)}
      </div>
    )
  }
};

CardContainer = Relay.createContainer(CardContainer, {
  fragments: {
    translation: () => Relay.QL`
      fragment on Translation {
        keyword,
        english,
        japanese,
        ${CardComponent.getFragment('translation')}
      }
    `
  }
});

export default CardContainer;
