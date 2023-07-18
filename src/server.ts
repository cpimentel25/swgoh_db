import express from 'express';
import connectDB from './config/connectDB';
import * as dotenv from 'dotenv';
import axios from 'axios';
import UnitsModel from './models/UnitsModel';
import CharacterModel from './models/CharacterModel';
import graphQlConfig from './config/graphql';
import { createServer } from 'http';

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());

export const httpServer = createServer(app)

async function main() {
  await connectDB(); // -> Connection with MongoDB
  await graphQlConfig(app); // -> graphQl Server
};

app.post('/api/data', async (req, res) => {
  try {
    const unitsData = await axios.get('http://api.swgoh.gg/units/');
    const characterData = await axios.get('http://api.swgoh.gg/characters/');

    const units = unitsData.data.data;
    const characters = characterData.data;

    // Verificar si los datos ya existen en la base de datos
    const existingUnits = await UnitsModel.find();
    const existingCharacters = await CharacterModel.find();

    // Filtrar los datos que no existen en la base de datos
    const newUnits = units.filter((unit: { base_id: string; }) => !existingUnits.some(existingUnit => existingUnit.base_id === unit.base_id));
    const newCharacters = characters.filter((character: { base_id: string; }) => !existingCharacters.some(existingCharacter => existingCharacter.base_id === character.base_id));

    // Insertar solo los datos que no existen en la base de datos
    await UnitsModel.insertMany(newUnits);
    await CharacterModel.insertMany(newCharacters);

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
