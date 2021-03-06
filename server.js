require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//const mongodb = require('mongodb')
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const auth = require('./routes/api/auth');
const forum = require('./routes/api/forum');
const history = require('./routes/api/history');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
// just usin cors() should work but not sure why its not working rn
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => res.send('API Running'));

const uri =
  'mongodb+srv://MubashirKhan:softwaredesign2020@sdcluster-o0sio.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log(err));

app.use('/api/user', user);
app.use('/api/profile', profile);

app.use('/api/auth', auth);
app.use('/api/forum', forum);
app.use('/api/history', history);

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});

module.exports = app;
