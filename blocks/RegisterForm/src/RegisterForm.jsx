/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './RegisterForm.scss';

const { Row, Col } = Grid;

export default class RegisterForm extends Component {
  static displayName = 'RegisterForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: undefined,
        passwd: undefined,
        rePasswd: undefined,
        checkbox: false,
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      console.log('values', values);
    });
  };

  render() {
    return (
      <div className="register-form">
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>注册</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <Row style={styles.formItem}>
                <Col>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="account" required message="必填">
                    <Input maxLength={20} placeholder="会员名/邮箱/手机号" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请输入密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="rePasswd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  登 录
                </Button>
              </Row>

              <Row className="tips" style={styles.tips}>
                <a href="/" style={styles.link}>
                  立即注册
                </a>
                <span style={styles.line}>|</span>
                <a href="/" style={styles.link}>
                  忘记密码
                </a>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '18px',
    top: '5px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
