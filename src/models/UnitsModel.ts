import mongoose, { Document, Schema } from "mongoose";

export interface UnitsData {
  name: string;
  base_id: string;
  url: string;
  image: string;
  power: number;
  description: string;
  combat_type: number;
  gear_levels: {
    tier: number;
    gear: string[];
  }[];
  alignment: number;
  categories: string[];
  ability_classes: string[];
  role: string;
  ship_base_id: string | null;
  ship_slot: string | null;
  activate_shard_count: number;
  is_capital_ship: boolean;
  is_galactic_legend: boolean;
  made_available_on: string;
  crew_base_ids: string[];
  omicron_ability_ids: string[];
  zeta_ability_ids: string[];
}

export interface UnitsDocument extends UnitsData, Document { }

const UnitsSchema: Schema = new Schema({
  name: String,
  base_id: String,
  url: String,
  image: String,
  power: Number,
  description: String,
  combat_type: Number,
  gear_levels: [
    {
      tier: Number,
      gear: [String],
    },
  ],
  alignment: Number,
  categories: [String],
  ability_classes: [String],
  role: String,
  ship_base_id: String,
  ship_slot: String,
  activate_shard_count: Number,
  is_capital_ship: Boolean,
  is_galactic_legend: Boolean,
  made_available_on: String,
  crew_base_ids: [String],
  omicron_ability_ids: [String],
  zeta_ability_ids: [String],
});

export default mongoose.model<UnitsDocument>('Units', UnitsSchema);
