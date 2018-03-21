import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Row, Col, Media, ListGroupItem } from 'reactstrap';

import { fetchStudentTemperatures } from './TemperatureActionCreator';

import './TemperatureTaking.css';

class TemperatureTaking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchStudentTemperatures());
  };

  handleChangeInputText = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleCardClick = (nric) => {
    this.setState({
      inputText: nric,
    });
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
    const date = new Date(0);
    date.setUTCSeconds(numericTime);
    return date.toLocaleString('en-GB', {});
  }

  static cardMapper = (student, index) => (
    <Col sm={3} key={`card-${index}`}>
      <ListGroupItem onClick={() => {this.handleCardClick(student.nric)}}>
        <div>{student.name}</div>
        <div>{student.nric}</div>
        <Media>
          <Media left>
            <Media object src={'/public/images/placeholder.png'} className={'student-media'}/>
          </Media>
          <Media body>
            Temperature:<br />{TemperatureTaking.formatTemperature(student)}<br />
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
    const mappedCards = filteredStudents.map(TemperatureTaking.cardMapper);
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
      <Input type={'text'}
             onChange={this.handleChangeInputText}
             value={this.state.inputText}
             placeholder={'Search'}
             tabIndex={'1'} />
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
