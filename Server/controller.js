const { CONNECTION_STRING } = process.env;
require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

module.exports = {
  addMotorcycle: (req, res) => {
  
    const {name, year, color} = req.body
    sequelize
    .query(`
    INSERT INTO motorcycles (motorcycle_name, motorcycle_year, motorcycle_color)
    VALUES ('${name}', ${+year}, '${color}');

    SELECT * 
    FROM motorcycles 
    WHERE motorcycle_id IN (SELECT MAX(motorcycle_id) FROM motorcycles);
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err));
  },

  getMotorcycles: (req, res) => {
    
    sequelize
              .query(`
                SELECT * FROM motorcycles
                ORDER BY motorcycle_id;
              `)
              .then(dbRes => res.status(200).send(dbRes[0]))
              .catch(err => console.log(err))

    

  },

  updateMoto: (req, res) => {
    const {id} = req.params;
    const {name, year, color} = req.body;
    sequelize
        .query(`
        UPDATE motorcycles
        SET motorcycle_name = '${name}'
        WHERE motorcycle_id = ${id};

        UPDATE motorcycles
        SET motorcycle_year = ${year}
        WHERE motorcycle_id = ${id};

        UPDATE motorcycles
        SET motorcycle_color = '${color}'
        WHERE motorcycle_id = ${id};

        SELECT * FROM motorcycles
        ORDER BY motorcycle_id;
        
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
  },

  deleteMoto: (req, res) => {
    const {id} = req.params;
    console.log(id)
    sequelize
    .query(`
    DELETE FROM motorcycles
    WHERE motorcycle_id = ${id};
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
  }
}