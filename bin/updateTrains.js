'use strict';

const fetch = require('node-fetch');
const csvParse = require('csv-parse');
const firebase = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://mbta-schedule-45064.firebaseio.com'
});

const getInfo = async () => {
  const url = 'http://developer.mbta.com/lib/gtrtfs/Departures.csv';
  const response = await fetch(url);
  const csv = await response.text();

  return new Promise((resolve, reject) => {
    csvParse(csv, { delimiter: ',', columns: true }, (err, output) => {
      if (err) {
        return reject(err);
      }
      return resolve(output);
    });
  });
}

console.log('STARTING')
setInterval(() => {
  console.log('UPDATING')
  getInfo().then(output => {
    const trainUpdate = {
      timestamp: new Date(),
      schedule: output
    };
    const ref = firebase.database().ref('/currentData');
    ref.update(trainUpdate);
  })
}, 5000);