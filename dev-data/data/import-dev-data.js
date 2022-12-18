//

const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

const Tour = require('../../Models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => console.log('database connected'));

// Read JSON file ..
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import databse into databse ..
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded ... 🔥');
  } catch (error) {
    console.log(error);
  }
  process.exit(); // aggressive way to stopping application
};

// Delete all data from database ...
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted ... ❌');
  } catch (error) {
    console.log(error);
  }
  process.exit(); // aggressive way to stopping application
};

// === let's do something tricky for importing and deleting records ...
// use "node dev-data/data/import-dev-data.js --import" to fire importData() function
// or use --delete to fire deleteData() function

// wait until server is connected ...
setTimeout(() => {
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
}, 6000);

// console.log(process.argv);
