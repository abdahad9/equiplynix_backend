const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./src/routes/authRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
// const partnerRoutes = require('./src/routes/partnerRoutes');
// const customerRoutes = require('./src/routes/customerRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.use(cors());

// auth route
app.use('/api', loginRoutes);

// Other Routes
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'API is working!' });
//   });

app.use('/api', employeeRoutes);
// app.use('/api', partnerRoutes);
// app.use('/api', customerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
