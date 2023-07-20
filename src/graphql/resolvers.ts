import UnitsModel from '../models/UnitsModel';
import CharacterModel from '../models/CharacterModel';
import ShipModel from '../models/ShipModel';

const resolvers = {
  Query: {
    characters: async () => {
      const characters = await CharacterModel.find();
      return characters;
    },
    units: async () => {
      const units = await UnitsModel.find();
      return units;
    },
    ships: async () => {
      const units = await ShipModel.find();
      return units;
    },
  },
};

export default resolvers;
