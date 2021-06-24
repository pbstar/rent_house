import React from 'react'
import './index.scss'
import NavBar from '../components/Navbar'
class fn extends React.Component {
  componentDidMount () {
    var map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(115.551458, 38.873506);
    map.centerAndZoom(point, 15);
    // this.props.history.go(0)
  }
  render () {
    return (
      <div className='map'>
        <NavBar>地图找房</NavBar>
        <div id="container"></div>
      </div>
    )
  }
}
export default fn