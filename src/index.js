import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Home from './pages/home'
import Map from './pages/Map'
import SiteList from './pages/SiteList'
class Fn extends React.Component {
  render () {
    return (
      <Router>
        <div className="index">
          <Route path="/" exact component={App}></Route>
          <Route path="/app" component={App}></Route>
          <Route path="/map" exact component={Map}></Route>
          <Route path="/siteList" exact component={SiteList}></Route>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<Fn />, document.getElementById('root'));