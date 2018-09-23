import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Form,
  InputNumber,
  DatePicker,
  Button,
} from 'antd';
import * as forcedCurrencyRateActions from '../../actions/forced-currency-rate';

class ForcedCurrencyRateForm extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
    }).isRequired,
    forcedCurrencyRate: PropTypes.shape({
      rate: PropTypes.string,
      expires: PropTypes.string,
    }).isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(forcedCurrencyRateActions.requestItem('last'));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        dispatch(forcedCurrencyRateActions.create(values));
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, forcedCurrencyRate } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="Rate"
        >
          {getFieldDecorator('rate', {
            initialValue: forcedCurrencyRate.rate,
            rules: [{
              required: true, message: 'Please input rate value',
            }],
          })(
            <InputNumber min={0.0001} max={999.9999} step={0.0001} precision={4} />,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Expires at"
        >
          {getFieldDecorator('expires', {
            initialValue:
              forcedCurrencyRate.expires ? moment(forcedCurrencyRate.expires) : moment(),
            rules: [{
              required: true, message: 'Please input expires at value',
            }],
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 2 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  forcedCurrencyRate: state.forcedCurrencyRate.item,
});

export default Form.create()(connect(mapStateToProps)(ForcedCurrencyRateForm));
