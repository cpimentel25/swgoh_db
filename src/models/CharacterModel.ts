import mongoose, { Document, Schema } from 'mongoose';

export interface CharacterData {
  name: string;
  base_id: string;
  pk: number;
  url: string;
  image: string;
  power: number;
  description: string;
  combat_type: number;
  gear_levels: { tier: number, gear: string[] }[];
  alignment: string;
  categories: string[];
  ability_classes: string[];
  role: string;
  ship: string;
  ship_slot: string | null,
  activate_shard_count: number;
}

export interface CharacterDocument extends CharacterData, Document { }

const CharacterSchema = new Schema({
  name: String,
  base_id: String,
  pk: Number,
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
  alignment: String,
  categories: [String],
  ability_classes: [String],
  role: String,
  ship: String,
  ship_slot: { type: String, default: null },
  activate_shard_count: Number,
});

export default mongoose.model<CharacterDocument>('Character', CharacterSchema);
