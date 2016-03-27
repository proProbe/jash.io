import React from 'react';
import Relay from 'react-relay';

import JapaneseContainer from './japaneseContainer';
import EnglishContainer from './englishContainer';

class Main extends React.Component{
  static propTypes = {

  };

  static defaultProps = {

  };

  state = { searching: false };

  // Set state when new props arrives
  componentWillReceiveProps() {
    this.setState({ searching: false })
  };

  // No need to prebind the onchange as it is set as a property now
  onChange = (e) => {
    if(e.keyCode === 13) {
      let newWord = e.target.value;
      this.setState({ searching: true });
      this.props.relay.setVariables({
        word: newWord
      });
    }
  }

  render() {
    let {store} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s12">
            <input disabled={this.state.searching} id="keyword" type="text" className="validate" onKeyUp={this.onChange}/>
            <label htmlFor="keyword" className="active">Keyword</label>
          </div>
        </div>
        <div className="row">
            <div className="col s12 m6">
              <EnglishContainer english={store.translation.english} />
            </div>
            <div className="col s12 m6">
              <JapaneseContainer japanese={store.translation.japanese}/>
            </div>
        </div>

      </div>
    )
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    word: "testing"
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        translation (word: $word) {
          english {
            ${EnglishContainer.getFragment("english")}
          },
          japanese {
            ${JapaneseContainer.getFragment("japanese")}
          }
        }
      }
    `
  }
});

export default Main;
