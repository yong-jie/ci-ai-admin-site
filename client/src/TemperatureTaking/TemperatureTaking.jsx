import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Card, CardTitle, CardSubtitle, CardText, CardBody, CardDeck, CardImg } from 'reactstrap';

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

  partitionArray = (array, size) => array.map( (e,i) => (i % size === 0) ? array.slice(i, i + size) : null ) .filter( (e) => e );

  generateCards = (students) => {
    const mappedCards = students.map((student) => (
        <Card>
          <CardImg top src={'/public/images/placeholder.png'}/>
          <CardBody>
            <CardTitle>{student.name}</CardTitle>
            <CardSubtitle>{student.nric}</CardSubtitle>
          </CardBody>
        </Card>
    ));
    const partitionedCards = this.partitionArray(mappedCards, 3);
    const deckedCards = partitionedCards.map((cards) => (
      <Fragment>
        <CardDeck>
          {cards}
        </CardDeck>
        <br />
      </Fragment>
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
