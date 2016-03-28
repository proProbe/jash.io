import React from 'react';
import Relay from 'react-relay';

import CardContainer from './cardContainer';

class Main extends React.Component{
  static propTypes = {

  };

  static defaultProps = {

  };

  state = { searching: false };

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
      this.props.relay.setVariables({
        word: newWord
      }, (readyState) => {
        if (!readyState.done) {
          return this.setState({ searching: true });
        }
        return this.setState({ searching: false });
      });
    }
  }

  renderInputField = () => {
    return (
      <div className="input-field col s12">
        <input
          disabled={this.state.searching}
          id="keyword"
          type="text"
          className="validate"
          onKeyUp={this.onChange}/>
        <label htmlFor="keyword" className="active">Keyword</label>
      </div>
    );
  }

  render() {
    let {store} = this.props
    return (
      <div className="container">
        <div className="row">
          {this.renderInputField()}
        </div>
        <div className="row">
          <CardContainer translation={store.translation} />
        </div>
      </div>
    )
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    word: ""
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        translation (word: $word) {
          ${CardContainer.getFragment('translation')}
        }
      }
    `
  }
});

export default Main;
