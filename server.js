//

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// get the current environment ...
// console.log(app.get('env'));
// console.log(process.env);

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

// if you want to connect local database, use process.env.DATABASE_LOCAL instead DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => console.log('database connected'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on Port ${port} ...`);
});
