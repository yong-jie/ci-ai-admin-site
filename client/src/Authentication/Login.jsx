import React, { Component } from 'react';
import { Form, FormGroup, Label, Row, Col, Input } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <Form>
      <FormGroup row>
        <Label for={'username'} sm={2}>Username</Label>
        <Col sm={10}>
          <Input type={'text'} id={'username'} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={'password'} sm={2}>Password</Label>
        <Col sm={10}>
          <Input type={'password'} id={'password'} />
        </Col>
      </FormGroup>
    </Form>
  );
}

export default Login;
