import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
function NavHeader (props) {
  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<Icon size='lg' type='left' color='#333' />}
      onLeftClick={() => props.history.go(-1)}>
      {props.children}
    </NavBar>
  )
}
export default withRouter(NavHeader)