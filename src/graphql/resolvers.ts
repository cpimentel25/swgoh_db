import UnitsModel from '../models/UnitsModel';
import CharacterModel from '../models/CharacterModel';
import ShipModel from '../models/ShipModel';
import GearModel from '../models/GearModel';

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
    gears: async () => {
      const gears = await GearModel.find();
      return gears;
    }
  },
};

export default resolvers;
