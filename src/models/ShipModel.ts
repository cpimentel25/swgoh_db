import mongoose, { Document, Schema } from 'mongoose';

export interface ShipData {
  name: string;
  base_id: string;
  url: string;
  image: string;
  power: number;
  description: string;
  combat_type: number;
  alignment: string;
  categories: string[];
  ability_classes: string[];
  role: string;
  capital_ship: boolean;
  activate_shard_count: number;
}

export interface ShipDocument extends ShipData, Document { }

const ShipSchema = new Schema<ShipDocument>({
  name: String,
  base_id: String,
  url: String,
  image: String,
  power: Number,
  description: String,
  combat_type: Number,
  alignment: String,
  categories: [String],
  ability_classes: [String],
  role: String,
  capital_ship: Boolean,
  activate_shard_count: Number,
});

export default mongoose.model<ShipDocument>('Ship', ShipSchema);
