import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';
import Relay from 'react-relay';

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => {
      return Relay.QL`
      query MainQuery {
        store { ${Component.getFragment('store')} }
      }
    `
  }
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={Main}
    route={new HomeRoute()}
  />,
  document.getElementById('react')
);
