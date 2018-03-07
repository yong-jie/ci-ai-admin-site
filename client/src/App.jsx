import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import temperatureReducer from './TemperatureTaking/TemperatureReducer';

import Home from './Home';
import TemperatureTaking from './TemperatureTaking/TemperatureTaking';
import StudentInformation from './StudentInformation/StudentInformation';
import './App.css';

const reducers = combineReducers({
  temperature: temperatureReducer,
});
const store = createStore(reducers);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
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
                <Route exact path="/" render={props => <Home {...props} />} />
                <Route
                  path="/temperature"
                  render={props => (
                    <TemperatureTaking
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/information"
                  render={props => <StudentInformation />}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
