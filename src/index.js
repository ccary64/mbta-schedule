import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: "AIzaSyDu07U6XF7n13ZqxH1lp60CVEZnYoK0aYo",
  databaseURL: "https://mbta-schedule-45064.firebaseio.com",
  //projectId: "mbta-schedule-45064"
};

firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
