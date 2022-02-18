const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
  seed: (req, res) => {
    sequelize.query(`
    DROP TABLE IF EXISTS motorcycles;

    CREATE TABLE motorcycles(
      motorcycle_id SERIAL PRIMARY KEY,
      motorcycle_name VARCHAR(40) NOT NULL,
      motorcycle_year INT NOT NULL,
      motorcycle_color VARCHAR(20) NOT NULL
    );

    INSERT INTO motorcycles (motorcycle_name,motorcycle_year, motorcycle_color)
    VALUES ('FZ 07', 2015, 'red'),
    ('XSR 900', 2018, 'blue'),
    ('Grom', 2020, 'red');
    `)
    .then(() => {
      console.log('DB seeded!')
      res.sendStatus(200)
  }).catch(err => console.log('error seeding DB', err))
  }
}