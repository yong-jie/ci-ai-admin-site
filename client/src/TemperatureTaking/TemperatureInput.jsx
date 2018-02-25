import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import './TemperatureInput.css';

const columnsPerRow = 5;

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      id: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.setState((prevState, props) => ({
      entries: props.entries.map(entry => entry),
      id: props.id,
    }));
  }

  handleOnChange(index, value) {
    const newEntries = this.state.entries;
    newEntries[index] = value;
    this.setState({
      entries: newEntries,
    });
    const regex = RegExp('^[0-9]{2}.[0-9]$');
    if (regex.test(value)) {
      this.props.handleOnChange(this.state.id, index, value);
    }
  }

  render() {
    const numberOfRows = this.state.entries.length / columnsPerRow;
    const mappedEntries = this.state.entries.map((entry, index) => (
      <td key={`${this.state.id}-${index}`}>
        <Input
          type={'number'}
          className={'no-spinners'}
          value={entry}
          onChange={e => this.handleOnChange(index, e.target.value)}
        />
      </td>
    ));
    const tableRows = Array.apply(null, Array(numberOfRows)).map((_, index) => (
      <tr key={`${this.state.id}-row-${index}`}>
        <td>{index === 0 ? 'Morning' : 'Evening'}</td>
        {mappedEntries.slice(
          index * columnsPerRow,
          (index + 1) * columnsPerRow
        )}
      </tr>
    ));
    return <tbody>{tableRows}</tbody>;
  }
}

TemperatureInput.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func,
};

export default TemperatureInput;
