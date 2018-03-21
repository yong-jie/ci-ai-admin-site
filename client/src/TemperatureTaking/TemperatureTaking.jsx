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

  static partitionArray = (array, size) => array.map((e,i) => (i % size === 0) ? array.slice(i, i + size) : null)
    .filter((e) => e);

  generateCards = (students) => {
    const filteredStudents = this.props.studentTemperatures.filter((student) => {
      const matchesName = student.name.includes(this.state.inputText.toUpperCase());
      const matchesNric = student.nric.includes(this.state.inputText.toUpperCase());
      return matchesName || matchesNric;
    });
    const mappedCards = filteredStudents.map((student, index) => (
      <Col sm={3} key={`card-${index}`}>
        <ListGroupItem onClick={() => {this.handleCardClick(student.nric)}}>
          <div>{student.name}</div>
          <div>{student.nric}</div>
          <Media>
            <Media left>
              <Media object src={'/public/images/placeholder.png'} className={'student-media'}/>
            </Media>
            <Media body>
              Hi
            </Media>
          </Media>
        </ListGroupItem>
      </Col>
    ));
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
