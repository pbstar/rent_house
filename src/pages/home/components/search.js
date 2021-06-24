import { Flex } from 'antd-mobile';
import React from 'react'
import { withRouter } from 'react-router-dom'
import { getCurrentCity } from '../../../utils'
class fn extends React.Component {
  state = {
    cityName: '定位中',
    cityStyle: 'city 1s infinite',
    cityId: ''
  }
  // getCity () {
  //   const myCity = new BMap.LocalCity()
  //   myCity.get((res) => {
  //     this.setState({
  //       groups: res.name
  //     })
  //   })
  // }
  async componentDidMount () {
    const localCity = await getCurrentCity()
    this.setState({
      cityId: localCity.value,
      cityName: localCity.label,
      cityStyle: ''
    })
  }
  render () {
    return (
      <div className="index">
        <Flex className='search-box'>
          {/* 左侧白色区域 */}
          <Flex className="search">
            {/* 位置 */}
            <div className="location" onClick={() => this.props.history.push('/sitelist')}>
              <span style={{ animation: this.state.cityStyle }} className="name">{this.state.cityName}</span>
              <i className="iconfont icon-arrow" />
            </div>
            {/* 搜索表单 */}
            <div className="form">
              <i className="iconfont icon-seach" />
              <span className="text">请输入小区或地址</span>
            </div>
          </Flex>
          {/* 右侧地图图标 */}
          <i className="iconfont icon-map" />
        </Flex>
      </div>
    )
  }
}
export default withRouter(fn)