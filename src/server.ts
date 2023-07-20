import express from 'express';
import connectDB from './config/connectDB';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { createServer } from 'http';
import UnitsModel from './models/UnitsModel';
import CharacterModel from './models/CharacterModel';
import ShipModel from './models/ShipModel';
import graphQlConfig from './config/graphql';
import configExpress from './config/express';
import GearModel from './models/GearModel';

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();
// app.use(express.json());

export const httpServer = createServer(app)

async function main() {
  await connectDB(); // -> Connection with MongoDB
  await configExpress(app); // -> Setup express
  await graphQlConfig(app); // -> graphQl Server
};

app.post('/api/data', async (req, res) => {
  try {
    const unitsData = await axios.get('http://api.swgoh.gg/units/');
    const characterData = await axios.get('http://api.swgoh.gg/characters/');
    const shipData = await axios.get('http://api.swgoh.gg/ships/');
    const gearData = await axios.get('http://api.swgoh.gg/gear/');

    const units = unitsData.data.data;
    const characters = characterData.data;
    const ships = shipData.data;
    const gears = gearData.data;

    // Verificar si los datos ya existen en la base de datos
    const existingUnits = await UnitsModel.find();
    const existingCharacters = await CharacterModel.find();
    const existingShips = await ShipModel.find();
    const existingGears = await GearModel.find();

    // Filtrar los datos que no existen en la base de datos
    const newUnits = units.filter((unit: { base_id: string; }) => !existingUnits.some(existingUnit => existingUnit.base_id === unit.base_id));
    const newCharacters = characters.filter((character: { base_id: string; }) => !existingCharacters.some(existingCharacter => existingCharacter.base_id === character.base_id));
    const newShips = ships.filter((ship: { base_id: string; }) => !existingShips.some(existingShip => existingShip.base_id === ship.base_id));
    const newGears = gears.filter((gear: { base_id: string; }) => !existingGears.some(existingGear => existingGear.base_id === gear.base_id));

    // Insertar solo los datos que no existen en la base de datos
    await UnitsModel.insertMany(newUnits);
    await CharacterModel.insertMany(newCharacters);
    await ShipModel.insertMany(newShips);
    await GearModel.insertMany(newGears);

    res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'An error occurred while storing data' });
  }
});

app.listen(port, () => {
  console.log(`🚀🚀🚀 ~ Server listening on port ${port}`);
});

main();
