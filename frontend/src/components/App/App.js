import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import {
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import CurrencyRate from '../../containers/CurrencyRate/CurrencyRate';
import ForcedCurrencyRateForm from '../../containers/ForcedCurrencyRateForm/ForcedCurrencyRateForm';

const { Header, Content } = Layout;

const App = (props) => {
  const { location } = props;
  return (
    <Layout className="App-layout">
      <Header>
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          className="App-menu"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin">
            <Link to="/admin">
              Admin
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="App-content"
      >
        <Switch>
          <Route path="/" exact strict sensitive component={CurrencyRate} />
          <Route path="/admin" exact strict sensitive component={ForcedCurrencyRateForm} />
        </Switch>
      </Content>
    </Layout>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(App);
