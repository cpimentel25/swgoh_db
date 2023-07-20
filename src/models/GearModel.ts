import mongoose, { Document, Schema } from 'mongoose';

export interface Ingredient {
  gear: string;
  amount: number;
}

export interface Recipe {
  base_id: string;
  result_id: string;
  cost: number;
  ingredients: Ingredient[];
}

export interface GearData {
  base_id: string;
  recipes: Recipe[];
  tier: number;
  required_level: number;
  stats: { [key: string]: number };
  mark: string;
  cost: number;
  image: string;
  url: string;
  ingredients: Ingredient[];
  name: string;
}

export interface GearDocument extends GearData, Document { }

const GearSchema: Schema = new Schema({
  base_id: String,
  recipes: [
    {
      base_id: String,
      result_id: String,
      cost: Number,
      ingredients: [
        {
          gear: String,
          amount: Number,
        },
      ],
    },
  ],
  tier: Number,
  required_level: Number,
  stats: Schema.Types.Mixed,
  mark: String,
  cost: Number,
  image: String,
  url: String,
  ingredients: [
    {
      gear: String,
      amount: Number,
    },
  ],
  name: String,
});

export default mongoose.model<GearDocument>('Gear', GearSchema);
