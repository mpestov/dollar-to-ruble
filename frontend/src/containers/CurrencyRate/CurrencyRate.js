import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import './CurrencyRate.css';
import { connect } from 'react-redux';
import * as websocketActions from '../../actions/websocket';


class CurrencyRate extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currencyRate: PropTypes.shape({
      value: PropTypes.string,
      expires: PropTypes.number,
    }).isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(websocketActions.open());
  }

  render() {
    const { currencyRate } = this.props;
    const loadingIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;
    return (
      <div className="CurrencyRate">
        { currencyRate.value ? (
          <div className="CurrencyRate-value">
            <h3>
              USD/RUB
            </h3>
            <h1>
              <strong>
                { currencyRate.value }
              </strong>
            </h1>
            <p>
              Last update:
              <span className="CurrencyRate-timestamp">
                { new Date(currencyRate.timestamp * 1000).toString() }
              </span>
            </p>
          </div>
        ) : (
          <Spin indicator={loadingIcon} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencyRate: state.websocket.message,
});

export default connect(mapStateToProps)(CurrencyRate);
