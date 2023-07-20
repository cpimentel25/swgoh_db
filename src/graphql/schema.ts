import { gql } from 'apollo-server-express';

// export const typeDefs = `#graphql
export const typeDefs = gql`
  scalar JSONObject

  type GearLevel {
    tier: Int
    gear: [String]
  }

  type Character {
    name: String
    base_id: String
    url: String
    image: String
    power: Int
    description: String
    combat_type: Int
    gear_levels: [GearLevel]
    alignment: String
    categories: [String]
    ability_classes: [String]
    role: String
    ship: String
    ship_slot: String
    activate_shard_count: Int
  }

  type Units {
    name: String
    base_id: String
    url: String
    image: String
    power: Int
    description: String
    combat_type: Int
    gear_levels: [GearLevel]
    alignment: Int
    categories: [String]
    ability_classes: [String]
    role: String
    ship_base_id: String
    ship_slot: String
    activate_shard_count: Int
    is_capital_ship: Boolean
    is_galactic_legend: Boolean
    made_available_on: String
    crew_base_ids: [String]
    omicron_ability_ids: [String]
    zeta_ability_ids: [String]
  }

  type Ships {
    name: String
    base_id: String
    url: String
    image: String
    power: Int
    description: String
    combat_type: Int
    alignment: String
    categories: [String]
    ability_classes: [String]
    role: String
    capital_ship: Boolean
    activate_shard_count: Int
  }

  type Ingredient {
    gear: String
    amount: Int
  }

  type Recipe {
    base_id: String
    result_id: String
    cost: Int
    ingredients: [Ingredient]
  }

  type Gears {
    base_id: String
    recipes: [Recipe]
    tier: Int
    required_level: Int
    stats: JSONObject
    mark: String
    cost: Int
    image: String
    url: String
    ingredients: [Ingredient]
    name: String
  }

  type Query {
    characters: [Character]
    units: [Units]
    ships: [Ships]
    gears: [Gears]
  }
`;
