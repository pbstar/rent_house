import React from 'react'
import TableBar from './components/TableBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import House from './pages/house'
import News from './pages/news'
import Mine from './pages/mine'
class fn extends React.Component {
  render () {
    return (
      <Router>
        <div className="app">
          <Route path="/" exact component={Home}></Route>
          <Route path="/app/home" component={Home}></Route>
          <Route path="/app/house" component={House}></Route>
          <Route path="/app/news" component={News}></Route>
          <Route path="/app/mine" component={Mine}></Route>
          <TableBar />
        </div>
      </Router>
    )
  }
}
export default fn