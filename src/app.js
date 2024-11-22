const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const showRoutes = require('./routes/showRoutes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/shows', showRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

