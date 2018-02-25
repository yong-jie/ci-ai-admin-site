import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import Home from './Home';
import TemperatureTaking from './TemperatureTaking/TemperatureTaking';
import StudentInformation from './StudentInformation/StudentInformation';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          name: '',
          id: '1',
          entries: ['', '', '', '', '', '', '', '', '', ''],
        },
      ],
    };
    this.handleTemperatureInputChange = this.handleTemperatureInputChange.bind(
      this
    );
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
                  students={this.state.students}
                  handleOnChange={this.handleTemperatureInputChange}
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
    );
  }
}

export default App;
