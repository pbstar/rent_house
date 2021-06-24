import { Carousel } from 'antd-mobile';
import React from 'react'
import axios from 'axios'
class fn extends React.Component {
  state = {
    swipers: [],
    isSwiperLoaded: false
  }
  componentDidMount () {
    this.getSwipers()
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  async getSwipers () {
    let { data: res } = await axios.get('http://localhost:3300/home/swiper')
    if (res.status !== 200) {
      console.error(res.description)
      return
    }
    this.setState({
      swipers: res.body,
      isSwiperLoaded: true
    })
  }
  renderSwipers () {
    return this.state.swipers.map(item => (
      <a
        key={item.id}
        href="http://www.itcast.cn"
        style={{
          display: 'inline-block',
          width: '100%', height: 212
        }} >
        <img
          src={`http://localhost:3300${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }} />
      </a>))
  }
  render () {
    return (
      <div className="carousel">
        {this.state.isSwiperLoaded ? (<Carousel
          autoplay={true}
          infinite
          autoplayInterval='2000' >
          {this.renderSwipers()}
        </Carousel>) : ('')}
      </div>
    )
  }
}
export default fn