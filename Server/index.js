const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// seed data
const { seed } = require('./seed');
app.post('/seed', seed);

//server requests 
const { addMotorcycle, getMotorcycles, updateMoto, deleteMoto, searchMotos } = require('./controller'); 

app.post('/api/motorcycle', addMotorcycle);
app.get('/api/motorcycles', getMotorcycles);
app.put('/api/motorcycle/:id', updateMoto);
app.delete('/api/motorcycle/:id', deleteMoto);
app.get('/api/motorcycle', searchMotos);



const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => console.log(`All hands on deck! BattleShip docking at port ${SERVER_PORT}!`));