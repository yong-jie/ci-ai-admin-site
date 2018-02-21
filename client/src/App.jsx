import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import TemperatureTaking from './TemperatureTaking';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
	{
	  name: 'Jonathan',
	  id: '1',
	},
	{
	  name: 'Destin',
	  id: '2',
	},
	{
	  name: 'Marvin',
	  id: '3',
	},
      ],
    }
  }
  
  render() {
    return (
      <div className="App">
        <header>
	  <nav>
	    <ul>
	      <li><Link to='/'>Home</Link></li>
	      <li><Link to='/temperature'>Temperature Taking</Link></li>
	    </ul>
	  </nav>
        </header>
	<Switch>
	  <Route exact path='/' render={(props) => (
	    <Home {...props} />
	    )}/>
	<Route path='/temperature' render={(props) => (
	  <TemperatureTaking {...props} students={this.state.students}/>
	)}/>
	</Switch>
      </div>
    );
  }
}

export default App;
