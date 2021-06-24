import { Flex, Grid } from 'antd-mobile';
import React from 'react'
import axios from 'axios'
class fn extends React.Component {
  state = {
    groups: []
  }
  async getGroups () {
    let { data: res } = await axios.get('http://localhost:3300/home/groups', {
      params: {
        'area': 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    if (res.status !== 200) {
      console.error(res.description)
      return
    }
    this.setState({
      groups: res.body
    })
  }
  componentDidMount () {
    this.getGroups()
  }
  renderGroups (item) {
    return (
      <Flex
        className="group-item"
        justify="around">
        <div className="desc">
          <p className="title">{item.title}</p>
          <span className="info">{item.desc}</span>
        </div>
        <img src={`http://localhost:3300${item.imgSrc}`} alt="" />
      </Flex>
    )
  }
  render () {
    return (
      <div className="group">
        <h3 className="group-title">
          租房小组
         <span className="more">更多</span>
        </h3>
        <Grid
          data={this.state.groups}
          columnNum={2}
          square={false}
          hasLine={false}
          renderItem={item => this.renderGroups(item)}
        />
      </div>
    )
  }
}
export default fn