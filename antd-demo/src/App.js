import React, { Component } from 'react';
import './style/common.less'

class App extends Component {
  render() {
    return (
        <div>
           {this.props.children}
        </div>
    );
  }
}

export default App;
