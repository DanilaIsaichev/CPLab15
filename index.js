const m = require('mongoose');
const express = require('express');
const UserModel = require('./user.js');
const http = require('http');

const { URL } = process.env;
const User = UserModel(m);
const app = express();

app

.get('/', (_, res) => {res.send('App\'s working')})

.get('/add', (_, res) => {

  console.log(URL);

  const user = new User({
    name: 'herzen@danila.isaichev@mail.ru',
    password: '16'
  });

  user.save((err, user) => {

    if (err) {
      console.log('Error:', err);
      res.send('Error');
    } else {
      console.log('User saved:', user);
      res.send('User saved');
    }

  });

})

.get('/addfrompage', (_, res) => {

  http.get('http://kodaktor.ru/g/_unsafe/65e39', (ress) => {

    buffer = '';

    ress.on('data', (data) => (buffer += data));

    ress.on('end', () => {

      const user = new User({
        name: 'herzen@danila.isaichev@mail.ru',
        password: buffer
      });

      user.save((err, user) => {

        if (err) {
          console.log('Error:', err);
          res.send('Error');
        } else {
          console.log('User saved:', user);
          res.send('User saved');
        }

      });
    });
  });
})
app.listen(async () => {
    await m.connect(URL, {
      useUSnifiedTopology: true,
      useNewUrlParser: true
    });
});