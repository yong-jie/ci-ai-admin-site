import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Row, Col, Input } from 'reactstrap';
import { radioColumn, dateInput, textInput, textAreaInput, numberInput } from './Util';

class StudentInformation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const level = (
      <FormGroup row>
        <Col sm={2}>
          Level:
        </Col>
        {radioColumn(2, 'level', 'PG', 'level-pg')}
        {radioColumn(2, 'level', 'N1', 'level-n1')}
        {radioColumn(2, 'level', 'N2', 'level-n2')}
        {radioColumn(2, 'level', 'K1', 'level-k1')}
        {radioColumn(2, 'level', 'K2', 'level-k2')}
      </FormGroup>
    );
    const session = (
      <FormGroup row>
        <Col sm={2}>
          Session:
        </Col>
        {radioColumn(2, 'session', 'Full Day', 'session-fullday')}
        {radioColumn(2, 'session', 'Half Day (AM)', 'session-halfday-am')}
        {radioColumn(2, 'session', 'Half Day (PM)', 'session-halfday-pm')}
        {radioColumn(4, 'session', 'Emergency Care', 'session-emergency-care')}
      </FormGroup>
    );
    const dateOfEntry = dateInput(2, 10, 'Expected Date of Entry:', 'date-of-entry');
    const name = textInput(2, 10, 'Name:', 'name');
    const chineseName = textInput(2, 10, 'Chinese Name (if any):', 'chinese-name');
    const gender = (
      <FormGroup row>
        <Col sm={2}>
          Gender:
        </Col>
        {radioColumn(2, 'gender', 'Male', 'gender-male')}
        {radioColumn(2, 'gender', 'Female', 'gender-female')}
      </FormGroup>
    );
    const address = textAreaInput(2, 10, 'Address:', 'address');
    const birthCertificate = textInput(2, 10, 'Birth Certificate Number:', 'birth-certificate');
    const dateOfBirth = dateInput(2, 10, 'Date of Birth:', 'date-of-birth');
    const age = numberInput(2, 10, 'Age:', 'age');
    const placeOfBirth = textInput(2, 10, 'Place of Birth:', 'place-of-birth');
    const nationality = textInput(2, 10, 'Nationality:', 'nationality');
    const race = textInput(2, 10, 'Race:', 'race');
    return (
      <Form>
        {level}
        {session}
        {dateOfEntry}
        {name}
        {chineseName}
        {gender}
        {address}
        {birthCertificate}
        {dateOfBirth}
        {age}
        {placeOfBirth}
        {nationality}
        {race}
      </Form>
    );
  }
}

StudentInformation.propTypes = {

};

export default StudentInformation;
