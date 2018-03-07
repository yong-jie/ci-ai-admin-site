import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TemperatureTaking.css';
import { fetchStudentTemperatures } from './TemperatureActionCreator';

class TemperatureTaking extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    fetchStudentTemperatures();
    this.setState((prevState, props) => ({
      students: props.students,
    }));
  };

  render = () => (
    <h1>hi</h1>
  );
}

TemperatureTaking.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  students: state.students,
});

export default connect(mapStateToProps)(TemperatureTaking);
