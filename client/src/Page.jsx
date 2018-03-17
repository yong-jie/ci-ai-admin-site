import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import { authenticateUser } from './Authentication/AuthenticationActionCreator';

import routes from './Routing/Routes';

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

  generateNav = () => {
    const mappedNavs = routes.map((route) => {
      const eligible = route.authorization
              .includes(this.props.authentication.authorization);
      if (!eligible) {
        return null;
      }

      return (
        <NavItem>
          <NavLink tag={Link} to={route.path} key={route.path}>
            {route.name}
          </NavLink>
        </NavItem>
      );
    });
    
    return (
      <Navbar>
        <Nav tabs>
          {mappedNavs}
        </Nav>
      </Navbar>
    );
  };

  generateRoutes = () => {
    const mappedRoutes = routes.map((route) => (
      <Route exact={route.exact} path={route.path} component={route.component}/>
    ));

    return (
      <Switch>
        {mappedRoutes}
      </Switch>
    );
  };

  render = () => (
    <div className="App">
      {this.generateNav()}
      <div className={'route-body'}>
        {this.generateRoutes()}
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
