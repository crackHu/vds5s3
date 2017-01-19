import React, {
  PropTypes
} from 'react'
import {
  Link
} from 'react-router';
import {
  Layout,
  Menu,
  Icon
} from 'antd';
const {
  Header,
  Sider,
  Content
} = Layout;
import './HomePage.css';

export default class HomePage extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/nav1">
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/nav2">
                  <Icon type="video-camera" />
                  <span className="nav-text">nav 2</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/LogoGather">
                  <Icon type="upload" />
                  <span className="nav-text">nav 3</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.object.isRequired,
}