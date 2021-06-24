import React, { Component } from "react";
import { NavBar, Icon, Toast } from 'antd-mobile';
import axios from 'axios'
import { getCurrentCity } from '../utils'
import './index.scss'
import { AutoSizer, List } from 'react-virtualized';

const NAME_HEIGHT = 50
const TITLE_HEIGHT = 40
const cityMessage = ['北京', '上海', '广州', '深圳']
class CityList extends Component {
  constructor() {
    super()
    this.listComponent = React.createRef()
  }
  state = {
    cityIndex: [],
    cityList: {},
    activeIndex: 0
  }
  componentDidMount () {
    this.getCitylist()

  }

  async getCitylist () {

    /**
     * 获取全部城市
     * 获取当前城市
     * 获取热门城市
     * 将获取到的城市放到一个对象
     */
    // 获取全部城市
    const allRes = await axios.get('http://127.0.0.1:3300/area/city?level=1')
    const allCity = allRes.data.body
    const { cityIndex, cityList } = this.formatData(allCity)
    // console.log(cityIndex);
    // 获取热门城市
    const hotRes = await axios.get('http://127.0.0.1:3300/area/hot')
    // console.log(hotRes);
    const hotCity = hotRes.data.body
    cityList['hot'] = hotCity
    cityIndex.unshift('hot')


    //获取当前城市
    const localCity = await getCurrentCity()
    cityList['#'] = [localCity]
    cityIndex.unshift('#')

    // console.log(cityIndex);
    // console.log(cityList);

    this.setState({
      cityList: cityList,
      cityIndex: cityIndex
    })
  }
  // 将获取的城市列表进行格式化
  formatData (list) {
    const cityList = {}
    let cityIndex = [] // 存储城市首字母
    list.forEach(item => {
      let first = item.short.substr(0, 1)
      if (cityList[first]) {
        cityList[first].push(item)
      } else {
        cityList[first] = []
        cityList[first].push(item)
      }
    })
    cityIndex = Object.keys(cityList).sort()
    return {
      cityList: cityList,
      cityIndex: cityIndex
    }
  }
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在List中是可见的
    style // 重点属性：一定要给每一个行数添加该样式

  }) => {
    let letter = this.state.cityIndex[index]
    let citys = this.state.cityList[letter]
    return (
      <div key={key} style={style}
        className='city'>
        <div className='title'>{letter}</div>
        {
          citys.map(item => {
            return (
              <div className='name' key={item.value} onClick={this.changeCity.bind(this, item)}>{item.label}</div>
            )
          })
        }
      </div>
    )
  }
  // 计算每行高度
  getRowHeight = ({ index }) => {
    // return TITLE_HEIGHT + NAME_HEIGHT * this.state.cityList[this.state.cityIndex[index]].length
    let letter = this.state.cityIndex[index]
    // console.log(letter);
    return TITLE_HEIGHT + NAME_HEIGHT * this.state.cityList[letter].length
  }
  renderCityIndex () {
    return this.state.cityIndex.map((item, index) => {
      // console.log(item, index);
      return (
        <li className="city-index-item" key={item} onClick={this.scrollToRow.bind(this, index)}>
          {/*判断一下，如果高亮状态的索引等于当前索引，那么就设置高亮样式*/}
          <span className={this.state.activeIndex === index ? 'index-active'
            : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
        </li>
      )
    })
  }
  //  点击城市索引高亮
  scrollToRow = (cityIndex) => {
    this.listComponent.current.scrollToRow(cityIndex)
  }
  // 获取滚动时候,相应的数据
  rowRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })

    }
  }
  changeCity = ({ label, value }) => {
    if (cityMessage.indexOf(label) !== -1) {
      sessionStorage.setItem('local', JSON.stringify({ label, value }))
      this.props.history.push('/')
    } else {
      Toast.info('该城市暂时没有房源信息', 1)
    }
  }
  render () {
    return (
      <div className='citylist'>
        <NavBar
          className='navbar'
          mode="dark"
          icon={<Icon type='left' className='iconfont icon-fanhui'></Icon >}
          onLeftClick={() => this.props.history.go(-1)}
        >城市列表
        </NavBar>
        {/* 展示城市 */}
        <AutoSizer>
          {
            ({ width, height }) => {
              return <List
                ref={this.listComponent}
                scrollToAlignment='start'
                // 组件的宽度
                width={width}
                // 组件的高度
                height={height}
                // 每行的高度
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
                rowCount={this.state.cityIndex.length}
                onRowsRendered={this.rowRendered}>

              </List>


            }
          }
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="city-index">
          {
            this.renderCityIndex()
          }
        </ul>

      </div>
    )
  }
}

export default CityList