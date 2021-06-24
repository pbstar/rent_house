import { Flex, WingBlank } from 'antd-mobile';
import React from 'react'
import axios from 'axios'
class fn extends React.Component {
  state = {
    news: []
  }
  async getNews () {
    let { data: res } = await axios.get('http://localhost:3300/home/news', {
      params: {
        'area': 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    if (res.status !== 200) {
      console.error(res.description)
      return
    }
    this.setState({
      news: res.body
    })
  }
  componentDidMount () {
    this.getNews()
  }
  renderNews () {
    return this.state.news.map(item => {
      return (
        <div
          className="news-item"
          key={item.id}
        >
          <div className="imgwrap">
            <img
              className="img"
              src={`http://localhost:3300${item.imgSrc}`}
              alt="" />
          </div>
          <Flex
            className="content"
            direction="column"
            justify="between">
            <h3 className="title">
              {item.title}
            </h3>
            <Flex
              className="info"
              justify="between">
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex> </Flex>
        </div>
      )
    })
  }
  render () {
    return (
      <div className="news">
        <h3 className="group-title">最新资讯</h3>
        <WingBlank size="md">
          {this.renderNews()}
        </WingBlank>
      </div>
    )
  }
}
export default fn