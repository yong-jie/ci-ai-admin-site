import React from 'react';
import {FormGroup, Col, Label, Input } from 'reactstrap';
import './StudentInformation.css';

export const radioColumn = (ratio, name, value, id) => (
  <Col sm={ratio}>
    <FormGroup check>
      <Label check for={id}>
        <Input type="radio" id={id} name={name} />{' '}
        {value}
      </Label>
    </FormGroup>
  </Col>
);

export const dateInput = (labelRatio, inputRatio, label, id) => (
  <FormGroup row>
    <Col sm={labelRatio}>
      <Label for={id}>{label}</Label>
    </Col>
    <Col sm={inputRatio}>
      <Input id={id} type="date" />
    </Col>
  </FormGroup>
);

export const textInput = (labelRatio, inputRatio, label, id) => (
  <FormGroup row>
    <Col sm={labelRatio}>
      <Label for={id}>{label}</Label>
    </Col>
    <Col sm={inputRatio}>
      <Input id={id} type="text" />
    </Col>
  </FormGroup>
);

export const textAreaInput = (labelRatio, inputRatio, label, id) => (
  <FormGroup row>
    <Col sm={labelRatio}>
      <Label for={id}>{label}</Label>
    </Col>
    <Col sm={inputRatio}>
      <Input id={id} type="textarea" />
    </Col>
  </FormGroup>
);

export const numberInput = (labelRatio, inputRatio, label, id) => (
  <FormGroup row>
    <Col sm={labelRatio}>
      <Label for={id}>{label}</Label>
    </Col>
    <Col sm={inputRatio}>
      <Input id={id} type="number" className={'no-spinners'} />
    </Col>
  </FormGroup>
);
