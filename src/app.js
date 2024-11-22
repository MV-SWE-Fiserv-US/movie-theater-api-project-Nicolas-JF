const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const showRoutes = require('./routes/showRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/shows', showRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
