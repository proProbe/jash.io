import React from 'react';
import Relay from 'react-relay';

import JapaneseContainer from './japaneseContainer';
import EnglishContainer from './englishContainer';
import CardComponent from './cardComponent';

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

  componentDidMount() {
    document.getElementById('keyword').focus();
  }

  componentDidUpdate() {
    document.getElementById('keyword').focus();
  }

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

  renderCards = (store) => {
    [...Array(3)].map((x, i) => {
      console.log(x, i);
      return (
        <div className="col s12 m6 l4">
          <CardComponent translation={store.translation}/>
        </div>
      )
    })

  }

  render() {
    let {store} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s12">
            <input
              disabled={this.state.searching}
              id="keyword"
              type="text"
              className="validate"
              onKeyUp={this.onChange}/>
            <label htmlFor="keyword" className="active">Keyword</label>
          </div>
        </div>
        <div className="row">
          {this.renderCards(store)}
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
          ${CardComponent.getFragment('translation')}
        }
      }
    `
  }
});

export default Main;
