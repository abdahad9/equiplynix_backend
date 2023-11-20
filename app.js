const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./src/routes/authRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
// const partnerRoutes = require('./src/routes/partnerRoutes');
// const customerRoutes = require('./src/routes/customerRoutes');
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.use(cors());

// auth route
app.use('/api', loginRoutes);

// Other Routes
app.get('/', (req, res) => {
  db.connect()
  .then(obj => {
    obj.done(); // success, release the connection object
    res.json("Connected to the database");
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
    res.json('not Connected to the database');
  });

  });

app.use('/api', employeeRoutes);
// app.use('/api', partnerRoutes);
// app.use('/api', customerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
