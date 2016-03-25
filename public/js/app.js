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
    renderLoading={() => {
      return (
        <div className="valign-wrapper">
          <div className="valign row">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <p>Loading...</p>
          </div>
        </div>
      );
    }}
  />,
  document.getElementById('react')
);
