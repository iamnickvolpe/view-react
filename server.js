/*jshint esversion: 6 */

const express = require('express');
const request = require('request');
const google = require('googleapis');
const GoogleAuth = require('google-auth-library');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const admin = require('firebase-admin');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const serviceAccount = require('./secrets/service-account.json');
const firebase = require('./secrets/firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebase.databaseURL,
});
const db = admin.database();

db.ref('users').once("value").then((usersSnapshot) => {
  usersSnapshot.forEach((user) => {
    db.ref(`users/${user.key}`).once("value").then((userSnapshot) => {
      var credentials = userSnapshot.val().credentials;
      db.ref(`users/${user.key}/widgets`).once("value").then((widgetsSnapshot) => {
        widgetsSnapshot.forEach((widget) => {
          var dataRef = db.ref(`users/${user.key}/widgets/${widget.key}/data`);

          if (widget.val().type === 'weather') {
            getWeather(credentials.weather.token, widget.val().settings.zip, (body) => {
              dataRef.set(JSON.parse(body));
            });
            setInterval(() => {
              getWeather(credentials.weather.token, widget.val().settings.zip, (body) => {
                dataRef.set(JSON.parse(body));
              });
            }, 3600000);
          }

          if (widget.val().type === 'feed') {
            getFeed(credentials.feedly.userId, credentials.feedly.token, widget.val().settings.category, (body) => {
              dataRef.set(JSON.parse(body));
            });
            setInterval(() => {
              getFeed(credentials.feedly.userId, credentials.feedly.token, widget.val().settings.category, (body) => {
                dataRef.set(JSON.parse(body));
              });
            }, 3600000);
          }

          if (widget.val().type === 'subway') {
            getSubway(credentials.subway.key, widget.val().settings.lines, (body) => {
              dataRef.set(body);
            });
            setInterval(() => {
              getSubway(credentials.subway.key, widget.val().settings.lines, (body) => {
                dataRef.set(body);
              });
            }, 60000);
          }

          if (widget.val().type === 'events') {
            getEvents(credentials.google, widget.val().settings.calendarId, (body) => {
              dataRef.set(body);
            });
            setInterval(() => {
              getEvents(credentials.google, widget.val().settings.calendarId, (body) => {
                dataRef.set(body);
              });
            }, 900000);
          }

        });
      });
    });
  });
});

function getWeather(token, zip, cb) {
  const options = {
    url: `http://api.wunderground.com/api/${token}/conditions/forecast/q/${zip}.json`,
  };
  request(options, callback);
  function callback(error, response, body) {
    if (!error) {
      cb(body);
    }
  }
}

function getFeed(userId, token, category, cb) {
  const url = `http://cloud.feedly.com/v3/streams/contents?streamId=user/${userId}/category/${category}`;
  const options = {
    url,
    headers: {
      Authorization: `OAuth ${token}`,
    },
  };
  request(options, callback);
  function callback(error, response, body) {
    if (!error) {
      cb(body);
    }
  }
}

function getSubway(key, lines, cb) {
  var stops = [];
  var lineIterator = 0;
  lines.forEach(function(line) {
    const requestSettings = {
      method: 'GET',
      url: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=${line.id}`,
      encoding: null,
    };
    request(requestSettings, function (error, response, body) {
      if (body && !error && response.statusCode == 200) {
        let updates = [];
        let feed;
        try {
          feed = GtfsRealtimeBindings.FeedMessage.decode(body);
        }
        catch (e) {
          console.log(e);
        }
  
        feed.entity.forEach(function(entity) {
          if (entity.trip_update) {
            entity.trip_update.stop_time_update.forEach(function(update) {
              updates.push(update);
            });
          }
        });

        var stopsIterator = 0;
        line.stops.forEach(function(stop) {
          stop.trips = [];
          updates.forEach(function(update) {
            if (update.stop_id == stop.id) {
              stop.trips.push(update.arrival.time.low);
            }
          });
          stop.trips.sort();
          stop.trips = stop.trips.splice(0,2);
          stops.push(stop);
          stopsIterator++;
          if(stopsIterator == line.stops.length -1) {
            lineIterator++;
          }
        });
      }
      if (lineIterator == lines.length -1) {
        cb(stops);
      }
    });  
  });
}

function getEvents(token, calendarId, cb) {
  fs.readFile('./secrets/client_secret.json', function(err, content) {
    var credentials = JSON.parse(content);
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new GoogleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    oauth2Client.credentials = token;
    google.calendar('v3').events.list({
      auth: oauth2Client,
      calendarId: calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, response) {
      cb(response);
    });
  });
}

const app = express();
app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
  });
}

app.listen(app.get('port'));