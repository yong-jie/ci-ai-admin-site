import React from 'react';
import { Container, Col, Row, ListGroup, ListGroupItem, Media } from 'reactstrap';
import './TemperatureTaking.css';

const TemperatureTaking = ({ students }) => {
  const mappedTopics = students.map((student) => (
    <ListGroupItem key={student.id}>
      <Container>
	<Row>
	  <Col xs={'2'}>
	    <Media object src={'/public/images/placeholder.png'} className={'display-picture'}/>
	  </Col>
	  <Col xs={'4'} className={'temperature-taking-name'}>
	    {student.name}
	  </Col>
	  <Col xs={'6'}>
	    {'Placeholder'}
	  </Col>
	</Row>
      </Container>
    </ListGroupItem>
  ));
  return (
    <ListGroup>
      {mappedTopics}
    </ListGroup>
  );
}

export default TemperatureTaking;
