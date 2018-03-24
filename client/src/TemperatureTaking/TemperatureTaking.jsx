import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Row, Col, Media, ListGroupItem, Button } from 'reactstrap';

import { fetchStudentTemperatures, updateStudentTemperature } from './TemperatureActionCreator';

import './TemperatureTaking.css';

class TemperatureTaking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      inputTemperature: '',
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchStudentTemperatures());
  };

  handleChangeInputText = (parameter, value) => {
    const newState = this.state;
    newState[parameter] = value;
    this.setState(newState);
  };

  handleCardClick = (nric) => {
    this.setState({
      inputText: nric,
    });
  };

  handleButtonClick = () => {
    const regex = RegExp('^[0-9]{2}.[0-9]$');
    if (regex.test(this.state.inputTemperature)) {
      this.props.dispatch(
        updateStudentTemperature(this.state.inputText, parseInt(this.state.inputTemperature, 10))
      );
      this.setState({
        inputText: '',
        inputTemperature: '',
      });
    }
  };

  static partitionArray = (array, size) => array.map((e,i) => (i % size === 0)
                                                     ? array.slice(i, i + size)
                                                     : null)
    .filter((e) => e);

  static formatTemperature = (student) => {
    if (!student.lastUpdated > 0) {
      return 'NA';
    }
    return student.temperature.toFixed(1);
  };

  static formatLastUpdated = (student) => {
    const numericTime = parseInt(student.lastUpdated, 10);
    if (!numericTime > 0) {
      return 'Never';
    }
    const date = new Date(numericTime);
    //date.setUTCSeconds(numericTime);
    return date.toLocaleString('en-GB', {});
  }

  cardMapper = (student, index) => (
    <Col sm={3} key={`card-${index}`}>
      <ListGroupItem onClick={() => {this.handleCardClick(student.nric)}} className={'student-card'}>
        <div><b>{student.name}</b></div>
        <div><b>{student.nric}</b></div>
        <Media>
          <Media left>
            <Media object src={'/public/images/placeholder.png'} className={'student-media'}/>
          </Media>
          <Media body>
            Temperature:<br />
            <span className={'temperature-text temperature-green'}>
              {TemperatureTaking.formatTemperature(student)}
            </span>
            <br />
            Last Updated:<br />{TemperatureTaking.formatLastUpdated(student)}
          </Media>
        </Media>
      </ListGroupItem>
    </Col>
  );

  generateCards = (students) => {
    const filteredStudents = this.props.studentTemperatures.filter((student) => {
      const matchesName = student.name.includes(this.state.inputText.toUpperCase());
      const matchesNric = student.nric.includes(this.state.inputText.toUpperCase());
      return matchesName || matchesNric;
    });
    const mappedCards = filteredStudents.map(this.cardMapper);
    const partitionedCards = TemperatureTaking.partitionArray(mappedCards, 4);
    const deckedCards = partitionedCards.map((cards, index) => (
      <Row key={`deck-${index}`}>
        {cards}
      </Row>
    ));
    return deckedCards;
  }

  render = () => (
    <div>
      <Row>
        <Col sm={6}>
          <Input type={'text'}
                 onChange={(e) => {this.handleChangeInputText('inputText', e.target.value)}}
            value={this.state.inputText}
            placeholder={'Student Name or NRIC'}
            tabIndex={'1'} />
        </Col>
        <Col sm={4}>
          <Input type={'text'}
                 onChange={(e) => {this.handleChangeInputText('inputTemperature', e.target.value)}}
            value={this.state.inputTemperature}
            placeholder={'Temperature'}
            tabIndex={'2'} />
        </Col>
        <Col sm={2}>
          <Button color={'danger'} onClick={() => {this.handleButtonClick()}}>Submit</Button>
        </Col>
      </Row>
      <br />
      {this.generateCards(this.props.studentTemperatures)}
    </div>
  );
}

TemperatureTaking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  studentTemperatures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  studentTemperatures: state.temperature,
});

export default connect(mapStateToProps)(TemperatureTaking);
