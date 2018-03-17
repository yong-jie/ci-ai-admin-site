import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import { authenticateUser } from './Authentication/AuthenticationActionCreator';

import Home from './Home';
import Login from './Authentication/Login';
import TemperatureTaking from './TemperatureTaking/TemperatureTaking';
import StudentInformation from './StudentInformation/StudentInformation';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.dispatch(authenticateUser());
  }

  handleTemperatureInputChange(id, entryIndex, value) {
    this.setState({
      students: this.state.students.map(student => {
        if (student.id === id) {
          student.entries[entryIndex] = value;
        }
        return student;
      }),
    });
  }

  render = () => (
      <div className="App">
        <Navbar>
          <Nav tabs>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/temperature">
                Temperature Taking
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/information">
                Student Information
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <div className={'route-body'}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login}/>
            <Route path="/temperature" component={TemperatureTaking}/>
            <Route path="/information" component={StudentInformation}/>
      </Switch>
      </div>
      </div>
  );
}

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default withRouter(connect(mapStateToProps)(Page));
