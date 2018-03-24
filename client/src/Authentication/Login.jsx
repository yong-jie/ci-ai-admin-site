import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

import { loginUser } from './LoginActionCreator';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChangeValue = (field, value) => {
    const newState = {...this.state};
    newState[field] = value;
    this.setState(newState);
  };

  handleClick = () => {
    this.props.dispatch(loginUser(this.state.username, this.state.password, 1000));
  };

  renderAlerts = () => {
    if (this.props.login.error) {
      return (
        <Alert color={'danger'}>
          An error has occured.
        </Alert>
      );
    } else if (this.props.login.incorrectCredentials) {
      return (
        <Alert color={'danger'}>
          Incorrect username or password.
        </Alert>
      );
    }
  };

  render = () => (
    <div className={'login-box'}>
      {this.renderAlerts()}
      <Form>
        <FormGroup row>
          <Label for={'username'} sm={4}>Username</Label>
          <Col sm={8}>
            <Input tabIndex={'1'}
                   type={'text'}
                   id={'username'}
                   value={this.state.username}
                   onChange={(e) => {this.handleChangeValue('username', e.target.value)}}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for={'password'} sm={4}>Password</Label>
          <Col sm={8}>
            <Input tabIndex={'2'}
                   type={'password'}
                   id={'password'}
                   value={this.state.password}
                   onChange={(e) => {this.handleChangeValue('password', e.target.value)}}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Button color={'success'} onClick={(e) => {e.preventDefault(); this.handleClick()}} className={'login-button'}>Login</Button>
        </FormGroup>
      </Form>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
});

export default connect(mapStateToProps)(Login);
