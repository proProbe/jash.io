import React from 'react';
import Relay from 'react-relay';

import JapaneseContainer from './japaneseContainer';
import EnglishContainer from './englishContainer';

class Main extends React.Component{
  static propTypes = {

  }

  static defaultProps = {

  }



  // No need to prebind the onchange as it is set as a property now
  onChange = () => {

  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <input type="text"/>
        <EnglishContainer english={this.props.store.english} />
        <hr/>
        <JapaneseContainer japanese={this.props.store.japanese}/>
      </div>
    )
  }
}

Main = Relay.createContainer(Main, {
  initialVariables:{
    word: "testing"
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store{
        english {
          ${EnglishContainer.getFragment('english')}
        },
        japanese {
          ${JapaneseContainer.getFragment('japanese')}
        }
      }
    `
  }
})

export default Main;
