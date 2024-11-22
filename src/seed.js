const sequelize = require('./config/database');
const User = require('./models/User');
const Show = require('./models/Show');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({ name: 'John Doe' });
  const user2 = await User.create({ name: 'Jane Smith' });

  const show1 = await Show.create({ title: 'Breaking Bad', genre: 'Drama' });
  const show2 = await Show.create({ title: 'Friends', genre: 'Comedy' });

  await user1.addShow(show1);
  await user2.addShow(show2);

  console.log('Database seeded!');
};

seedDatabase().catch(err => console.log(err));
