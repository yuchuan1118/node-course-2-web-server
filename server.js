const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('ScreamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`+'\n';
  console.log(log);
  fs.appendFile('server.log', log, (err) => {
    if (err) {
      console.log(`Unable to append to server.log (err: ${err})`);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   // next();
// });
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!<h1>')
  res.render('home.hbs', {
    pageTitile: 'Home Page',
    welcomeMessage: 'welcome to the website'
  });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  res.render('about.hbs', {
    pageTitile: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: '404 error'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
