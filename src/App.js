import React, { Component } from 'react';
import firebase from 'firebase';
import 'typeface-roboto';
import './App.css';
import Schedule from './Schedule';
import BottomNav from './BottomNav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [] };
    this.start();
    this.locations = ['North Station', 'South Station'];
  }

  setSelected = (selected) => this.setState({ selected }); 

  start() {
    const ref = firebase.database().ref('currentData');
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      const schedule = (data && data.schedule) || [];
      const timestamp = data && data.timestamp;
      this.setState({ schedule, timestamp, selected: 'North Station' });
    });
  }

  render() {
    const { schedule, selected } = this.state;
    return (
      <div className="App">
        {(schedule.length) ? 
          <Schedule schedule={schedule} selected={selected} /> : 
          <div> No Data </div>
        }
        <BottomNav locations={this.locations} setSelected={this.setSelected}/>
      </div>
    );
  }
}

export default App;
