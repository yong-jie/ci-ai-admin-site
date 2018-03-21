import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Media, Card, CardTitle, CardSubtitle, CardText, CardBody, CardDeck, CardImg } from 'reactstrap';

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

  static partitionArray = (array, size) => array.map((e,i) => (i % size === 0) ? array.slice(i, i + size) : null)
    .filter((e) => e);

  generateCards = (students) => {
    const mappedCards = students.map((student, index) => (
      <Card key={`card-${index}`}>
        <CardBody>
          <CardTitle>{student.name}</CardTitle>
          <CardSubtitle>{student.nric}</CardSubtitle>
        </CardBody>
        <CardImg top src={'/public/images/placeholder.png'}/>
      </Card>
    ));
    const partitionedCards = TemperatureTaking.partitionArray(mappedCards, 4);
    const deckedCards = partitionedCards.map((cards, index) => (
      <Fragment key={`deck-${index}`}>
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
