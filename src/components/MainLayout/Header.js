import React, { Component } from 'react';
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
// import {Menu,Icon} from 'antd'
import { connect } from 'dva';

import { Link } from 'dva/router'

class Header extends Component {
  render() {
    // const { location } = this.props;
    return (
      <Menu
        // selectedKeys={[location.pathname]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="/tests">
          <Link to="/tests">
            <Icon type="bars" />tests
          </Link>
        </Menu.Item>
       <Menu.Item key="/users">
          <Link to="/users">
            <Icon type="bars" />Users
          </Link>
        </Menu.Item>
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" />Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/404">
          <Link to="/page-you-dont-know">
            <Icon type="frown-circle" />404
          </Link>
        </Menu.Item>
        <Menu.Item key="/antd">
          <a href="https://github.com/dvajs/dva">dva</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default connect()(Header)
