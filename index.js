var express = require('express'),
    app = express(),
    port = process.argv[2] || 80;


app.listen(port);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/queryData');
app.post('/saveData');
