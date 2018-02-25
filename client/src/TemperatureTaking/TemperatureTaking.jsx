import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Media,
  Table,
} from 'reactstrap';
import './TemperatureTaking.css';
import TemperatureInput from './TemperatureInput';

const TemperatureTaking = ({ students, handleOnChange }) => {
  const mappedTopics = students.map(student => (
    <ListGroupItem key={student.id}>
      <Container>
        <Row>
          <Col xs={'2'} className={'center-vertically'}>
            <Media
              object
              src={'/public/images/placeholder.png'}
              className={'display-picture'}
            />
          </Col>
          <Col xs={'4'} className={'center-vertically'}>
            {student.name}
          </Col>
          <Col xs={'6'}>
            <Table bordered>
              <TemperatureInput
                id={student.id}
                entries={student.entries}
                handleOnChange={handleOnChange}
              />
            </Table>
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  ));
  return <ListGroup>{mappedTopics}</ListGroup>;
};

TemperatureTaking.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func,
};

export default TemperatureTaking;
