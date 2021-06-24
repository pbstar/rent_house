import React from 'react'
import Carousel from './components/carousel'
import Search from './components/search'
import Nav from './components/nav'
import Groups from './components/groups'
import News from './components/news'
import './index.scss'
class fn extends React.Component {
  render () {
    return (
      <div className="home">
        <Carousel />
        <Search />
        <Nav />
        <Groups />
        <News />
      </div>
    )
  }
}
export default fn