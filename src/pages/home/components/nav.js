import { Flex } from 'antd-mobile';
import React from 'react'
import { withRouter } from 'react-router-dom'
import nav1 from '../images/整租.png'
import nav2 from '../images/合租.png'
import nav3 from '../images/地图.png'
import nav4 from '../images/出租.png'
class fn extends React.Component {
  renderNavs () {
    const navs = [{
      id: 0,
      img: nav1,
      title: '整租',
      path: '/home/list'
    }, {
      id: 1,
      img: nav2,
      title: '合租',
      path: '/home/list'
    }, {
      id: 2,
      img: nav3,
      title: '地图找房',
      path: '/map'
    }, {
      id: 3,
      img: nav4,
      title: '去出租',
      path: '/home/list'
    }]
    return navs.map(item => {
      return (
        <Flex.Item
          key={item.id}
          onClick={() => {
            this.props.history.push(item.path)
          }}>
          <img src={item.img} alt="" />
          <h2>{item.title}</h2>
        </Flex.Item>)
    })
  }
  render () {
    return (
      <div className="index">
        <Flex className="nav"> {this.renderNavs()} </Flex>
      </div>
    )
  }
}
export default withRouter(fn)