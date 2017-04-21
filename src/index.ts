const SERVER_PORT = 8000;
require('./server').listen(SERVER_PORT, () => {
  console.log('Listening on port ' + SERVER_PORT);
});

